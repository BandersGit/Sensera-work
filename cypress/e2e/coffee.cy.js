/// <reference types="cypress"/>

beforeEach(() => {
  cy.visit('http://localhost:5500/coffee/coffee.html')
})

describe('Coffee tests', () => {

  it('Should have a header element', () => {
    cy.get('header').should('exist')
  })

  it('Should have a main element', () => {
    cy.get('main').should('exist')
  })

  it('Should have a order-cointainer section', () => {
    cy.get('section.order-container').should('exist')
  })

  it('Should have an h1 element', () => {
    cy.get('h1').should('exist')
  })

  it('Should have only one h1 element', () => {
    cy.get('h1').its('length').should('eq', 1)
  })

  it('Should have at least one h2 in order-container', () => {
    cy.get('section.order-container h2').should('exist')
  })

  it('Should have at least one div in order-container', () => {
    cy.get('section.order-container div').should('exist')
  })
})