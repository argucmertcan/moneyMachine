import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'Cron endpoint scaffolded. Implementation arrives in Step 4.'
  });
}
