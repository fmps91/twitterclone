describe('functions home spec', () => {
    context('1280, 720 resolution', () => {

        beforeEach('Login', () => {
            cy.wait(400)
            cy.viewport(1280, 720)
            cy.visit('http://localhost:3001/')

            //read file frontend/cypress/fixtures/user.json
            cy.fixture('user.json').then((user)  => {
                cy.log("user: ",user);
                cy.wrap(user).as('result')
            })

            //insert user in the login
            cy.get('@result').then((e) => {
                cy.get('#root>div>div>div.flex-1.flex.flex-col.justify-center.items-center>form>label>input[placeholder=\'username\']').type(e.username)
                cy.get('#root>div>div>div.flex-1.flex.flex-col.justify-center.items-center>form>label>input[placeholder*="password"]').type(e.password)
                cy.get('#root>div>div>div.flex-1.flex.flex-col.justify-center.items-center>form>button').should("contain", "Login")
                cy.get('#root>div>div>div.flex-1.flex.flex-col.justify-center.items-center>form>button').click()
            })
           
            
        })

       it('update background photo of profile', () => {
        cy.wait(2000)
        cy.visit('http://localhost:3001/profile/user1')
       //in the next line select file when is hidden the input
        cy.get("#coverImg").selectFile("cypress/fixtures/posts/post1.png",{ force: true })//selectFile("frontend/cypress/fixtures/posts/post2.png")
        cy.wait(2000)
       })

       it('update avatar of profile', () => {
        cy.wait(2000)
        cy.visit('http://localhost:3001/profile/user1')
       //in the next line select file when is hidden the input
        cy.get("#profileImg").selectFile("cypress/fixtures/avatars/girl3.png",{ force: true })//selectFile("frontend/cypress/fixtures/posts/post2.png")
        cy.wait(2000)
       })

        it('update profile', () => {
            cy.wait(2000)
           
            cy.visit('http://localhost:3001/profile/user1')
            cy.get("#root > div.flex.max-w-6xl.mx-auto > div.flex-\\[4_4_0\\].border-r.border-gray-700.min-h-screen > div > div.flex.justify-end.px-4.mt-5 > button").click()
            cy.wait(1000)
            cy.get("#edit_profile_modal > div > form > div:nth-child(2) > textarea").clear().type("esto es una pruena de biografia")
            cy.get("#edit_profile_modal > div > form > input").clear().type("esto es una pruena de link")
            cy.get("#edit_profile_modal > div > form > button").click()
            cy.wait(1000)
        })

    })
})