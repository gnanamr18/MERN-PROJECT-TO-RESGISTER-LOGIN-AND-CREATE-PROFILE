const  express = require('express');
const connectdb =  require('./config/db');
const{check, validator} = require('express-validator')

connectdb();

const app = express()
// init middleware
app.use(express.json({extended:false}))

app.get('/',(req,res)=>{res.send('API running')});

// define routes
app.use('/api/users', require('./routes/api/users'));
app.use ('/api/auth', require('./routes/api/auth'));
app.use ('/api/profile', require('./routes/api/profile'))




const port = process.env.port || 5000

app.listen(port, ()=>{console.log(`server is running on the ${port}`)})