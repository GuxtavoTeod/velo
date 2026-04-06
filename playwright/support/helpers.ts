export function generateOrderCode() {
    const prefix = 'VLO';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
  
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      code += chars[randomIndex];
    }
  
    return `${prefix}-${code}`;
  }
  
  // Exemplo de uso
  const order = generateOrderCode();
  console.log(order); // Ex: VLO-Q9HVAT