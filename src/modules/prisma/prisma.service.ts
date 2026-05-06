import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private logger = new Logger('PrismaService');

  constructor() {
    const connectionString = process.env.DATABASE_URL;
    
    // Optimize pool for serverless: small max connections, faster timeouts
    const pool = new Pool({ 
      connectionString,
      max: 2, // Low max connections for serverless to avoid hitting Neon limits
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });
    const adapter = new PrismaPg(pool);
    super({ adapter });

    if (!connectionString) {
      this.logger.error('❌ DATABASE_URL is not defined in environment variables!');
    }
  }

  async onModuleInit() {
    // In serverless, we don't want to block startup with a database connection check.
    // Prisma will connect automatically on the first query.
    this.logger.log('Prisma initialized (lazy connection)');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('🔌 Database disconnected');
  }
}
