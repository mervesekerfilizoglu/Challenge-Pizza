
describe('Pizza Order Form', () => {

  describe('Hata Mesajları', () => {

    it('4 karakterden daha az isim girişi için hata dönüyor mu?', () => {
      cy.visit('http://localhost:5173/PizzaOrderForm');
      // Arrange
      cy.get('[data-cy="ad-input"]').should('be.visible');
      // Act - Ad alanına geçersiz bir metin giriyoruz
      cy.get('[data-cy="ad-input"]').type('me');
      // Assert - Hata mesajını doğrula
      cy.contains("Lütfen adınızı minimum 4 karakter olacak şekilde giriniz.").should('be.visible');
      cy.get('[data-cy="ad-input"]').clear()
    });

    it('En az 4, en çok 10 ekstra malzeme seçimi yapılmış mı?', () => {
      cy.visit('http://localhost:5173/PizzaOrderForm');
      // Arrange
      // cy.get('[data-cy="ekler-input"]').should('be.visible');

      // Act - 3 malzeme seçiyoruz (minimum 4 malzeme hatasını kontrol etmek için)
      cy.get('[data-cy="ekler-input"]').eq(0).check(); // 1. malzeme
      cy.get('[data-cy="ekler-input"]').eq(1).check(); // 2. malzeme
      cy.get('[data-cy="ekler-input"]').eq(2).check(); // 3. malzeme
      // Assert - Hata mesajını doğrula
      cy.get('[data-cy="topping-error"]').should("be.visible").and("contain", "Lütfen en az 4 adet malzeme seçiniz.");
      
      // Act - 12 malzeme seçiyoruz (max 10 malzeme hatası geçmeli)
      cy.get('[data-cy="ekler-input"]').eq(3).check(); // 4. malzeme
      cy.get('[data-cy="ekler-input"]').eq(4).check(); // 5. malzeme
      cy.get('[data-cy="ekler-input"]').eq(5).check(); // 6. malzeme
      cy.get('[data-cy="ekler-input"]').eq(6).check(); // 7. malzeme
      cy.get('[data-cy="ekler-input"]').eq(7).check(); // 8. malzeme
      cy.get('[data-cy="ekler-input"]').eq(8).check(); // 9. malzeme
      cy.get('[data-cy="ekler-input"]').eq(9).check(); // 10. malzeme
      cy.get('[data-cy="ekler-input"]').eq(10).check();// 11. malzeme
      cy.get('[data-cy="ekler-input"]').eq(11).check();// 12. malzeme

      // Assert - Hata mesajını doğrula
      cy.get('[data-cy="topping-error"]').should("be.visible").and("contain", "Lütfen en fazla 10 adet malzeme seçiniz.");

      cy.get('[data-cy="ekler-input"]').eq(10).uncheck();
      cy.get('[data-cy="ekler-input"]').eq(11).uncheck();

      // Assert - Hata mesajı kaybolmalı
      cy.get('[data-cy="topping-error"]').should("not.exist");
    });

    it("Form içerisinde uyarılar mevcut ise Submit butonu tıklanabilir olmamalıdır.", () => {
      cy.visit("http://localhost:5173/PizzaOrderForm");

      // İlk başta geçerli olmayan bir form var, butonun devre dışı olduğunu doğrula
      cy.get('[data-cy="submit-button"]').should("be.disabled");

      // Boyut, hamur ve malzeme seçimi
      cy.get('[data-cy="hamur-input"]').select('Kalın');
      cy.get('[data-cy="size-input"]').eq(1).check(); // Orta boy
      cy.get('[data-cy="ekler-input"]').eq(0).check(); // 1. malzeme
      cy.get('[data-cy="ekler-input"]').eq(1).check(); // 2. malzeme
      cy.get('[data-cy="ekler-input"]').eq(2).check(); // 3. malzeme

      cy.get('[data-cy="submit-button"]').should("be.disabled");

      cy.get('[data-cy="ekler-input"]').eq(3).check();
      cy.get('[data-cy="ad-input"]').type('merve');
      cy.get('[data-cy="submit-button"]').should("not.be.disabled");

    });
  });

  it("Her alan için belirli hata mesajları gösterilmelidir.", () => {
    cy.visit("http://localhost:5173/PizzaOrderForm");

    // İsmi boş bırakarak isim hatasını tetikle
    cy.get('[data-cy="size-input"]').eq(1).check(); // Bir boyut seç
    cy.get('[data-cy="hamur-input"]').select('Normal');  // Bir hamur seç
    cy.get('[data-cy="ekler-input"]').eq(0).check(); // En az 4 malzeme seç
    cy.get('[data-cy="ekler-input"]').eq(1).check();
    cy.get('[data-cy="ekler-input"]').eq(2).check();
    cy.get('[data-cy="ekler-input"]').eq(3).check();

    cy.get('[data-cy="ad-input"]').type("me");

    // Submit butonunun devre dışı olduğunu kontrol et
    cy.get('[data-cy="submit-button"]').should('be.disabled');

    cy.get('[data-cy="name-warning"]').should('be.visible').and('contain', "Lütfen adınızı minimum 4 karakter olacak şekilde giriniz.");
    
    // Artık isim giriyoruz, ve butonun aktif olmasını bekliyoruz
    cy.get('[data-cy="ad-input"]').type("merve");
    // Submit butonunun aktif hale gelmesini bekle
    cy.get('[data-cy="submit-button"]').should("not.be.disabled");

    // Tıklama işlemini yapalım
    cy.get('[data-cy="submit-button"]').click(); // Artık tıklama çalışmalı
    //  

    // Boyut hatasını test et
    cy.visit("http://localhost:5173/PizzaOrderForm");
    cy.get('[data-cy="ad-input"]').type('merve');
    cy.get('[data-cy="hamur-input"]').select('Kalın');
    cy.get('[data-cy="ekler-input"]').eq(0).check();
    cy.get('[data-cy="ekler-input"]').eq(1).check();
    cy.get('[data-cy="ekler-input"]').eq(2).check();
    cy.get('[data-cy="ekler-input"]').eq(3).check();
    //cy.get('[data-cy="size-error"]').should("be.visible").and("contain", "Lütfen boyut seçiniz.");
    // Submit butonunun devre dışı olduğunu kontrol et
    cy.get('[data-cy="submit-button"]').should('be.disabled');

    // Hamur hatasını test et
    cy.visit("http://localhost:5173/PizzaOrderForm");
    cy.get('[data-cy="ad-input"]').type('merve');
    cy.get('[data-cy="size-input"]').eq(1).check();
    cy.get('[data-cy="ekler-input"]').eq(0).check();
    cy.get('[data-cy="ekler-input"]').eq(1).check();
    cy.get('[data-cy="ekler-input"]').eq(2).check();
    cy.get('[data-cy="ekler-input"]').eq(3).check();
    // Submit butonunun devre dışı olduğunu kontrol et
    cy.get('[data-cy="submit-button"]').should('be.disabled');

    // cy.get('[data-cy="submit-button"]').click();
    // cy.get('[data-cy="crust-error"]').should('be.visible').and('contain', "Hamur alanı zorunludur.");
  });
});