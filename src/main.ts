import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3001';

  app.enableCors({
    origin: frontendUrl,
    credentials: true,
  });

  await app.listen(port, '0.0.0.0');
  console.log(`🚀 GraphQL Server running on http://localhost:${port}/graphql`);
  console.log('📊 Supabase URL:', process.env.SUPABASE_URL);
  console.log('🌐 CORS origin:', frontendUrl);
}
bootstrap();
