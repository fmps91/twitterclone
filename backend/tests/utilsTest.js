const axios = require("axios");

let Users=[]

const post={
  text:"My 1 post user1",
  img:""
}

const comment={
  text:"My 1 comment user1"
}

const dataUser = {
    "username": "user1",
    "password": "123456"
}


 async function getAuthUser() {
    try {

        let jwtPrivate;
        const response=await axios.post("http://127.0.0.1:5000/api/auth/login",dataUser)
        //file.writeFileSync("file.json",JSON.stringify(response))
        if(response.headers['set-cookie'].length>0){
          //console.log("jwt: ",response.headers['set-cookie'][0].indexOf('jwt'))
          if(response.headers['set-cookie'][0].indexOf('jwt')>-1){
            //console.log("cookies: ",response.headers['set-cookie'])
            jwtPrivate=response.headers['set-cookie'][0].substring(response.headers['set-cookie'][0].indexOf('jwt')+4,response.headers['set-cookie'][0].indexOf(';'))
            //console.log("response: ",)
          }
          
        }
      
     
        return {"status":response.status,"jwt":jwtPrivate}
        
       
      } catch (error) {
        console.log("error: ",error)
 
      }
  }

  async function Post() {
    try {

        
        const response=await getAuthUser()
        let jwtPrivate=response.jwt;
        //file.writeFileSync("file.json",JSON.stringify(response))
        const res=await axios.post(`http://localhost:5000/api/posts/create`,post,{
          withCredentials: true,
          headers: {
              'Access-Control-Allow-Origin': '*', 
              'Content-Type': 'application/json',
              Cookie: `jwt=${jwtPrivate};`
              
          },
          
        })
        
        //console.log("res: ",res.data)
     
        return {"status":response.status,"jwt":jwtPrivate,"data":res['data']}
        
       
      } catch (error) {
        console.log("error: ",error)
 
      }
  }

  module.exports = {dataUser,getAuthUser,"users":Users,post,comment,Post};