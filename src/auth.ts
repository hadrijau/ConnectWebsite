import { verifyPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Define the shape of your user object
interface CustomUser {
  email: string;
  name: string;
  type: string; // Add the role property
  id: string; // Add the id property
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        const client = await connectToDatabase();

        const usersCollection = client.db().collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          throw new Error("No user found with this email address.");
        }

        const isValid = await verifyPassword(
          credentials.password as string,
          user.password
        );

        if (!isValid) {
          throw new Error("Incorrect credentials");
        }

        console.log("user", user);
        // Return user object including the role and id
        return {
          email: user.email,
          name: `${user.firstname} ${user.lastname}`,
          id: user._id.toString(), // Ensure _id is a string
          type: user.type,
        } as CustomUser; // Specify the type as CustomUser
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Add id and type to session
      if (token && session.user) {
        (session.user as CustomUser).type = token.type; // Cast session.user to CustomUser
        (session.user as CustomUser).id = token._id; // Add _id to session
      }
      return session;
    },
    async jwt({ token, user }) {
      // Add id and type to token
      if (user) {
        token.type = (user as CustomUser).type; // Cast user to CustomUser
        token._id = (user as CustomUser).id; // Add _id to token
      }
      return token;
    },
  },
});
