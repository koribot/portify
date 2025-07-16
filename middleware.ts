import { NextResponse } from "next/server";
import { getUser } from "./app/lib/db-supabase/getUser";
import { decode } from "next-auth/jwt";

const publicPaths = ["/login"];
const protectedPaths = ["/dashboard"];

const isProtectedPath = (path: string) => protectedPaths.includes(path);
const isPublicPath = (path: string) => publicPaths.includes(path);

const decodeToken = async (token: any, res: any) => {
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

  // Always Expose pathname so we can access it directly on server components using headler.get("x-pathname") ~ next/headers
  const res = NextResponse.next();
  res.headers.set("x-public-pathname", pathname);

  const authCookie =
    cookie.get("next-auth.session-token")?.value ||
    cookie.get("__Secure-next-auth.session-token")?.value;

  const decodedToken = await decodeToken(authCookie, res);

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

  // Skip public routes
  // if (!pathname.startsWith("/dashboard")) return NextResponse.next();

  // // No token = redirect to login
  // if (!token || !token.email) {
  //   return NextResponse.redirect(`${origin}/login`);
  // }

  // // Check DB
  // const { data, success } = await getUser(token.email);

  // if (!success || !data) {
  //   // 🧽 Clear session cookies if user doesn't exist in DB
  //   const res = NextResponse.redirect(`${origin}/login`);
  //   res.cookies.set("next-auth.session-token", "", { maxAge: 0 });
  //   res.cookies.set("__Secure-next-auth.session-token", "", { maxAge: 0 });
  //   res.cookies.set("next-auth.callback-url", "", { maxAge: 0 });
  //   return res;
  // }

  // // ✅ User exists — optionally redirect /dashboard → /dashboard/:id
  // if (pathname === "/dashboard") {
  //   return NextResponse.redirect(`${origin}/dashboard/${data.id}`);
  // }

  // return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/api/:path*", "/login"],
};

// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";

// export default withAuth(
//   function middleware(req) {
//     const path = req.nextUrl.pathname;
//     const token = req.nextauth.token;
//     const baseUrl = req.nextUrl.origin;
//     // Handle dashboard root redirect
//     if (path === "/dashboard" && token?.sub && typeof token.sub === "string") {
//       return NextResponse.redirect(`${baseUrl}/dashboard/${token.sub}`);
//     }
//     // Let NextAuth handle other auth checks via the authorized callback
//     return NextResponse.next();
//   },
//   {
//     callbacks: {
//       authorized: async ({ token, req }) => {
//         // Only allow dashboard access with valid token

//         return req.nextUrl.pathname.startsWith("/dashboard") ? !!token : true;
//       },
//     },
//     pages: {
//       signIn: "/login",
//     },
//   }
// );

// export const config = {
//   matcher: [
//     /*
//      * Exclude:
//      * - _next static files (JS, CSS, images)
//      * - favicon.ico, robots.txt, manifest, .well-known, etc.
//      */
//     "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json|.well-known).*)",
//   ],
// };
