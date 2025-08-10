import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const users = dbConnect(collectionNamesObj.userCollection);

        const email = (credentials?.email || "").trim().toLowerCase();
        const password = credentials?.password || "";
        if (!email || !password) return null;

        const user = await users.findOne({ email });
        if (!user || !user.password) return null;

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return null;

        return {
          id: String(user._id),
          name: user.name || null,
          email: user.email,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/signIn",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const users = dbConnect(collectionNamesObj.userCollection);
        const email = (user?.email || profile?.email || "").toLowerCase();
        if (!email) return false;

        await users.updateOne(
          { email },
          {
            $setOnInsert: {
              email,
              name: user?.name || profile?.name || email.split("@")[0],
              image: user?.image || profile?.picture || null,
              provider: "google",
              createdAt: new Date(),
            },
          },
          { upsert: true }
        );
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user?.id) {
        token.uid = user.id;
        return token;
      }

      if (!token.uid && token?.email) {
        const users = dbConnect(collectionNamesObj.userCollection);
        const u = await users.findOne({ email: token.email.toLowerCase() });
        if (u?._id) token.uid = String(u._id);
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.uid) {
        session.user = session.user || {};
        session.user.id = token.uid;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
