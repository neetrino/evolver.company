import { NextResponse } from 'next/server';

import { getServerEnv } from '@/shared/lib/env';
import { logger } from '@/shared/lib/logger';

export async function GET(): Promise<NextResponse> {
  const env = getServerEnv();

  logger.debug('Health check requested');

  return NextResponse.json({
    status: 'ok',
    service: 'evolver-company',
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
}
