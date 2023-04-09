import "dotenv/config"
import express from 'express';

const app = express()

app.use('/', () => console.log('Hello World!'))

export default app