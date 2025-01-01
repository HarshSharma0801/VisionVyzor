import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { create_user, get_user_by_email } from "./services/user";





export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        if (!user) return false;
        try {
          const userData = {
            googleId: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          };

          const existingUser = await get_user_by_email(user.email ?? "");

          if (!existingUser) {
            await create_user({ user: userData });
          }

          return true;
        } catch (error) {
          console.log(error);
        }
      }

      return true;
    },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      return token;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
});
