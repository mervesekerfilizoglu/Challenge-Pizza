
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


  it('Pizza size seçimi yapıldı mı', () => {
    cy.visit('http://localhost:5173/PizzaOrderForm'); 
    // 
    // // Arrange
    cy.get('[data-cy="size-input"]').should('be.visible');
    // Act - Ad alanına geçersiz bir metin giriyoruz
    cy.get('[data-cy="size-input"]').first().type('me');
    
    // Assert - Hata mesajını doğrula
   // cy.contains(errorMessages.boyut);
  });

  it('Pizza kalınlık seçimi yapıldı mı', () => {
    cy.visit('http://localhost:5173/PizzaOrderForm'); 
    // 
    // // Arrange
    cy.get('[data-cy="hamur-input"]').should('be.visible');
    // Act - Ad alanına geçersiz bir metin giriyoruz
    cy.get('[data-cy="hamur-input"]').type('me');
    
    // Assert - Hata mesajını doğrula
   // cy.contains(errorMessages.kalinlik);
  });


  /*it('Ekstra malzeme seçimi yapıldı mı(minimum 4 malzeme)', () => {
    cy.visit('http://localhost:5173/PizzaOrderForm'); 
    // 
    // // Arrange
    cy.get('[data-cy="ekler-input"]').should('be.visible');
    // Act - Ad alanına geçersiz bir metin giriyoruz
    // Act: 4'ten az malzeme seçelim (örneğin 3 malzeme seçelim)
  cy.get('[data-cy="ekler-input"]').eq(0).check(); // 1. malzeme
  cy.get('[data-cy="ekler-input"]').eq(1).check(); // 2. malzeme
  cy.get('[data-cy="ekler-input"]').eq(2).check(); // 3. malzeme
   
    // Assert - Hata mesajını doğrula
   // cy.contains(errorMessages.malzememin).should('be.visible');
  });
   // Act: 4 veya daha fazla malzeme seçelim (örneğin 4 malzeme seçelim)
 /*  cy.get('[data-cy="ekler-input"]').eq(0).check(); // 1. malzeme
   cy.get('[data-cy="ekler-input"]').eq(1).check(); // 2. malzeme
   cy.get('[data-cy="ekler-input"]').eq(2).check(); // 3. malzeme
   cy.get('[data-cy="ekler-input"]').eq(3).check(); // 4. malzeme
   
   // Assert: Hata mesajı olmalı, çünkü 4 malzeme seçildi
   cy.contains(errorMessages.malzememin).should('not.exist');  // Hata mesajı görünmemeli*/




 /* it('Ekstra malzeme seçimi yapıldı mı(max 4 malzeme)', () => {
    cy.visit('http://localhost:5173/PizzaOrderForm'); 
    // 
    // // Arrange
    cy.get('[data-cy="ekler-input"]').should('be.visible');
    // Act - Ad alanına geçersiz bir metin giriyoruz
    // Act: 4'ten az malzeme seçelim (örneğin 3 malzeme seçelim)
  cy.get('[data-cy="ekler-input"]').eq(0).check(); // 1. malzeme
  cy.get('[data-cy="ekler-input"]').eq(1).check(); // 2. malzeme
  cy.get('[data-cy="ekler-input"]').eq(2).check(); // 3. malzeme
  cy.get('[data-cy="ekler-input"]').eq(3).check(); // 4. malzeme
  cy.get('[data-cy="ekler-input"]').eq(4).check(); // 5. malzeme
  cy.get('[data-cy="ekler-input"]').eq(5).check(); // 6. malzeme
  cy.get('[data-cy="ekler-input"]').eq(6).check(); // 7. malzeme
  cy.get('[data-cy="ekler-input"]').eq(7).check(); // 8. malzeme
  cy.get('[data-cy="ekler-input"]').eq(8).check(); // 9. malzeme
  cy.get('[data-cy="ekler-input"]').eq(9).check(); // 10. malzeme
  cy.get('[data-cy="ekler-input"]').eq(10).check(); //11. malzeme
  cy.get('[data-cy="ekler-input"]').eq(11).check(); //12. malzeme
   
    // Assert - Hata mesajını doğrula
   // cy.contains(errorMessages.malzememax).should('be.visible');
  });*/
  });
