import dotenv from 'dotenv';
 dotenv.config({ silent: true });
 import app from './src/app.js';

const port = process.env.port || 5000;


app.listen(port,()=>{
    console.log(`Servidor ON em http://localhost:${port}`)
})