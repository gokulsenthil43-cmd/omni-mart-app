// Send data to Google Sheets via Google Apps Script Web App URL
const GOOGLE_SCRIPT_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwJH3saz4z0C8Y1ggzWEt0yTTCkpN-1g4WYrQHfFslpIB_F-2_UdmR4xS9gQrgmQfZYIA/exec';

export const sendOrderToGoogleSheets = async (orderData: {
  timestamp: string;
  orderId: string;
  items: string;
  total: number;
  specificLocation: string;
  areaName: string;
  mapLink: string;
  latitude: number | null;
  longitude: number | null;
}) => {
  try {
    // We use no-cors to bypass complex preflight checks for simple data logging
    const response = await fetch(GOOGLE_SCRIPT_WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors', // Critical for Apps Script redirection and cross-origin
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    // With mode: 'no-cors', the response type is 'opaque', and response.ok will be false.
    // However, the data will still reach the Google Sheet if configured correctly.
    return { result: 'success' };
  } catch (error) {
    console.error('Error sending order to Google Sheets:', error);
    throw error;
  }
};
