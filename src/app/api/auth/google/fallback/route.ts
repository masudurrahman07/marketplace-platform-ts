import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const demoEmail = 'google-user@example.com';
    const response = NextResponse.json({ success: true, message: 'Google fallback login successful' });

    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    response.cookies.set('isLoggedIn', 'true', { expires, path: '/' });
    response.cookies.set('userEmail', demoEmail, { expires, path: '/' });
    response.cookies.set('userRole', 'user', { expires, path: '/' });
    response.cookies.set('token', `fallback-google-${Date.now()}`, { expires, path: '/' });

    return response;
  } catch (error) {
    console.error('Google fallback route error:', error);
    return NextResponse.json({ success: false, message: 'Fallback login failed' }, { status: 500 });
  }
}
