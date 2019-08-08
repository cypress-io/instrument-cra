/// <reference types="cypress" />
it('shows React logo', () => {
  cy.visit('/')
    .get('.App-logo')
    .should('have.attr', 'alt', 'logo')
})
