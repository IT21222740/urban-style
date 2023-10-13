require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require("body-parser");
const morgan = require('morgan')
const cors = require('cors')

//routes
const inventory_base = require('./routes/inventory/chatbot')
const chatbot_base = require('./routes/chatbot/chatbot_base')
const user_base = require('./routes/user/user_base')
const userQuiz_base = require('./routes/userQuiz/usreQuiz_base')
const itemRoute = require('./routes/itemRoute')
const userRoute = require('./routes/userRoute')
const adminRoute = require('./routes/adminRoute')
const ordersRoute = require('./routes/ordersRoute')
const feedbackRoute = require('./routes/feedbackRoute')
const notificationRoute = require('./routes/notificationRoute')

const newsfeedRoute = require('./routes/newsfeedRoute')
const refundRoute = require('./routes/refundRoute')
const deliveryRoute = require('./routes/deliveryRoute')






//express app
const app = express()
app.use(express.json())
app.use(morgan('dev'));//to run frontend and backend concurrently 
app.use(bodyParser.json());
app.use(cors());

app.use('/api/Items/', itemRoute)
app.use('/api/feedback/', feedbackRoute)
app.use('/api/users/', userRoute)
app.use('/api/admins/', adminRoute)
app.use('/api/orders/', ordersRoute)
app.use('/api/notifications/', notificationRoute)
app.use('/api/newsfeed/', newsfeedRoute)
app.use('/api/refunds/', refundRoute)
app.use('/api/delivery/', deliveryRoute)

//middlewear
 //to add json to the req object

app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})






//routes
inventory_base(app)
user_base(app)
chatbot_base(app)
userQuiz_base(app)

//connect to DB
mongoose.connect(process.env.MONGO_URI )
  .then(() => {

    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('Connected to db & listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 