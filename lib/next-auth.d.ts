import NextAuth from "next-auth";

import { Identification } from "./ts/interfaces/identification.interfaces";

declare module "next-auth" {
  interface Session {
    user: Identification;
  }
}
