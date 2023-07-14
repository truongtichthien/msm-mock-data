import { NextResponse } from 'next/server';

export function middleware() {
  // retrieve the current response
  const response = NextResponse.next();

  response.headers.append('Access-Control-Allow-Credentials', 'true');
  response.headers.append('Access-Control-Expose-Headers', 'true');
  response.headers.append('Access-Control-Allow-Origin', 'http://local.iskra.world:3000');
  response.headers.append('Access-Control-Allow-Methods', 'GET, DELETE, PATCH, POST, PUT, OPTIONS');
  response.headers.append('Referrer-Policy', 'origin-when-cross-origin');
  response.headers.append(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Content-Type, Authorization',
  );
  //   'Access-Control-Expose-Headers': 'true',
  //   'Referrer-Policy': 'origin-when-cross-origin',
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Credentials': 'true',
  //   'Access-Control-Allow-Methods': 'GET, OPTIONS, PATCH, DELETE, POST, PUT',
  // 'Access-Control-Allow-Origin': '*',
  // 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  // 'Access-Control-Allow-Headers': 'Content-Type, Authorization',

  return response;
}

// specify the path regex to apply the middleware to
export const config = {
  matcher: '/api/:path*',
};
