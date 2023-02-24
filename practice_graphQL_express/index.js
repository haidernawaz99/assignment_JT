var express = require("express");
var graphql = require("graphql");
var MOCK_DATA_json_1 = require("./MOCK_DATA.json");
const cors = require("cors");
var app = express();
var port = 5000;
var express_graphql = require("express-graphql");
var UserType = new graphql.GraphQLObjectType({
  name: "User",
  fields: function () {
    return {
      id: { type: graphql.GraphQLInt },
      firstname: { type: graphql.GraphQLString },
      lastname: { type: graphql.GraphQLString },
      email: { type: graphql.GraphQLString },
      password: { type: graphql.GraphQLString },
    };
  },
});
var RootQuery = new graphql.GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllUsers: {
      type: new graphql.GraphQLList(UserType),
      resolve: function () {
        return MOCK_DATA_json_1;
      },
    },
  },
});
var Mutation = new graphql.GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstname: { type: graphql.GraphQLString },
        lastname: { type: graphql.GraphQLString },
        email: { type: graphql.GraphQLString },
        password: { type: graphql.GraphQLString },
      },
      resolve: function (root, args) {
        var newUser = {
          id: MOCK_DATA_json_1.length + 1,
          firstname: args.firstname,
          lastname: args.lastname,
          email: args.email,
          password: args.password,
        };
        MOCK_DATA_json_1.push(newUser);
        return newUser;
      },
    },
  },
});
var schema = new graphql.GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

app.use(cors()); // enable `cors` to set HTTP response header: Access-Control-Allow-Origin: *
app.use(
  "/graphql",
  (0, express_graphql.graphqlHTTP)({
    schema: schema,
    graphiql: true,
  })
);
app.listen(port, function () {
  console.log("Server running on port ".concat(port));
});
