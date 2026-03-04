"use client";

import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const createApolloClient = () => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_URL ?? "http://localhost:4000/graphql"
    }),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network"
      },
      query: {
        fetchPolicy: "network-only"
      }
    }
  });
};
