"use client";

import { ApolloProvider } from "@apollo/client";
import { ReactNode, useMemo } from "react";

import { createApolloClient } from "@/lib/apollo-client";

export const AppApolloProvider = ({ children }: { children: ReactNode }) => {
  const client = useMemo(() => createApolloClient(), []);
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
