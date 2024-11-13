import { prisma } from "@/lib/prisma";
import { LoginSchema } from "@/lib/zod";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compareSync } from "bcrypt-ts";
import NextAuth from "next-auth";
import { Adapter } from "next-auth/adapters";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    Credentials({
      credentials: {
        namaUser: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validateFields = LoginSchema.safeParse(credentials);
        if (!validateFields.success) {
          return null;
        }
        const { namaUser, password } = validateFields.data;
        const user = await prisma.users.findUnique({
          where: {
            namaUser,
          },
        });
        if (!user || !user.password) {
          throw new Error("User not found");
        }
        const isValid = compareSync(password, user.password);
        if (!isValid) {
          return null;
        }
        return user;
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isNotLogginRoutes = ["/auth/login", "/auth/register"];

      if (isLoggedIn) {
        if (nextUrl.pathname === "/") {
          return Response.redirect(new URL("/peminjaman", nextUrl));
        }
        if (nextUrl.pathname.startsWith("/auth/login")) {
          return Response.redirect(new URL("/peminjaman", nextUrl));
        }

        if (nextUrl.pathname.startsWith("/auth/register")) {
          return Response.redirect(new URL("/peminjaman", nextUrl));
        }
      } else {
        if (!nextUrl.pathname.startsWith("/_next")) {
          const allowedRoute = isNotLogginRoutes.some((route) => nextUrl.pathname === route || nextUrl.pathname.startsWith(route + "/"));

          if (!allowedRoute) {
            return Response.redirect(new URL("/auth/login", nextUrl));
          }

          return true;
        }
        if (nextUrl.pathname === "/") {
          return Response.redirect(new URL("/auth/login", nextUrl));
        }
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.namaUser = user.namaUser;
        token.id = user.id; // Ensure ID is included
      }
      return token;
    },
    session({ session, token }) {
      if (token) {
        session.user.id = token.sub;
        session.user.namaUser = token.namaUser;
      }

      return session;
    },
  },
});
