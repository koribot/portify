import { NextAuthOptions } from "next-auth";
import { updateUserLastOnline } from "../db-supabase/updateLastOnline";
import { insertUser } from "../db-supabase/insertUser";
import { getUser } from "../db-supabase/getUser";
import GoogleProvider from "next-auth/providers/google";

const gId = process.env.GOOGLE_CLIENT_ID || "";
const gSecret = process.env.GOOGLE_CLIENT_SECRET || "";
const secret = process.env.SECRET || "";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  secret,
  providers: [
    GoogleProvider({
      clientId: gId,
      clientSecret: gSecret,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    signIn: async ({ user, account, profile, email, credentials }) => {
      if (account?.provider === "google") {
        const { data, success } = await getUser(user.email as string);

        if (success && data) {
          const { data: _data, success } = await updateUserLastOnline(
            data.email
          );
          return true;
        } else {
          const { data, success } = await insertUser({
            email: user.email as string,
            username: user.name as string,
            avatar: user.image as string,
            auth_provider: "google",
          });
          if (success && data) {
            return true;
          }
        }
      }
      return false;
    },
    // we customize so we can access the display_id (sub) mainly for dynamic dashboard/[token.sub as display_id]
    async session({ session, token }) {
      const customSession = {
        ...session,
        user: { ...session.user, display_id: token.sub },
      };
      return customSession;
    },
  },
};