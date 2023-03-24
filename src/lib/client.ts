import { GraphQLClient } from "graphql-request";
import { getSdk } from "../generated/graphql";

export const GRAPHQL_ENDPOINT = "https://harbour-movies.vercel.app/api/graphql";

const client = new GraphQLClient(GRAPHQL_ENDPOINT, {
  headers: {
    "Content-Type": "application/json",
  },
});

export const sdk = getSdk(client);
