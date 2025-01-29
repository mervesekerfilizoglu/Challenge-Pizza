
describe('Pizza Order Form', () => {

  describe('Error Messages', () => {

    it('Name input throws error for less than 4 chars', () => {
      cy.visit('http://localhost:5173/PizzaOrderForm'); 
      // Arrange
      cy.get('[data-cy="ad-input"]').should('be.visible');
      // Act - Ad alanına geçersiz bir metin giriyoruz
      cy.get('[data-cy="ad-input"]').type('me');
      // Assert - Hata mesajını doğrula
      cy.contains("Lütfen adınızı minimum 4 karakter olacak şekilde giriniz.").should('be.visible');
      cy.get('[data-cy="ad-input"]').clear()
    });

    it('Ekstra malzeme seçimi yapıldı mı (minimum 4 malzeme)', () => {
      cy.visit('http://localhost:5173/PizzaOrderForm'); 
      // Arrange
     // cy.get('[data-cy="ekler-input"]').should('be.visible');
      
      // Act - 3 malzeme seçiyoruz (minimum 4 malzeme hatasını kontrol etmek için)
      cy.get('[data-cy="ekler-input"]').eq(0).check(); // 1. malzeme
      cy.get('[data-cy="ekler-input"]').eq(1).check(); // 2. malzeme
      cy.get('[data-cy="ekler-input"]').eq(2).check(); // 3. malzeme
      // Assert - Hata mesajını doğrula
      cy.get('[data-cy="topping-error"]').should("be.visible").and("contain", "Lütfen en az 4 adet malzeme seçiniz");

      // Act - 4 malzeme seçiyoruz (minimum 4 malzeme hatası geçmeli)
      cy.get('[data-cy="ekler-input"]').eq(3).check(); // 4. malzeme
     
      // Assert - Hata mesajı kaybolmalı
      cy.get('[data-cy="topping-error"]').should("not.exist");
    }); 








    
    it("should disable the submit button if the form is invalid", () => {
      cy.visit("http://localhost:5173/PizzaOrderForm");
  
      // İlk başta geçerli olmayan bir form var, butonun devre dışı olduğunu doğrula
      cy.get('[data-cy="submit-button"]').should("be.disabled");
  
      // Boyut, hamur ve malzeme seçimi
      cy.get('[data-cy="hamur-input"]').select('İnce');
      cy.get('[data-cy="size-input"]').eq(1).check(); // Orta boy
      cy.get('[data-cy="ekler-input"]').eq(0).check(); // 1. malzeme
      cy.get('[data-cy="ekler-input"]').eq(1).check(); // 2. malzeme
      cy.get('[data-cy="ekler-input"]').eq(2).check(); // 3. malzeme

      cy.get('[data-cy="submit-button"]').should("be.disabled");

      cy.get('[data-cy="ekler-input"]').eq(3).check();
   //   cy.get('[data-cy="submit-button"]').should("not.be.disabled");
 
    });
  });
  

  it("should display specific error messages for each field", () => {
    cy.visit("http://localhost:5173/PizzaOrderForm");

     // İsmi boş bırakarak isim hatasını tetikle
     cy.get('[data-cy="size-input"]').eq(1).check(); // Bir boyut seç
     cy.get('[data-cy="hamur-input"]').select('İnce');  // Bir hamur seç
     cy.get('[data-cy="ekler-input"]').eq(0).check(); // En az 4 malzeme seç
     cy.get('[data-cy="ekler-input"]').eq(1).check();
     cy.get('[data-cy="ekler-input"]').eq(2).check();
     cy.get('[data-cy="ekler-input"]').eq(3).check();

       // Submit butonunun devre dışı olduğunu kontrol et
  cy.get('[data-cy="submit-button"]').should('be.disabled');
    // Artık isim giriyoruz, ve butonun aktif olmasını bekliyoruz
    cy.get('[data-cy="ad-input"]').type("merve");
    // Submit butonunun aktif hale gelmesini bekle
  cy.get('[data-cy="submit-button"]').should("not.be.disabled");

  // Tıklama işlemini yapalım
  cy.get('[data-cy="submit-button"]').click(); // Artık tıklama çalışmalı
   //  cy.get('[data-cy="name-warning"]').should('be.visible').and('contain', "İsim alanı zorunludur.");

     // Boyut hatasını test et
     cy.visit("http://localhost:5173/PizzaOrderForm");
     cy.get('[data-cy="ad-input"]').type('merve');
     cy.get('[data-cy="hamur-input"]').select('İnce');
     cy.get('[data-cy="ekler-input"]').eq(0).check();
     cy.get('[data-cy="ekler-input"]').eq(1).check();
     cy.get('[data-cy="ekler-input"]').eq(2).check();
     cy.get('[data-cy="ekler-input"]').eq(3).check();
    // cy.get('[data-cy="submit-button"]').click();
   //  cy.get('.error-message').should('have.length', 1);
   
   //  cy.get('[data-cy="size-error"]').should("be.visible").and("contain", "Boyut alanı zorunludur");

     // Hamur hatasını test et
     cy.visit("http://localhost:5173/PizzaOrderForm");
     cy.get('[data-cy="ad-input"]').type('merve');
     cy.get('[data-cy="size-input"]').eq(1).check();
     cy.get('[data-cy="ekler-input"]').eq(0).check();
     cy.get('[data-cy="ekler-input"]').eq(1).check();
     cy.get('[data-cy="ekler-input"]').eq(2).check();
     cy.get('[data-cy="ekler-input"]').eq(3).check();
    // cy.get('[data-cy="submit-button"]').click();
    // cy.get('[data-cy="crust-error"]').should('be.visible').and('contain', "Hamur alanı zorunludur.");

     // Malzeme hatasını test et
     cy.visit("http://localhost:5173/PizzaOrderForm");
     cy.get('[data-cy="ad-input"]').type('merve');
     cy.get('[data-cy="size-input"]').eq(1).check();
     cy.get('[data-cy="hamur-input"]').select('İnce');
     cy.get('[data-cy="submit-button"]').click();
     cy.get('.error-message').should('have.length', 1);
     cy.contains("En az 4 malzeme seçmelisiniz.").should('be.visible');
 });
});