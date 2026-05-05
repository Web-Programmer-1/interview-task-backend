import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global prefix
  app.setGlobalPrefix('api');

  // CORS — allow frontend
  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'http://localhost:3000',
        'http://localhost:3001',
        process.env.FRONTEND_URL,
      ].filter(Boolean);

      if (!origin || allowedOrigins.some(o => o === origin) || origin.endsWith('.vercel.app')) {
        callback(null, true);
      } else {
        callback(null, false); // Or throw error, but false is safer for some clients
      }
    },
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
  });

  // Global exception filter
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  console.log(`🕌 Quran API running on: http://localhost:${port}/api`);
}

bootstrap();
