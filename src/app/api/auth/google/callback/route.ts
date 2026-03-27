import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      return NextResponse.redirect(
        new URL(`/login?error=${encodeURIComponent(error)}`, req.url)
      );
    }

    if (!code) {
      return NextResponse.redirect(
        new URL('/login?error=no_code', req.url)
      );
    }

    // For demo purposes, extract email from the authorization code
    // In production, you'd exchange the code for an access token
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = `${new URL(req.url).origin}/api/auth/google/callback`;

    if (!clientSecret) {
      // Fallback: Create a demo Google user
      const demoEmail = 'google-user@example.com';
      const expires = new Date(Date.now() + 24 * 60 * 60 * 1000).toUTCString();
      
      const response = NextResponse.redirect(new URL('/dashboard', req.url));
      response.cookies.set('isLoggedIn', 'true', { 
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        path: '/',
      });
      response.cookies.set('userEmail', demoEmail, { 
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        path: '/',
      });
      response.cookies.set('userRole', 'user', { 
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        path: '/',
      });
      response.cookies.set('token', `google-token-${Date.now()}`, { 
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        path: '/',
      });

      return response;
    }

    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId || '',
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }).toString(),
    });

    if (!tokenResponse.ok) {
      return NextResponse.redirect(
        new URL('/login?error=token_exchange_failed', req.url)
      );
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Get user info from Google
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!userResponse.ok) {
      return NextResponse.redirect(
        new URL('/login?error=userinfo_failed', req.url)
      );
    }

    const userData = await userResponse.json();
    const userEmail = userData.email;

    // Create response and set cookies
    const response = NextResponse.redirect(new URL('/dashboard', req.url));
    
    response.cookies.set('isLoggedIn', 'true', { 
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      path: '/',
    });
    response.cookies.set('userEmail', userEmail, { 
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      path: '/',
    });
    response.cookies.set('userRole', 'user', { 
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      path: '/',
    });
    response.cookies.set('token', `google-${accessToken.substring(0, 20)}`, { 
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Google OAuth callback error:', error);
    return NextResponse.redirect(
      new URL('/login?error=callback_error', req.url)
    );
  }
}
