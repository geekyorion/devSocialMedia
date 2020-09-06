const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const passport = require('passport');

// import various api(s)
const user = require('./routes/api/user');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// database config
const db = require('./config/keys').mongoURI;

// database connectivity
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose
    .connect(db)
    .then(() => {
        console.log('mongodb connected');
    })
    .catch(err => {
        console.log(err);
    });

// setting up passport for the validation
app.use(passport.initialize());

// passport config
require('./config/passport')(passport);

// API and routes definations
app.get('/', (req, res) => {
    res.send('Hello from devServer');
});

app.use('/api/user', user);
app.use('/api/profile', profile);
app.use('/api/post', posts);

app.all('*', (req, res) => {
    res.status(404).json({ routeError: 'Not a valid route' });
});

const port = process.env.port || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
