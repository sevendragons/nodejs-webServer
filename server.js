const express = require('express');  //npm install --save handlebars  >>>> weird
const hbs = require('hbs'); //npm  install hbs@4.0.1 --save >>>>depend on version @.....
const handlebars = require('handlebars');
const fs = require('fs');

// set port for the applicaition
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
      if(err){
        console.log('Unable to append to server.log.');

      }
   });
  next();
});

//The code below help us to change every single page to maintenance page after that we can comment it, very useful.
// app.use((req, res, next) => {
//   res.render('maintenance.hbs')
// });

// render then show the help.html
app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
//registerHelper is a method inside the hbs (handlebars)

hbs.registerHelper('getCurrentMonth', () => {
  return new Date().getMonth();
});

hbs.registerHelper('getCurrentDate', () => {
  return new Date().getDate();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  // res.send({
  //   name:'Andrew',
  //   likes:[
  //     'Biking',
  //     'Cities',
  //     ]
  //   });
  res.render('home.hbs', {
     pageTitle: 'Home Page',
     welcomeMessage:'Welcome to my website',
     currentHours: new Date().getHours(),
     currentMinutes: new Date().getMinutes(),
     currentSeconds: new Date().getSeconds(),
     currentDate: new Date().getDate(),
     currentMonth: new Date().getMonth(),
  });

}); //request and response


//localhost:3000/about
app.get('/about', (req,res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});
//localhost:3000/holymoly
app.get('/holymoly', (req,res) => {
  res.render('holymoly.hbs', {
    pageTitle: 'Other Page',
  });
});





// /bad -send back JSON with errorMessage
app.get('/bad', (req,res) => {
  res.send({
    errorMessage:'Unable to handle request',
  });
});

//localhost:3000
// app.listen(3000, () => {
//   console.log('Server is up on port 3000');  //show in terminal
// });
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);  //show in terminal
});
