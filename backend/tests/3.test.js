'use strict';


const axios = require('axios');
const util=require('./utilsTest.js')
const {test,describe,it,expect,beforeAll} = require('@jest/globals');



describe('test post', () => {
  let jwt;
  let post;
  test('posts/create', async() => {
      try {
        const res= await util.Post()
        jwt=res.jwt;
        post=res.data

        expect(res.status).toBe(200)
      } catch (error) {
        console.log("error: ",error)
      }
  
  });

  test('posts/comments/id_post', async() => {
    try {
      const res=await axios.post(`http://localhost:5000/api/posts/comment/${post['_id']}`,util.comment,{
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

  test('posts/like/id_post', async() => {
    try {
      const res=await axios.post(`http://localhost:5000/api/posts/like/${post['_id']}`,{},{
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

  test('posts/all', async() => {
    try {
      
      const res=await axios.get(`http://localhost:5000/api/posts/all`,{
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

  test('posts/following', async() => {
    try {
      
      const res=await axios.get(`http://localhost:5000/api/posts/following`,{
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



  test('posts/likes/id_user', async() => {
    try {
      
      const res=await axios.get(`http://localhost:5000/api/posts/likes/${post['user']}`,{
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

  test('posts/user/username', async() => {
    try {
      
      const res=await axios.get(`http://localhost:5000/api/posts/user/${util.dataUser.username}`,{
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


  test('posts/delete', async() => {
    try {
      
      const res=await axios.delete(`http://localhost:5000/api/posts/${post['_id']}`,{
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
  
  



});