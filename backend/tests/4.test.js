'use strict';

const axios = require('axios');
const util=require('./utilsTest.js')
const {test,describe,expect} = require('@jest/globals');

describe('test notification', () => {
  let jwt;
  let IdPost
  test('notifications get all user', async() => {
      try {
        const response= await util.getAuthUser();
        jwt=response.jwt;
        const res= await axios.get('http://localhost:5000/api/notifications',{
          withCredentials: true,
          headers: {
              'Access-Control-Allow-Origin': '*', 
              'Content-Type': 'application/json',
              Cookie: `jwt=${jwt};`
              
  
          }
        })
      
        IdPost=res.data[0]
        //console.log("data: ",res.data[0])

        expect(res.status).toBe(200)
      } catch (error) {
        console.log("error: ",error)
      }
  
  });

  test('notifications delete id notification', async() => {
    try {
      const res=await axios.delete('http://localhost:5000/api/notifications',{
        withCredentials: true,
        headers: {
            'Access-Control-Allow-Origin': '*', 
            'Content-Type': 'application/json',
            Cookie: `jwt=${jwt};`
            

        }
      })
      expect(res.status).toBe(200)
    } catch (error) {
      console.log("error: ",error)
    }    

  });

  /* test('notifications delete all user', async() => {
    try {
      const res=await axios.delete('http://localhost:5000/api/notifications',{
        withCredentials: true,
        headers: {
            'Access-Control-Allow-Origin': '*', 
            'Content-Type': 'application/json',
            Cookie: `jwt=${jwt};`
            

        }
      })
      expect(res.status).toBe(200)
    } catch (error) {
      console.log("error: ",error)
    }    

  }); */

});