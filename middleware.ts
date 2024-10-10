import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import {
  withMiddlewareAuthRequired,
  getSession,
} from "@auth0/nextjs-auth0/edge";

export const config = {
  matcher: ["/dashboard/:path*","/settings/:path*"]
};

export default withMiddlewareAuthRequired(async function middleware(
  req: NextRequest,
  event: NextFetchEvent
) {
  const url = req.nextUrl;
  const res = NextResponse.next();

  // Get user info
  const session = await getSession(req, res);
  const user = session?.user;

  const endpointparts = url.pathname.split("/"); //["","dashboard", groupid, "summary"]

  // no specified group id (endpointparts = ["","dashboard"])
  if (endpointparts.length < 3) {
    return NextResponse.redirect(new URL("/group", req.url));
  }

  const groupId = endpointparts[2];

  // page within dashboard is not specified (endpointparts = ["","dashboard", groupname])
  if (endpointparts.length < 4) {
    return NextResponse.redirect(
      new URL(`/dashboard/${groupId}/summary`, req.url)
    );
  }

  let result;
  try {
    const fetchResponse = await fetch(`${process.env.USERINFO_API_URL}/${user?.email}/${groupId}`, {
      method: "GET",
    });
    if (!fetchResponse.ok) {
      throw new Error(`Failed to fetch user info: ${fetchResponse.status}`);
    }

    result = await fetchResponse.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.redirect(new URL("/group", req.url));
  }

  // User is not a part of the group
  if (!result?.response || result.response.length <= 0) {
    return NextResponse.redirect(new URL("/group", req.url));
  }

  // Determine if the user is an admin or a regular user
  const userType = result.response[0].user_type === 0 ? "admin" : "user";
  return NextResponse.rewrite(
    new URL(`/dashboard/${groupId}/${userType}/${endpointparts[3]}`, req.url)
  );
});
