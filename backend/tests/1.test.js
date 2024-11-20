
const {test,describe,expect} = require('@jest/globals');
const user=require('./utilsTest.js')
const axios = require('axios');


describe('test auth', () => {
    
    let jwt;
    test('auth/login', async() => {
      
      const response= await user.getAuthUser();
      jwt=response.jwt;
      expect(response.status).toBe(200)
       
    });

   
    test('auth/me', async() => {
      
      try {
        const response=await axios.get(`http://localhost:5000/api/auth/me`,{
          withCredentials: true,
          headers: {
              'Access-Control-Allow-Origin': '*', 
              'Content-Type': 'application/json',
              Cookie: `jwt=${jwt};`
              

          }
        })
        expect(response.status).toBe(200)
        
        //console.log("response me : ",response);
      } catch (error) {
       
        console.log("error: ",error)
      }      

    });

    test('auth/logout', async () => {


        const response=await axios.post("http://127.0.0.1:5000/api/auth/logout")
        expect(response.status).toBe(200)

    })

    test('auth/signup', async () => {
        const datos = {
          "username": "user4",
          "password": "123456",
          "fullName":"user4 example",
          "email":"user4@1.com"
        }

        const response=await axios.post("http://127.0.0.1:5000/api/auth/signup",datos)
        expect(response.status).toBe(200)
    })

    test('user/delete', async () => {
        const datos = {
          "username": "user4",
       
        }

        const response=await axios.post("http://127.0.0.1:5000/api/users/delete",datos)
        expect(response.status).toBe(200)
    })

     
  
}) 

