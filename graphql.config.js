require('dotenv').config({ path: `.env` });

module.exports = {
  schema: "schema.graphql",
  documents: "src/**/*.gql",
  extensions: {
    endpoints: {
      default: {
        url: `${process.env.NEXT_PUBLIC_GRAPHQL}`,
      }
    }
  }
}
