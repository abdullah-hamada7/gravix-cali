// Google Apps Script for the Gravix contact form.
//
// What this script does:
// 1. Creates the Google Spreadsheet for leads
// 2. Creates and formats the target sheet
// 3. Exposes a Web App endpoint that your Next.js app can POST to
//
// Setup steps:
// 1. Go to https://script.new and create a new standalone Apps Script project
// 2. Replace the default code with this file
// 3. Run createContactLeadsSpreadsheet() once and authorize access
// 4. Open the logged spreadsheet URL and confirm the sheet looks correct
// 5. Click Deploy > New deployment
// 6. Select type: Web app
// 7. Set Execute as: Me
// 8. Set Who has access: Anyone
// 9. Copy the /exec URL into GOOGLE_SHEETS_WEBHOOK_URL

const SPREADSHEET_TITLE = "Gravix Contact Leads";
const SHEET_NAME = "Leads";
const TIMEZONE = "Africa/Cairo";
const VALID_TRAINING_LEVELS = ["beginner", "intermediate", "advanced"];
const PROPERTY_KEYS = {
  spreadsheetId: "CONTACT_FORM_SPREADSHEET_ID",
  sheetId: "CONTACT_FORM_SHEET_ID",
};

const SHEET_HEADERS = [
  "Timestamp",
  "Name",
  "Mobile",
  "WhatsApp Link",
  "Training Level",
  "Goal",
  "Message",
  "الحالة",
  "ملاحظات",
  "تاريخ المتابعة",
];

function getScriptProperties_() {
  return PropertiesService.getScriptProperties();
}

function getStoredSpreadsheetId_() {
  return getScriptProperties_().getProperty(PROPERTY_KEYS.spreadsheetId);
}

function setStoredSheetConfig_(spreadsheetId, sheetId) {
  getScriptProperties_().setProperties({
    [PROPERTY_KEYS.spreadsheetId]: spreadsheetId,
    [PROPERTY_KEYS.sheetId]: String(sheetId),
  });
}

function sanitizeTextValue_(value, maxLength) {
  const normalized = String(value || "").trim().slice(0, maxLength);

  if (/^[=+\-@]/.test(normalized)) {
    return `'${normalized}`;
  }

  return normalized;
}

function normalizeMobileForWhatsApp_(value) {
  return String(value || "").replace(/\D/g, "");
}

function buildJsonResponse_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function ensureSheetSetup_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(SHEET_HEADERS);
  }

  const headerRange = sheet.getRange(1, 1, 1, SHEET_HEADERS.length);
  headerRange.setValues([SHEET_HEADERS]);
  headerRange.setFontWeight("bold").setBackground("#163229").setFontColor("#D9FF66");

  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, SHEET_HEADERS.length);

  const dataRowCount = Math.max(sheet.getMaxRows() - 1, 1);
  const statusColumn = 8;
  const followUpColumn = 10;
  const dataRange = sheet.getRange(2, 1, dataRowCount, SHEET_HEADERS.length);
  const statusRange = sheet.getRange(2, statusColumn, dataRowCount, 1);
  const rules = [
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo("جديد")
      .setBackground("#FFF2CC")
      .setRanges([statusRange])
      .build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo("تم التواصل")
      .setBackground("#CFE2F3")
      .setRanges([statusRange])
      .build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo("مغلق")
      .setBackground("#D9EAD3")
      .setRanges([statusRange])
      .build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied(`=$${columnToLetter_(followUpColumn)}2<TODAY()`)
      .setBackground("#F4CCCC")
      .setRanges([dataRange])
      .build(),
  ];

  sheet.setConditionalFormatRules(rules);
}

function columnToLetter_(column) {
  let temp = column;
  let letter = "";

  while (temp > 0) {
    const remainder = (temp - 1) % 26;
    letter = String.fromCharCode(65 + remainder) + letter;
    temp = Math.floor((temp - remainder - 1) / 26);
  }

  return letter;
}

