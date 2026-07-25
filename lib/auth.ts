import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },

        password: {
          label: "Password",
          type: "password",
        },
      },

     async authorize(credentials) {
  try {
    console.log("Credentials:", credentials);

    if (!credentials?.email || !credentials?.password) {
      throw new Error("Missing credentials");
    }

    const user = await prisma.user.findUnique({
      where: {
        email: credentials.email,
      },
    });

    console.log("User:", user);

    if (!user) {
      throw new Error("User not found");
    }

    const passwordMatch = await bcrypt.compare(
      credentials.password,
      user.password
    );

    console.log("Password Match:", passwordMatch);

    if (!passwordMatch) {
      throw new Error("Invalid password");
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  } catch (error) {
    console.error("Authorize Error:", error);
    throw error;
  }
}
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
      }

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};