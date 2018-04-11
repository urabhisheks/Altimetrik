import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import bodyParser from 'body-parser';

const port =3000;
const app=express();
const compiler = webpack(config);

const users = [
  {username: 'abhi', password: 'abhi', email: 'abhi' },
  {username: 'admin', password: 'admin', email: 'admin' },
  {username: 'user', password: 'user', email: 'user' },
];

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(bodyParser.json());
app.use(require('webpack-hot-middleware')(compiler));

app.get('/:username/:password', (req, res) => {
console.log('Abhishek get');
  const user = users.find(k => k.username === req.params.username && k.password === req.params.password);
  if(!user) {
    res.status(404).send({status:404,message: 'Invalid username or password'});
  } else {
    res.send(user.username);
  }
});

app.get('/:usernameOrEmail', (req, res) => {
console.log('Abhishek get usernameOrEmail', req.params.usernameOrEmail);
  const user = users.find(k => k.username === req.params.usernameOrEmail || k.email === req.params.usernameOrEmail);
  if(!user) {
    res.status(404).send({status:404,message: 'Invalid username or password'});
  } else {
    res.send(user.username);
  }
});

app.post('/signup', (req, res) => {
  console.log(req.body);
  const {firstname, lastname, username, email, password} = req.body;
  const user = {firstname,
                lastname,
                username,
                email,
                password};
  users.push(user);
  res.json({success:true});
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(port, function(err){
  if(err) {
    console.log(err);
  } else {
    console.log(`server listening on ${port}`);
  }
});