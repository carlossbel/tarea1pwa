import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://api.quotable.io/random?tags=inspirational', {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch quote');
    }
    
const data = await response.json();
    
    return NextResponse.json({
      quote: data.content,
      author: data.author
    });
  } catch (error) {
    console.error('Error fetching quote:', error);
    return NextResponse.json({
      quote: 'Cada día es una nueva oportunidad para escribir tu historia.',
      author: 'Anónimo'
    });
  }
}

export const dynamic = 'force-dynamic';