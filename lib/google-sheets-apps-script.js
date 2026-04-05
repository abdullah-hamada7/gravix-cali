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

const SCRIPT_SHEET_NAME = "Leads";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SCRIPT_SHEET_NAME);

    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({ error: "Sheet not found" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Create headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Name",
        "Mobile",
        "Training Level",
        "Goal",
        "Message",
      ]);
    }

    sheet.appendRow([
      new Date().toISOString(),
      data.name || "",
      data.mobile || "",
      data.trainingLevel || "",
      data.goal || "",
      data.message || "",
    ]);

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
