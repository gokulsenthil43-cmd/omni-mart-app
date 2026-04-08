// Send data to Google Sheets via Google Apps Script Web App URL
// You need to replace the URL below with your actual deployed script URL.

const GOOGLE_SCRIPT_WEB_APP_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';

export const sendOrderToGoogleSheets = async (orderData: {
  orderId: string;
  total: number;
  items: string;
  latitude: number | null;
  longitude: number | null;
  timestamp: string;
}) => {
  if (GOOGLE_SCRIPT_WEB_APP_URL === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE') {
    console.warn('Google Sheets integration URL not configured. Skipping submission.');
    return;
  }

  try {
    const response = await fetch(GOOGLE_SCRIPT_WEB_APP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error(`Failed to send data: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error sending order to Google Sheets:', error);
    throw error;
  }
};
