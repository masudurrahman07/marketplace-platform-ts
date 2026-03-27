import { NextRequest, NextResponse } from 'next/server';

const VALID_USERS = [
  { email: 'user@example.com', password: '123456', role: 'user' },
  { email: 'admin@example.com', password: '123456', role: 'admin' },
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password required' }, { status: 400 });
    }

    const user = VALID_USERS.find(u => u.email === email && u.password === password);

    if (!user) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        email: user.email,
        role: user.role,
      },
      token: 'demo-token-' + Date.now(),
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
