const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type SignupResponse{
        status: String!
        message: String!
    }
    
    type SigninSuccess {
        status: String!
        message: String!
    }

    type Query {
        dummy: String
    }

    type Mutation {
        signup(username: String!, email: String!, password: String!): SignupResponse!
        signin(email: String!, password: String!): SigninSuccess!
    }
`);

module.exports = schema;
