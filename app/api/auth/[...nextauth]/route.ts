import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID ?? "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Nickname",
      credentials: {
        name: { label: "Nickname", type: "text", placeholder: "Your Nickname" },
      },
      async authorize(credentials) {
        // Allow anonymous sign-in with just a nickname
        if (credentials?.name) {
          return {
            id: `anonymous-${Date.now()}`,
            name: credentials.name,
            isAnonymous: true,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.isAnonymous = !!(user as any).isAnonymous;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as any).isAnonymous = !!(token as any).isAnonymous;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
