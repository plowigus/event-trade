import { GraphQLClient } from "graphql-request";

const endpoint = " https://mateiko.pl/evtradnew/graphql";

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {},
});

export { graphQLClient };
