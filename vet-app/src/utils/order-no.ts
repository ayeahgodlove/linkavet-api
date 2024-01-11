export function generateOrderNumber(): string {
    const timestamp = new Date().getTime().toString();
    const randomDigits = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  
    // You can add more components as needed
    const orderNumber = `LINKAVET-ORDNO-${timestamp}-${randomDigits}`;
  
    return orderNumber;
  }
  