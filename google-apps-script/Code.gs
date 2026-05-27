/**
 * Вставьте этот код в Google Apps Script (Расширения → Apps Script),
 * привяжите к Google Таблице и разверните как веб-приложение:
 * Развернуть → Новое развертывание → Веб-приложение
 * - Выполнять от имени: Я
 * - Доступ: Все
 *
 * Заголовки строки 1 в таблице:
 * Дата | Имя | Телефон | Email | Услуга | ОГ | ОТ | ОБ | Описание | Источник
 */

function doPost(e) {
  try {
    const p = e.parameter || {};
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    sheet.appendRow([
      new Date(),
      p.name || '',
      p.phone || '',
      p.email || '',
      p.serviceLabel || p.service || '',
      p.chest || '',
      p.waist || '',
      p.hips || '',
      p.description || '',
      p.source || 'online-order'
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