function getOrCreateConfiguredSheet_() {
  const spreadsheetId = getStoredSpreadsheetId_();
  let spreadsheet;
  let sheet;

  if (spreadsheetId) {
    spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const storedSheetId = Number(getScriptProperties_().getProperty(PROPERTY_KEYS.sheetId));

    if (storedSheetId) {
      sheet = spreadsheet.getSheets().find((item) => item.getSheetId() === storedSheetId);
    }

    if (!sheet) {
      sheet = spreadsheet.getSheetByName(SHEET_NAME);
    }
  } else {
    spreadsheet = SpreadsheetApp.create(SPREADSHEET_TITLE);
    sheet = spreadsheet.getActiveSheet();
    sheet.setName(SHEET_NAME);
  }

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  ensureSheetSetup_(sheet);
  setStoredSheetConfig_(spreadsheet.getId(), sheet.getSheetId());

  return { spreadsheet, sheet };
}

function createContactLeadsSpreadsheet() {
  const result = getOrCreateConfiguredSheet_();
  const spreadsheetUrl = result.spreadsheet.getUrl();

  Logger.log(
    JSON.stringify({
      spreadsheetId: result.spreadsheet.getId(),
      spreadsheetUrl,
      sheetName: result.sheet.getName(),
      sheetId: result.sheet.getSheetId(),
    })
  );

  return {
    spreadsheetId: result.spreadsheet.getId(),
    spreadsheetUrl,
    sheetName: result.sheet.getName(),
    sheetId: result.sheet.getSheetId(),
  };
}

function resetContactLeadsSheet() {
  const result = getOrCreateConfiguredSheet_();
  result.sheet.clear();
  ensureSheetSetup_(result.sheet);

  return {
    success: true,
    spreadsheetId: result.spreadsheet.getId(),
    sheetId: result.sheet.getSheetId(),
  };
}

function validatePayload_(data) {
  const name = sanitizeTextValue_(data.name, 100);
  const mobile = sanitizeTextValue_(data.mobile, 20);
  const trainingLevel = sanitizeTextValue_(data.trainingLevel, 30);
  const goal = sanitizeTextValue_(data.goal, 200);
  const message = sanitizeTextValue_(data.message, 500);

  if (!name || !mobile || !trainingLevel || !goal) {
    throw new Error("Missing required fields");
  }

  if (VALID_TRAINING_LEVELS.indexOf(trainingLevel) === -1) {
    throw new Error("Invalid training level");
  }

  return {
    name,
    mobile,
    trainingLevel,
    goal,
    message,
  };
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return buildJsonResponse_({ success: false, error: "Missing request body" });
    }

    const payload = validatePayload_(JSON.parse(e.postData.contents));
    const result = getOrCreateConfiguredSheet_();
    const whatsappDigits = normalizeMobileForWhatsApp_(payload.mobile);
    const whatsappLink = whatsappDigits
      ? `=HYPERLINK("https://wa.me/${whatsappDigits}","فتح واتساب")`
      : "";

    result.sheet.appendRow([
      Utilities.formatDate(new Date(), TIMEZONE, "dd/MM/yyyy - hh:mm a"),
      payload.name,
      payload.mobile,
      whatsappLink,
      payload.trainingLevel,
      payload.goal,
      payload.message,
      "جديد",
      "",
      "",
    ]);

    result.sheet.autoResizeColumns(1, SHEET_HEADERS.length);

    return buildJsonResponse_({
      success: true,
      spreadsheetId: result.spreadsheet.getId(),
      spreadsheetUrl: result.spreadsheet.getUrl(),
      sheetName: result.sheet.getName(),
      sheetId: result.sheet.getSheetId(),
      lastRow: result.sheet.getLastRow(),
    });
  } catch (error) {
    return buildJsonResponse_({
      success: false,
      error: error && error.toString ? error.toString() : "Unknown error",
    });
  }
}

function doGet() {
  const spreadsheetId = getStoredSpreadsheetId_();

  return buildJsonResponse_({
    status: spreadsheetId ? "configured" : "not_configured",
    spreadsheetId,
    setupFunction: "createContactLeadsSpreadsheet",
    sheetName: SHEET_NAME,
  });
}
