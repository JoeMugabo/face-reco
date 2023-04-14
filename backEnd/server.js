const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

var db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'Mine',
      database : 'face-reco'
    }
  });  

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', ( req, res ) => {
    res.send('Success');
});

app.post('/signin', (req, res) => {
    db.select('email', 'hash').from('login')
    .where('email', '=', req.body.email)
    .then(data => {
        const isValid = bcrypt.compareSync(req.body.password, data[0].hash)
        if (isValid) {
            return db.select('*').from('users')
            .where('email', '=', req.body.email)
            .then(user => {
                res.json(user)
            })
        } else {
            res.status(400).json('No such user found dear!')
        }
    })
    .catch(err => res.status(400).json('Wrong signIn credentials dear!'))
}); 

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    const hash = bcrypt.hashSync(password);
      db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
           return trx('users')
            .returning('*')    
            .insert({
                email: loginEmail[0].email,
                name: name,
                joined: new Date()
            })
            .then(user => {
               res.json(user[0])
            })
        })
        .then(trx.commit)
        .catch(trx.rollback);
      })  
        .catch(err => res.status(400).json('Sorry, this user already existed dear!'))
    })

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
 db.select('*').from('users').where({id})
    .then(user => {
        if (user.length) {
            res.json(user[0])
        } else {
            res.status(400).json('No user profile found dear!')
        }
    })
    .catch(err => res.status(400).json('No user profile found dear!'))
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries)
    })
    .catch(err => res.status(400).json('No user found dear!'))
  }) 

app.listen(3000)


/*
    / --> GET --> res = this is working !
    /Signing --> POST =   Login successfully/ Failed to login!
    /Register --> POST = Registered successfully.
    /Profile/userId --> GET = user
    /Image --> PUT = Ranking user

*/