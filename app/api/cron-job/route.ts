import { NextResponse } from 'next/server';
import { adjustCurrAmountForAllUsers } from '@/lib/actions/submission';

export async function GET() {
  try {
    const result = await adjustCurrAmountForAllUsers();
    return NextResponse.json({ message: result });
  } catch (error) {
    console.error('Error running cron job:', error);
    return NextResponse.json({ error: 'Failed to adjust curr_amount.' });
  }
}
