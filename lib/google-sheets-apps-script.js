// Google Apps Script — Deploy this to connect Google Sheets as your form backend.
//
// SETUP STEPS:
// 1. Create a new Google Sheet (sheets.new)
// 2. Name the sheet "Leads" (or keep default "Sheet1" and update SCRIPT_SHEET_NAME below)
// 3. Go to Extensions > Apps Script
// 4. Delete all existing code and paste this entire file
// 5. Click Deploy > New deployment
// 6. Select type: Web app
// 7. Set "Execute as": Me
// 8. Set "Who has access": Anyone  (this is critical — allows anonymous POSTs)
// 9. Click Deploy, authorize the script, then copy the Web app URL
// 10. Add that URL to your Vercel env vars as GOOGLE_SHEETS_WEBHOOK_URL
// 11. Replace SPREADSHEET_ID below with the ID from your Google Sheet URL

const SPREADSHEET_ID = "1GPWgfe6acHX17lrXmBHAXFSgYsWbH-C8-j3CmIoPo0k";
const SCRIPT_SHEET_NAME = "Leads";
const SCRIPT_TIMEZONE = "Africa/Cairo";
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
    const data = JSON.parse(e.postData.contents);
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SCRIPT_SHEET_NAME);

    if (!sheet) {
      sheet = spreadsheet.insertSheet(SCRIPT_SHEET_NAME);
    }

    ensureSheetSetup(sheet);

    const mobile = data.mobile || "";
    const whatsappDigits = normalizeMobileForWhatsApp(mobile);
    const whatsappLink = whatsappDigits
      ? `=HYPERLINK("https://wa.me/${whatsappDigits}","فتح واتساب")`
      : "";

    sheet.appendRow([
      Utilities.formatDate(new Date(), SCRIPT_TIMEZONE, "dd/MM/yyyy - hh:mm a"),
      data.name || "",
      mobile,
      whatsappLink,
      data.trainingLevel || "",
      data.goal || "",
      data.message || "",
      "جديد",
      "",
      "",
    ]);

    sheet.autoResizeColumns(1, SHEET_HEADERS.length);

    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput(JSON.stringify({ status: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);
}
