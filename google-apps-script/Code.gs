/**
 * Код для Google Apps Script — имена полей как в таблице:
 * Timestamp | full_name | phone | email | service_type | chest | waist | hips | order_description
 */

function doPost(e) {
  try {
    const p = e.parameter || {};
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    sheet.appendRow([
      p.Timestamp ? new Date(p.Timestamp) : new Date(),
      p.full_name || '',
      p.phone || '',
      p.email || '',
      p.service_type || '',
      p.chest || '',
      p.waist || '',
      p.hips || '',
      p.order_description || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput('Форма заказа: используйте POST')
    .setMimeType(ContentService.MimeType.TEXT);
}
