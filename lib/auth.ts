import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 },
  pages: { signIn: "/admin/login" },
  providers: [
    CredentialsProvider({
      name: "Admin",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL;
        const hash = process.env.ADMIN_PASSWORD_HASH;
        if (!adminEmail || !hash) return null;
        if (!credentials?.email || !credentials.password) return null;
        if (credentials.email.toLowerCase() !== adminEmail.toLowerCase()) return null;
        const ok = await bcrypt.compare(credentials.password, hash);
        if (!ok) return null;
        return {
          id: "admin",
          email: adminEmail,
          name: process.env.ADMIN_NAME || "Admin",
          role: "admin",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role || "admin";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role = (token.role as string) || "admin";
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
