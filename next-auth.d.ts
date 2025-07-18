import type { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  interface User extends DefaultUser {
    display_id?: string
  }

  interface Session extends DefaultSession {
    user?: {
      id?: string 
      display_id?: string
    } & DefaultSession["user"]
  }
}
