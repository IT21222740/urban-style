require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

//routes
const inventory_base = require('./routes/inventory/inventory_base')
const chatbot_base = require('./routes/chatbot/chatbot_base')
const user_base = require('./routes/user/user_base')
const userQuiz_base = require('./routes/userQuiz/usreQuiz_base')

//express app
const app = express()


//middlewear
app.use(express.json()) //to add json to the req object

app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(morgan('dev'));//to run frontend and backend concurrently 
app.use(bodyParser.json());
app.use(cors());


//routes
inventory_base(app)
user_base(app)
chatbot_base(app)
userQuiz_base(app)

//connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {

    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('Connected to db & listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 