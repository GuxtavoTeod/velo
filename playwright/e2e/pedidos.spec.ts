import { test, expect } from '@playwright/test';
import { generateOrderCode } from '../support/helpers';

/// AAA - Arrange, Act, Assert
/// PAV - Preparar, Agir, Verificar

test.describe('Consulta Pedido', () => {

    test.beforeEach(async ({page}) => {
    // Arrange
    await page.goto('http://localhost:5173/');
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
    
    await page.getByRole('link', { name: 'Consultar Pedido' }).click();
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido');
    })


    test('deve consultar um pedido aprovado', async ({ page }) => {
    // Test Data
    // const order = 'VLO-Q9HVAT'

    const order = {
      number: 'VLO-Q9HVAT',
      status: 'APROVADO',
      color: 'Lunar White',
      wheels: 'sport Wheels',
      customer: {
        name: 'Gustavo Teodoro do Amaral',
        email: 'gteodorox@gmail.com'
      },
      payment: 'À Vista'
    }
  
    // Act
    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order.number);
    await page.getByRole('button', { name: 'Buscar Pedido' }).click();
  
    // Assert
    // await expect(page.getByText(order)).toBeVisible();
    // await expect(page.getByTestId('order-result-VLO-Q9HVAT')).toContainText(order);
  
    // await expect(page.getByText('APROVADO')).toBeVisible();
    // await expect(page.getByTestId('order-result-VLO-Q9HVAT')).toContainText('APROVADO');


    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - img
      - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);
  
  });

  test('deve consultar um pedido reprovado', async ({ page }) => {
    // Test Data
    // const order = 'VLO-S1XP84'
    const order = {
      number: 'VLO-S1XP84',
      status: 'REPROVADO',
      color: 'Midnight Black',
      wheels: 'aero Wheels',
      customer: {
        name: 'Roberto Carlos',
        email: 'zomberking1@gmail.com'
      },
      payment: 'À Vista'
    }
  
    // Act
    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order.number);
    await page.getByRole('button', { name: 'Buscar Pedido' }).click();

    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - img
      - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);
  
  });
  
  test('deve exibir mensagem de erro quando o pedido não for encontrado', async ({ page }) => {
  
    // Test Data
    const order = generateOrderCode();
  
    // Act
    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order);
    await page.getByRole('button', { name: 'Buscar Pedido' }).click();
  
    // Assert
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - img
      - heading "Pedido não encontrado" [level=3]
      - paragraph: Verifique o número do pedido e tente novamente
      `);
  });
});




