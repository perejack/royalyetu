export const createWhatsAppMessage = (
  productName: string,
  gauge: string,
  finish: string,
  quantity: number,
  total: number
) => {
  return `
*New Order from Royal Mabati*
Product: ${productName}
Gauge: ${gauge}
Finish: ${finish}
Quantity: ${quantity}
Total: KSh ${total.toFixed(2)}
  `.trim();
};

export const sendToWhatsApp = (message: string, phoneNumber: string) => {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
};