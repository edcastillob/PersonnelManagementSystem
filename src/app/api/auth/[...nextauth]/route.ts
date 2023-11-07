import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import db from "@/libs/db";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "user@mail.com" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "**********",
        },
      },
      async authorize(credentials) {
        try {
          if (!credentials || !credentials.email || !credentials.password) {
            throw new Error("Invalid credentials");
          }

          const userFound = await db.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (!userFound) {            
            throw new Error("User not found");

          }

          const matchPassword = await bcrypt.compare(
            credentials.password,
            userFound!.password
          );

          if (!matchPassword) {
            throw new Error("Invalid password");
          }

          return {
            id: userFound!.id.toString(),
            email: userFound!.email,
            name: userFound!.username,
          };
        } catch (error) {
          console.error("Error en la autorización:", error);
          throw new Error("Authentication failed");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ], 
  
  pages:{
    signIn:"/auth/login"
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

