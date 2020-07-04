require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require('cors');

const users = require("./routes/api/users");
const emailController = require('./email/email.controller');
const { PORT, CLIENT_ORIGIN } = require('./config/info')

const app = express();

app.use(cors({
  origin: CLIENT_ORIGIN
}))

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// mongoose.connect(DB_URL, options, () => {
//   app.listen(PORT, () => console.log('conneted'))
// })
// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true },()=>{
      app.listen(PORT, () => console.log('conneted'))
    }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);

app.get('/wake-up', (req, res) => res.json('wakeup'))

app.post('/email', emailController.collectEmail)

app.get('/email/confirm/:id', emailController.confirmEmail)

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'Not Found' })
})

// To get rid of all those semi-annoying Mongoose deprecation warnings.
// const options = {
//   useCreateIndex: true,
//   useNewUrlParser: true,
//   useFindAndModify: false,
//   useUnifiedTopology: true
// }


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));

