"use client";

import { ReactNode } from "react";

import { AppApolloProvider } from "@/components/apollo-provider";
import { AuthProvider } from "@/components/auth-provider";
import { ThemeProvider } from "@/components/theme-provider";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider>
      <AppApolloProvider>
        <AuthProvider>{children}</AuthProvider>
      </AppApolloProvider>
    </ThemeProvider>
  );
};
