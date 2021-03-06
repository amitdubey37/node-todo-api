var express = require('express');
const {ObjectID} = require('mongodb');
const _ = require('lodash');
const bodyParser = require('body-parser');
const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');
const {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT || 3003;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc)=> {
    res.send(doc);
  }, (err) => {
    console.log('Error occured while saving todo');
    res.status(400).send(err);
  });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
      res.send({
        todos,
      })
    },
    (e) => {
      res.status(400).send(e);
    }
  )
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)) {
    res.status(404).send();
  }
  Todo.findById(id).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }
    res.send(todo);
  }).catch((e) => {
      res.status(400).send();
  })
});

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)) {
    res.status(404).send();
  }
  Todo.findByIdAndRemove(id).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }
    res.send(todo);
  }).catch((e) => {
      res.status(400).send();
  })
});

app.patch('/todos/:id', (req, res) => {
  const id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);
  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  if(_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }
    res.send({todo})
  }).catch((e) => {
    res.status(400).send();
  })
});

app.post('/users', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(()=> {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user)
  }).catch((e) => {
    console.log('error,', e)
    res.status(400).send(e);
  });
});


app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
      user.generateAuthToken().then((token) => {
        res.header('x-auth', token).send(user)
      })
  }).catch((e) => {
    res.status(400).send();
  })

});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user)
});

app.listen(port, () => {
  console.log(`Started on port ${port}`)
})
