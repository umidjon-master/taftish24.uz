import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { connectToDatabase } from "@/lib/mongoose";
import UserLoginCollection from "@/models/UserLogin";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        await connectToDatabase();

        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Email va parol kiritilishi shart");
        }

        const user = await UserLoginCollection.findOne({
          login: credentials.email,
        });
        if (!user) throw new Error("Email topilmadi");

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) throw new Error("Parol xato");

        return {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7, // 7 kun
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user = token.user;
      return session;
    },
  },
};
