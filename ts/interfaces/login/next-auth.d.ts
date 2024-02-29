import NextAuth from "next-auth";
import { Identification } from "./interfaces";

declare module "next-auth" {
  interface Session {
    user: Identification;
  }
}
