import { NextResponse } from "next/server";
import { getUser } from "./app/lib/db-supabase/getUser";
import { decode } from "next-auth/jwt";

const publicPaths = ["/login"];
const protectedPaths = ["/dashboard"];

const isProtectedPath = (path: string) => protectedPaths.includes(path);
const isPublicPath = (path: string) => publicPaths.includes(path);

const decodeCookieToken = async (token: any, res: any) => {
  const secretKey = process.env.NEXTAUTH_SECRET || "";
  try {
    return await decode({
      token,
      secret: secretKey,
    });
  } catch (error) {
    res.cookies.set("next-auth.session-token", "", {
      maxAge: 0,
      path: "/",
    });
    return null;
  }
};
export default async function middleware(req: any) {
  const { pathname, origin } = req.nextUrl;
  const baseUrl = req.nextUrl.origin;
  const cookie = req.cookies;

  // Always Expose pathname so we can access it directly on server components using header.get("x-pathname") ~ next/headers
  const res = NextResponse.next();
  res.headers.set("x-public-pathname", pathname);

  const authCookie =
    cookie.get("next-auth.session-token")?.value ||
    cookie.get("__Secure-next-auth.session-token")?.value;

  const decodedToken = await decodeCookieToken(authCookie, res);

  if (decodedToken) {
    if (pathname === "/login") {
      const red = NextResponse.redirect(`${origin}/dashboard`);
      red.headers.set("x-public-pathname", pathname);
      return red;
    }
    if (
      pathname === "/dashboard" &&
      decodedToken?.sub &&
      typeof decodedToken.sub === "string"
    ) {
      const red = NextResponse.redirect(
        `${baseUrl}/dashboard/~${decodedToken.sub}~${decodedToken.name
          ?.split(" ")
          .join("_")}~`
      );
      red.headers.set("x-public-pathname", pathname);
      return red;
    }
    const { data, success } = await getUser(decodedToken.email as string);
    if (success && data) {
      return res;
    } else {
      res.cookies.set("next-auth.session-token", "", {
        maxAge: 0,
        path: "/",
      });
      return res;
    }
  } else {
    if (isProtectedPath(pathname)) {
      const red = NextResponse.redirect(`${origin}/login`);
      red.headers.set("x-public-pathname", pathname);
      return red;
    }
  }
  return res;
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/api/:path*", "/login"],
};
