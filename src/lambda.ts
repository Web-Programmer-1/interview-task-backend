import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import serverlessHttp from 'serverless-http';
import express from 'express';

const instance = express();
let cachedHandler: any;

async function bootstrap() {
  if (!cachedHandler) {
    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(instance),
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
    cachedHandler = serverlessHttp(instance);
  }
  return cachedHandler;
}

export const handler = async (event: any, context: any) => {
  const handler = await bootstrap();
  return handler(event, context);
};
