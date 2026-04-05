// Google Apps Script — Deploy this to connect Google Sheets as your form backend.
//
// SETUP STEPS:
// 1. Create a new Google Sheet (sheets.new)
// 2. Name the sheet "Leads" (or keep default "Sheet1" and update SCRIPT_SHEET_NAME below)
// 3. Go to Extensions > Apps Script
// 4. Delete all existing code and paste this entire file
// 5. Use the target tab gid below, or change it if you switch tabs later
// 6. Click Deploy > New deployment
// 7. Select type: Web app
// 7. Set "Execute as": Me
// 8. Set "Who has access": Anyone  (this is critical — allows anonymous POSTs)
// 9. Click Deploy, authorize the script, then copy the Web app URL
// 10. Add that URL to your Vercel env vars as GOOGLE_SHEETS_WEBHOOK_URL
// 11. Replace SPREADSHEET_ID below with the ID from your Google Sheet URL if needed

const SPREADSHEET_ID = "1GPWgfe6acHX17lrXmBHAXFSgYsWbH-C8-j3CmIoPo0k";
const SCRIPT_SHEET_GID = 1808222242;
const SCRIPT_SHEET_NAME = "Leads";
const SCRIPT_TIMEZONE = "Africa/Cairo";
const VALID_TRAINING_LEVELS = ["beginner", "intermediate", "advanced"];
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

function normalizeMobileForWhatsApp(value) {
  return String(value || "").replace(/\D/g, "");
}

function sanitizeTextValue(value, maxLength) {
  const normalized = String(value || "").trim().slice(0, maxLength);

  if (/^[=+\-@]/.test(normalized)) {
    return `'${normalized}`;
  }

  return normalized;
}

function buildErrorResponse(message) {
  return ContentService.createTextOutput(
    JSON.stringify({ success: false, error: message })
  ).setMimeType(ContentService.MimeType.JSON);
}

function getTargetSheet(spreadsheet) {
  const sheet = spreadsheet
    .getSheets()
    .find((item) => item.getSheetId() === SCRIPT_SHEET_GID);

  if (sheet) {
    return sheet;
  }

  return spreadsheet.getSheetByName(SCRIPT_SHEET_NAME);
}

function getOrCreateTargetSheet(spreadsheet) {
  let sheet = getTargetSheet(spreadsheet);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SCRIPT_SHEET_NAME);
  }

  return sheet;
}

function ensureSheetSetup(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(SHEET_HEADERS);
  }

  const headerRange = sheet.getRange(1, 1, 1, SHEET_HEADERS.length);
  headerRange.setValues([SHEET_HEADERS]);

  headerRange
    .setFontWeight("bold")
    .setBackground("#163229")
    .setFontColor("#D9FF66");

  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, SHEET_HEADERS.length);

  const statusColumn = 8;
  const dataRange = sheet.getRange(2, 1, Math.max(sheet.getMaxRows() - 1, 1), SHEET_HEADERS.length);
  const statusRange = sheet.getRange(2, statusColumn, Math.max(sheet.getMaxRows() - 1, 1), 1);
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
      .whenFormulaSatisfied('=$J2<TODAY()')
      .setBackground("#F4CCCC")
      .setRanges([dataRange])
      .build(),
  ];

  sheet.setConditionalFormatRules(rules);
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return buildErrorResponse("Missing request body");
    }

    const data = JSON.parse(e.postData.contents);
    const name = sanitizeTextValue(data.name, 100);
    const mobile = sanitizeTextValue(data.mobile, 20);
    const trainingLevel = sanitizeTextValue(data.trainingLevel, 30);
    const goal = sanitizeTextValue(data.goal, 200);
    const message = sanitizeTextValue(data.message, 500);

    if (!name || !mobile || !trainingLevel || !goal) {
      return buildErrorResponse("Missing required fields");
    }

    if (VALID_TRAINING_LEVELS.indexOf(trainingLevel) === -1) {
      return buildErrorResponse("Invalid training level");
    }

    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = getOrCreateTargetSheet(spreadsheet);

    ensureSheetSetup(sheet);

    const whatsappDigits = normalizeMobileForWhatsApp(mobile);
    const whatsappLink = whatsappDigits
      ? `=HYPERLINK("https://wa.me/${whatsappDigits}","فتح واتساب")`
      : "";

    sheet.appendRow([
      Utilities.formatDate(new Date(), SCRIPT_TIMEZONE, "dd/MM/yyyy - hh:mm a"),
      name,
      mobile,
      whatsappLink,
      trainingLevel,
      goal,
      message,
      "جديد",
      "",
      "",
    ]);

    sheet.autoResizeColumns(1, SHEET_HEADERS.length);

    const lastRow = sheet.getLastRow();

    Logger.log(
      JSON.stringify({
        spreadsheetId: spreadsheet.getId(),
        sheetName: sheet.getName(),
        sheetId: sheet.getSheetId(),
        lastRow,
      })
    );

    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        spreadsheetId: spreadsheet.getId(),
        sheetName: sheet.getName(),
        sheetId: sheet.getSheetId(),
        lastRow,
      })
    )
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return buildErrorResponse(error && error.toString ? error.toString() : "Unknown error");
  }
}

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: "ok",
      spreadsheetId: SPREADSHEET_ID,
      targetSheetGid: SCRIPT_SHEET_GID,
      fallbackSheetName: SCRIPT_SHEET_NAME,
    })
  )
    .setMimeType(ContentService.MimeType.JSON);
}
