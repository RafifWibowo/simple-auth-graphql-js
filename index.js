const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");
const authResolvers = require("./resolver/auth.resolver");
require("dotenv").config();

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: authResolvers,
    graphiql: true,
  })
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/graphql`);
});
