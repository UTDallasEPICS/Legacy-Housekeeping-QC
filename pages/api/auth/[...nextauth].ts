/* import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER_BASE_URL,
    }),
  ],
  secret: process.env.AUTH0_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

export default NextAuth(authOptions);
*/


import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER_BASE_URL,
    }),
  ],
  secret: process.env.AUTH0_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email; // Add email to token
        token.name = user.name; // Add name to token
      }
      console.log("JWT Callback:", token); // Debugging statement
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email; // Add email to session
      session.user.name = token.name; // Add name to session
      console.log("Session Callback:", session); // Debugging statement
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

export default NextAuth(authOptions);

