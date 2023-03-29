import NextAuth from "next-auth";
import { User } from "./intefaces";

declare module "next-auth" {
  interface Session {
    user: User;
  }
}
