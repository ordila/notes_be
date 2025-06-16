import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3001',
    credentials: true,
  });
  await app.listen(3000);
  console.log('🚀 GraphQL Server running on http://localhost:3000/graphql');
  console.log('📊 Supabase URL:', process.env.SUPABASE_URL);
}
bootstrap();
