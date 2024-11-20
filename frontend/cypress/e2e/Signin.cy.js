describe('Login spec', () => {
  /* it('Login page with form', () => {
    cy.visit('http://localhost:3001/')
    cy.get('#root>div>div>div.flex-1.flex.flex-col.justify-center.items-center>form>label>input[placeholder=\'username\']').type("jonaspull")
    cy.get('#root>div>div>div.flex-1.flex.flex-col.justify-center.items-center>form>label>input[placeholder*="password"]').type("123456")
    cy.get('#root>div>div>div.flex-1.flex.flex-col.justify-center.items-center>form>button').should("contain","Login")
    cy.get('#root>div>div>div.flex-1.flex.flex-col.justify-center.items-center>form>button').click()
  }) */
 
  it('Signup page with button login', () => {
    cy.visit('http://localhost:3001/signup')
    cy.get("#root > div > div.max-w-screen-xl.mx-auto.flex.h-screen.px-10 > div.flex-1.flex.flex-col.justify-center.items-center > div > a > button").click()
    cy.get('#root>div>div>div.flex-1.flex.flex-col.justify-center.items-center>form>label>input[placeholder=\'username\']').type("user1")
    cy.get('#root>div>div>div.flex-1.flex.flex-col.justify-center.items-center>form>label>input[placeholder*="password"]').type("123456")
    cy.get('#root>div>div>div.flex-1.flex.flex-col.justify-center.items-center>form>button').should("contain","Login")
    cy.get('#root>div>div>div.flex-1.flex.flex-col.justify-center.items-center>form>button').click()
  })
})