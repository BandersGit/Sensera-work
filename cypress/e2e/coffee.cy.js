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

  it('Should have at least two divs with class coffee-item in order-container', () => {
    cy.get('section.order-container div.coffee-item').should('have.length.at.least', 2)
  })

  it('Should have a data price attribute inside coffee item div', () => {
    cy.get('div.coffee-item[data-price]').should('exist')
  })

  it('Should have buttons inside coffee item div', () => {
    cy.get('div.coffee-item').first().find('button').its('length').should('eq', 2)
  })

  it('Should have a script element inside head element with "defer" attribute', () => {
    cy.get('head script[defer]').should('exist')

  })

  //Todo: fyll eventuellt på med resterande tester av struktur och attribut




  it('Should display the correct quantity of added coffee items', () => {
    cy.get('.add-button').then(($addBtn) => {
      cy.wrap($addBtn).click({ multiple: true }).click({ multiple: true })
      .get('.quantity').filter(':contains("2")').should('have.length', $addBtn.length)
    })
  })

  //Test not done
  it('Should display the correct quantity of coffee items after subtract button is clicked', () => {
    cy.get('.add-button').then(($addBtn) => {
      cy.wrap($addBtn).click({ multiple: true }).click({ multiple: true })
      .get('.quantity').filter(':contains("2")').should('have.length', $addBtn.length)
    })
  })

  it('Should display total cost of added and reduced coffee items', () => {

    let totalCost = 0
    cy.get('.coffee-item').each(($item) => {

      cy.wrap($item).find('.add-button').click().click()
      cy.wrap($item).invoke('attr', 'data-price').then(price => {
        totalCost += price * 2
        console.log(typeof totalCost)
      })
      cy.wrap($item).find('.subtract-button').click()
      cy.wrap($item).invoke('attr', 'data-price').then(price => {
        totalCost -= price
        console.log(typeof totalCost)
      })
    }).then(() => {
      cy.get('#total-amount').invoke('text').then(parseInt).should('eq', totalCost)
    })
  })


})