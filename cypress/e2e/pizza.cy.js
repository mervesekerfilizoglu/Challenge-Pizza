describe('PizzaOrderForm', () => {
  describe('Error Messages', () => {
  it('Name input throws error for min 3 chars', () => {
    cy.visit('http://localhost:5173/')//Arrange
      //Act
   
      cy.get('[data-cy="ad-input"]').type('ab') 
         
    //assert
    cy.contains("Ad minimum 4 karakter olmalı.").should('be visible');
    
  });

  it('Pizza boyutu seçilmeli', () => {
    cy.visit('http://localhost:5175/')//Arrange
      //Act
   
      cy.get('[data-cy="size-input"]').check()
      .should('be.checked'); 
         
    //assert
    cy.contains("Lütfen pizza boyutu seçin.").should('be visible');
  });


});
});