import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
    const domain = process.env.NEXT_URL as string
  if (req.nextUrl.pathname === "/" || req.nextUrl.pathname === "") {
    const newUrl = new URL(domain + "/home", req.nextUrl)
    return NextResponse.redirect(newUrl);
  } else {
    return NextResponse.next()
  }
}
