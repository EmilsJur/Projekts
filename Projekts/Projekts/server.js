const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const app = express();

mongoose.connect('mongodb://localhost:27017/magness_cars', {
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const carSchema = new mongoose.Schema({
  brand: String,
  model: String,
  year: Number,
  price: Number,
  image: String
});

const Contact = mongoose.model('Contact', contactSchema);
const User = mongoose.model('User', userSchema);
const Car = mongoose.model('Car', carSchema);

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: crypto.randomBytes(20).toString('hex'), 
  resave: false,
  saveUninitialized: true,
}));


app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    req.session.user = user;
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      req.session.user = user;
      res.redirect('/');
    } else {
      res.status(401).send('Invalid email or password');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});


app.get('/profile', (req, res) => {
  if (req.session.user) {
    res.send(`Welcome, ${req.session.user.username}`);
  } else {
    res.status(401).send('Unauthorized');
  }
});


app.use(express.static('public')); 
app.use(express.json());

app.get('/getCars', async (req, res) => {
  try {
    const cars = await Car.find({});
    res.json(cars);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.get('/', async (req, res) => {
  try {
    const cars = await Car.find({});
    res.render('katalogs', { cars });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.post('/submitContact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const contact = new Contact({
      name,
      email,
      message
    });
    await contact.save();
    res.status(201).json({ success: true, message: 'Contact information saved!!!!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server errors' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server port ${PORT}`));


/*
const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/magness_cars', {
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


const carSchema = new mongoose.Schema({
  brand: String,
  model: String,
  year: Number,
  price: Number,
  image: String
});

const Car = mongoose.model('Car', carSchema);


const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

const Contact = mongoose.model('Contact', contactSchema);

// middleware
app.use(express.static('public')); 
app.use(express.json());

app.get('/getCars', async (req, res) => {
  try {
    const cars = await Car.find({});
    res.json(cars);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.get('/', async (req, res) => {
  try {
    const cars = await Car.find({});
    res.render('katalogs', { cars });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.post('/submitContact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const contact = new Contact({
      name,
      email,
      message
    });
    await contact.save();
    res.status(201).json({ success: true, message: 'Contact information saved!!!!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server errors' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server port ${PORT}`));
*/