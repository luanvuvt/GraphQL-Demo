var express = require("express");
var graphqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql");
const mongoose = require('mongoose');

mongoose.connect('mongodb://root:example@mongo:27017/gra');
const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian 3 4 5 6 7 8' });
kitty.save().then(() => console.log('meow'));

var schema = buildSchema(`
  type Person {
    name: String,
    hello(msg: String): String
  }

  type Query {
    hello: String
    list(num: Int = 3): Int
    person: Person
  }
`);

class Person {
  constructor() {
    this.name = "Bob";
  }

  hello({ msg }) {
    return msg;
  }
}

const root = {
  hello: () => "Hello GraphQL!",
  list: (args) => {
    return args.num;
  },
  person: () => new Person()
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));