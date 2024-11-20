describe('Signup', () => {
  /* it('signup of since the page', () => {
    cy.visit('http://localhost:3001/signup')
    cy.get('#root > div > div.max-w-screen-xl.mx-auto.flex.h-screen.px-10 > div.flex-1.flex.flex-col.justify-center.items-center > form > label:nth-child(3) > input').type("user1@1.com")
    cy.get('#root > div > div.max-w-screen-xl.mx-auto.flex.h-screen.px-10 > div.flex-1.flex.flex-col.justify-center.items-center > form > div > label:nth-child(1) > input').type("user1")
    cy.get('#root > div > div.max-w-screen-xl.mx-auto.flex.h-screen.px-10 > div.flex-1.flex.flex-col.justify-center.items-center > form > div > label:nth-child(2) > input').type("user1 example")
    cy.get('#root > div > div.max-w-screen-xl.mx-auto.flex.h-screen.px-10 > div.flex-1.flex.flex-col.justify-center.items-center > form > label:nth-child(5) > input').type("123456")
    cy.get('#root > div > div.max-w-screen-xl.mx-auto.flex.h-screen.px-10 > div.flex-1.flex.flex-col.justify-center.items-center > form > button').click()
  }) */
    it('signup of since button of Login', () => {
      cy.visit('http://localhost:3001/')
      cy.get("#root > div > div.max-w-screen-xl.mx-auto.flex.h-screen > div.flex-1.flex.flex-col.justify-center.items-center > div > a > button").click()
      cy.get('#root > div > div.max-w-screen-xl.mx-auto.flex.h-screen.px-10 > div.flex-1.flex.flex-col.justify-center.items-center > form > label:nth-child(3) > input').type("user3@3.com")
      cy.get('#root > div > div.max-w-screen-xl.mx-auto.flex.h-screen.px-10 > div.flex-1.flex.flex-col.justify-center.items-center > form > div > label:nth-child(1) > input').type("user3")
      cy.get('#root > div > div.max-w-screen-xl.mx-auto.flex.h-screen.px-10 > div.flex-1.flex.flex-col.justify-center.items-center > form > div > label:nth-child(2) > input').type("user3 example")
      cy.get('#root > div > div.max-w-screen-xl.mx-auto.flex.h-screen.px-10 > div.flex-1.flex.flex-col.justify-center.items-center > form > label:nth-child(5) > input').type("123456")
      cy.get('#root > div > div.max-w-screen-xl.mx-auto.flex.h-screen.px-10 > div.flex-1.flex.flex-col.justify-center.items-center > form > button').click()
    })
 
})