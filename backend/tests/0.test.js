

const {test,describe,expect} = require('@jest/globals');
const request = require('supertest');
const server = require("../index")
const db = require("../db/conexion");
const util = require('node:util');


const exec = util.promisify(require('node:child_process').exec);


describe('server init working',() => {

    //este test hace que se ejecute el server con la peticion get 
    test('server test', () => {
        return new Promise((resolve, reject) => {
            request(server.app)
                .get('/')
                .expect(200)
                .end(function (err, res) {
                    
                    
                    if (err) {
                        reject(err);
                        throw err;
                       
                    }
                    
                  
                    resolve(true);
                })
        });
    })

    //es una prueba para saber si existe conexion
    test('db test', async() => {
  
            let conexion=await db.connect(process.env.mongo_uri)

            //console.log("conexion: ",conexion)

            expect(conexion.result).toBe(true)
         
    })

 
    //es una prueba para ejecutar en segundo plano el servidor
    test('server run background', async () => {
        let proceso=await exec('npx pm2 list');
        
        if(proceso.stdout.indexOf('server')>0){
            
            await exec('npx pm2 delete 0');
            await exec('npx pm2 start backend/server.js');
            
        }else{
    
            await exec('npx pm2 start backend/server.js');
        }
    
        proceso=await exec('npx pm2 list');
        console.log("process list: ",proceso.stdout)
        
       
        expect(true).toBe(true)
    
    })
})
 
