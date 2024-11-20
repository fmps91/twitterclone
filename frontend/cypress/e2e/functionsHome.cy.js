

describe('functions home spec', () => {
  context('1280, 720 resolution', () => {

    /* beforeEach('Login', () => {
      cy.visit('http://localhost:3001/')
      //login
      cy.get('#root>div>div>div.flex-1.flex.flex-col.justify-center.items-center>form>label>input[placeholder=\'username\']').type("jonaspull")
      cy.get('#root>div>div>div.flex-1.flex.flex-col.justify-center.items-center>form>label>input[placeholder*="password"]').type("123456")
      cy.get('#root>div>div>div.flex-1.flex.flex-col.justify-center.items-center>form>button').should("contain","Login")
      cy.get('#root>div>div>div.flex-1.flex.flex-col.justify-center.items-center>form>button').click()
    }) */

  
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

    afterEach(() => {
      //cy.logout()
    })

    it('change theme', () => {
      cy.wait(2000)
      cy.get("#theme > div > div.w-1\\/6.md\\:w-full > label > input").click()
    })

    it('suggest people', () => {
      cy.wait(1000)
      
      cy.get("#root > div > div.hidden.lg\\:block.my-4.mx-2 > div > div").children().then((e) => {
        const listingCount = Cypress.$(e).length;
        cy.log("lista count: ", listingCount)
        cy.wait(1000)
        const debug = [...e].map((el, index) => {
          let a = ((((((e[index].children)[0]).children)[1]).children)[0])
          cy.log("text: ",a.innerText)
          if(a.innerText=="user2 example"){
            cy.wrap('true').as('result')
          }
          
          return `${a.tagName} #${index}: ${a.innerText}`
        })
        cy.log("text: ",debug)
        cy.wait(1000)
        
      })
      cy.get('@result').should('equal', 'true')

      
    })


    /* it('comment Post', () => {
      cy.get("#root > div > div.flex-\\[4_4_0\\].mr-auto.border-r.border-gray-700.min-h-screen > div.flex.p-4.items-start.gap-4.border-b.border-gray-700 > form > textarea").type("comment post example")
      cy.get("#root > div > div.flex-\\[4_4_0\\].mr-auto.border-r.border-gray-700.min-h-screen > div.flex.p-4.items-start.gap-4.border-b.border-gray-700 > form > div > button").click()
    }) */

    //https://www.freecodecamp.org/news/dom-manipulation-htmlcollection-vs-nodelist/
    /* it('delete Post', () => {
      cy.get("#root > div > div.flex-\\[4_4_0\\].mr-auto.border-r.border-gray-700.min-h-screen > div:nth-child(3) > div:nth-child(1) > div.flex.flex-col.flex-1 > div.flex.flex-col.gap-3.overflow-hidden > span").should("exist")
      cy.get("#root > div > div.flex-\\[4_4_0\\].mr-auto.border-r.border-gray-700.min-h-screen > div:nth-child(3) > div:nth-child(1) > div.flex.flex-col.flex-1 > div.flex.flex-col.gap-3.overflow-hidden > span").should("contain","comment post example")
      cy.get("#root > div > div.flex-\\[4_4_0\\].mr-auto.border-r.border-gray-700.min-h-screen > div:nth-child(3) > div:nth-child(1) > div.flex.flex-col.flex-1 > div.flex.gap-2.items-center > span.flex.justify-end.flex-1 > svg > path").click()
      cy.wait(1000)
      
    }) */
      it('comment Post', () => {
        cy.wait(1000)
        
        cy.get('#comments').children().then((e)=>{
          let a=(((((((((e[0].children)[1]).children)[2]).children)[0]).children)[0]))
          cy.get(a).click()
          cy.wait(1000)
        })
        
        cy.get('#comments_modal > div > form').eq(0).should('be.visible').type('este es el comentario de prueba')
        cy.get('#comments_modal > div > form').children().eq(1).click()
        
        cy.wait(1000)
       
    })
    
    /* it('like Post or Dislike', () => {
  
        //#form of give like
        //cy.get('#comments').children().eq(0).children().eq(1).children().eq(2).children().eq(0).children().eq(3).children().eq(1).click()
        //#form2 of give like
        cy.get('#comments').children().then((e)=>{
          let a=((((((((((e[0].children)[1]).children)[2]).children)[0]).children)[3]).children)[1])
          cy.get(a).click()
          //cy.log(`Product names are: ${((((((((((e[0].children)[1]).children)[2]).children)[0]).children)[3]).children)[1])} `)
        })
    }) */

  })


})