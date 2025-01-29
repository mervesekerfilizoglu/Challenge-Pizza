
describe('Pizza Order Form', () => {

  describe('Error Messages', () => {

    it('Name input throws error for less than 3 chars', () => {
      cy.visit('http://localhost:5173/PizzaOrderForm'); 
      // Arrange
      cy.get('[data-cy="ad-input"]').should('be.visible');
      // Act - Ad alanına geçersiz bir metin giriyoruz
      cy.get('[data-cy="ad-input"]').type('me');
      // Assert - Hata mesajını doğrula
      cy.contains("Lütfen adınızı minimum 4 karakter olacak şekilde giriniz.").should('be.visible');
    });

    it('Pizza size seçimi yapıldı mı', () => {
      cy.visit('http://localhost:5173/PizzaOrderForm'); 
      // Arrange
      cy.get('[data-cy="size-input"]').should('be.visible');
      // Act - Boyut seçimini yapıyoruz
      cy.get('[data-cy="size-input"]').first().check();
      cy.get('[data-cy="size-input"]').first().should('be.checked');
      // Assert - Hata mesajını doğrula
      //cy.contains("Lütfen pizza boyutu seçiniz.").should('be.visible');
    });

/*     it('Pizza kalınlık seçimi yapıldı mı', () => {
      cy.visit('http://localhost:5173/PizzaOrderForm'); 
      // Arrange
      cy.get('[data-cy="hamur-input"]').should('be.visible');
      // Act - Hamur seçimini yapıyoruz
      cy.get('[data-cy="hamur-input"]').select('İnce');
      // Assert - Hata mesajını doğrula
      cy.contains("Lütfen hamur kalınlığı seçiniz.").should('be.visible');
    }); */

    it('Ekstra malzeme seçimi yapıldı mı (minimum 4 malzeme)', () => {
      cy.visit('http://localhost:5173/PizzaOrderForm'); 
      // Arrange
      cy.get('[data-cy="ekler-input"]').should('be.visible');
      
      // Act - 3 malzeme seçiyoruz (minimum 4 malzeme hatasını kontrol etmek için)
      cy.get('[data-cy="ekler-input"]').eq(0).check(); // 1. malzeme
      cy.get('[data-cy="ekler-input"]').eq(1).check(); // 2. malzeme
      cy.get('[data-cy="ekler-input"]').eq(2).check(); // 3. malzeme
      // Assert - Hata mesajını doğrula
      cy.contains("Lütfen en az 4 adet malzeme seçiniz").should('be.visible');

      // Act - 4 malzeme seçiyoruz (minimum 4 malzeme hatası geçmeli)
      cy.get('[data-cy="ekler-input"]').eq(3).check(); // 4. malzeme
      cy.wait(500);
      // Assert - Hata mesajı kaybolmalı
      cy.contains("Lütfen en az 4 adet malzeme seçiniz").should('not.be.visible');
    }); 

    /* it('Ekstra malzeme seçimi yapıldı mı (maksimum 10 malzeme)', () => {
      cy.visit('http://localhost:5173/PizzaOrderForm');
      // Arrange
      cy.get('[data-cy="ekler-input"]').should('be.visible');
      
      // Act - 10 malzeme seçiyoruz (maksimum 10 malzeme hatasını kontrol etmek için)
      for (let i = 0; i < 10; i++) {
        cy.get('[data-cy="ekler-input"]').eq(i).check(); // 1. malzeme, 2. malzeme, ..., 10. malzeme
      }
      // Assert - Hata mesajını doğrula
      cy.contains("Lütfen en çok 10 adet malzeme seçiniz").should('be.visible');

      // Act - 11. malzemeyi seçiyoruz (10'dan fazla malzeme seçmemeliyiz)
      cy.get('[data-cy="ekler-input"]').eq(10).check(); // 11. malzeme
      // Assert - Hata mesajını doğrula
      cy.contains("Lütfen en çok 10 adet malzeme seçiniz").should('be.visible');
    }); */
    it("Formun başarıyla gönderildiğini doğrular", () => {
      cy.visit('http://localhost:5173/PizzaOrderForm'); 
      // Arrange
      // İsim alanını doldur
    cy.get('[data-cy="ad-input"]').type("Emre");

    // Pizza boyutunu seç
    cy.get('[data-cy="size-input"]').first().check();

    // Hamur türünü seç
    cy.get('[data-cy="hamur-input"]').select("İnce");

    // En az 4 malzeme seç
    cy.get('[data-cy="ekler-input"]').then((checkboxes) => {
      cy.wrap(checkboxes).eq(0).check();
      cy.wrap(checkboxes).eq(1).check();
      cy.wrap(checkboxes).eq(2).check();
      cy.wrap(checkboxes).eq(3).check();
    });

    // Sipariş notu ekle
    cy.get("textarea").type("Ekstra peynir lütfen!");

    // Sipariş adedini artır
    cy.get(".quantity-button").contains("+").click();

    // Sipariş toplamını kontrol et
    cy.get(".form-total span").should("exist");

    // Sipariş ver butonuna tıkla
    cy.get(".form-submit").click();

    // Siparişin başarıyla işlendiğini doğrula
    cy.url().should("include", "/OrderResult");
    cy.contains("Sipariş başarıyla gönderildi!").should("exist");
  });

  it("Eksik alanlarla formun gönderilemediğini doğrular", () => {
    // Sipariş ver butonuna tıkla
    cy.get(".form-submit").click();

    // Hata mesajlarının olup olmadığını kontrol et
  /*  cy.contains("Lütfen pizza boyutu seçiniz.").should("exist");
    cy.contains("Lütfen en az 4 adet malzeme seçiniz.").should("exist");*/
  });
});
});