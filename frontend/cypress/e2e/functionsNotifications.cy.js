
describe('functions home spec', () => {
    context('1280, 720 resolution', () => {

        beforeEach('Login', () => {
            cy.wait(200)
            cy.viewport(1280, 720)
            cy.visit('http://localhost:3001/')
            //login
            cy.get('#root>div>div>div.flex-1.flex.flex-col.justify-center.items-center>form>label>input[placeholder=\'username\']').type("user1")
            cy.get('#root>div>div>div.flex-1.flex.flex-col.justify-center.items-center>form>label>input[placeholder*="password"]').type("123456")
            cy.get('#root>div>div>div.flex-1.flex.flex-col.justify-center.items-center>form>button').should("contain", "Login")
            cy.get('#root>div>div>div.flex-1.flex.flex-col.justify-center.items-center>form>button').click()
        })

       it('clear notifications', () => {
            cy.wait(200)
            cy.viewport(1280, 720)
            cy.visit('http://localhost:3001/notifications')
            cy.wait(300)
            cy.get("#root > div.flex.max-w-6xl.mx-auto > div.flex-\\[4_4_0\\].border-l.border-r.border-gray-700.min-h-screen > div.flex.justify-between.items-center.p-4.border-b.border-gray-700 > div > div > svg").click()
            cy.wait(300)
            cy.get("#root > div.flex.max-w-6xl.mx-auto > div.flex-\\[4_4_0\\].border-l.border-r.border-gray-700.min-h-screen > div.flex.justify-between.items-center.p-4.border-b.border-gray-700 > div > ul > li > a").click()
            cy.wait(300)

        })
    })
})

