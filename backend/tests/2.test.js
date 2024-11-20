'use strict';


const axios = require('axios');
const user=require('./utilsTest.js')
const {test,describe,expect} = require('@jest/globals');



describe('test user', () => {
  let jwt;

  test('users/suggested', async() => {

      const response= await user.getAuthUser();
      jwt=response.jwt;
      try {
        const res=await axios.get(`http://localhost:5000/api/users/suggested`,{
          withCredentials: true,
          headers: {
              'Access-Control-Allow-Origin': '*', 
              'Content-Type': 'application/json',
              Cookie: `jwt=${jwt};`
              

          }
        })
        expect(res.status).toBe(200)
        
        //console.log("response me : ",response);
      } catch (error) {
       
        console.log("error: ",error)
      }      
      
  });

  test('users/profile/user1', async() => {

  
    try {
      const res=await axios.get(`http://localhost:5000/api/users/profile/${user.dataUser.username}`,{
        withCredentials: true,
        headers: {
            'Access-Control-Allow-Origin': '*', 
            'Content-Type': 'application/json',
            Cookie: `jwt=${jwt};`
            

        }
      })
      expect(res.status).toBe(200)
      
      //console.log("response me : ",response);
    } catch (error) {
     
      console.log("error: ",error)
    }      
    
});


test('users/update', async() => {
  
  
  try {
   
    const data={
      email:"user1@100.com"
    }

    const res=await axios.post(`http://localhost:5000/api/users/update`,data,{
      withCredentials: true,
      
      headers: {
          'Access-Control-Allow-Origin': '*', 
          'Content-Type': 'application/json',
          Cookie: `jwt=${jwt};`
          

      }
      
    })
    expect(res.status).toBe(200)
    
    //console.log("response me : ",response);
  } catch (error) {
   
    console.log("error: ",error)
  }      
  
});


test('users/follow/id_user2', async() => {

  
  try {
    const res=await axios.post(`http://localhost:5000/api/users/follow/673dc355342385ae39747b93`,{},{
      withCredentials: true,
      headers: {
          'Access-Control-Allow-Origin': '*', 
          'Content-Type': 'application/json',
          Cookie: `jwt=${jwt};`
          

      }
    })
    expect(res.status).toBe(200)
   
    //console.log("response me : ",response);
  } catch (error) {
   
    console.log("error: ",error)
  }      
  
});



});