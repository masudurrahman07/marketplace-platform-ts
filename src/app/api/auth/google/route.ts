import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    
    if (!clientId) {
      return NextResponse.json(
        { error: 'Google OAuth not configured' },
        { status: 400 }
      );
    }

    const redirectUri = `${new URL(req.url).origin}/api/auth/google/callback`;
    const scope = 'openid profile email';
    const authEndpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
    
    const authUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&response_type=code`;

    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error('Google auth error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
