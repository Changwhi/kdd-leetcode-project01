import { NextResponse } from 'next/server';
import { withMiddlewareAuthRequired, getSession } from '@auth0/nextjs-auth0/edge';

export const config = {
  matcher: '/dashboard/:path*',
};

export default withMiddlewareAuthRequired();
