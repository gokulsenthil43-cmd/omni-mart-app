// Send data to Google Sheets via Google Apps Script Web App URL
const GOOGLE_SCRIPT_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxLLvpwV9Ksa7XcGGY8s9xGe1Zy0c14n-wHYn4nTYwpVT8c8rWePV4LkODBwx94cftTRg/exec';

export const sendOrderToGoogleSheets = async (orderData: {
  orderId: string;
  total: number;
  items: string;
  latitude: number | null;
  longitude: number | null;
  timestamp: string;
}) => {
  try {
    const response = await fetch(GOOGLE_SCRIPT_WEB_APP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8', // Using text/plain to avoid CORS preflight issues with GAS
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
