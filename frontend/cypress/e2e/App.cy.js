import App from "../../src/App"


export default App.cy
describe('App spec', () => {
 
  it('visit web', () => {
    cy.visit('http://localhost:3001/')
  })

  
})