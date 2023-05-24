import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3003);
  console.log('MongoURL: ', process.env.MONGODB_URL);
  console.log('=====> PRODUCTS_MODULE');
}
bootstrap();
