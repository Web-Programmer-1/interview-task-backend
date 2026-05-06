import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const server = express();

export const createServer = async (expressInstance: express.Express) => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
  });
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );

  await app.init();
  return app;
};

let cachedApp: any;

// Vercel serverless function handler
export default async (req: any, res: any) => {
  try {
    if (!cachedApp) {
      console.log('🚀 Backend cold start: Initializing NestJS...');
      cachedApp = await createServer(server);
      console.log('✅ NestJS initialized successfully');
    }
    
    // Check if the request is for the root or API
    console.log(`📡 Incoming request: ${req.method} ${req.url}`);
    
    return server(req, res);
  } catch (error) {
    console.error('❌ Serverless Function Error:', error);
    res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
};
