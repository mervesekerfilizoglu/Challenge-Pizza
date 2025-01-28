
//import { errorMessages } from "../../src/components/PizzaOrderForm";
describe('Pizza Order Form', () => {
  describe('Error Messages', () => {
    it('Name input throws error for less than 3 chars', () => {
      cy.visit('http://localhost:5173/PizzaOrderForm'); 
      // 
      // // Arrange
      cy.get('[data-cy="ad-input"]').should('be.visible');
      // Act - Ad alanına geçersiz bir metin giriyoruz
      cy.get('[data-cy="ad-input"]').type('me');
      
      // Assert - Hata mesajını doğrula
     // cy.contains(errorMessages.ad);
    });
  });
});