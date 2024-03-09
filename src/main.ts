import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; import { AppModule } from './app.module';
import { TransformationInterceptor } from './shared/utils/responseIntercerptor';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,
    {
      cors: true,
      bodyParser: true,
      logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    });
  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalInterceptors(new TransformationInterceptor());
  const config = new DocumentBuilder()
    .setTitle('Eccomerce API')
    .setDescription('Eccomerce API')
    .setVersion('1.0')
    .addTag('Eccommerce')
    .setContact('Brandon Velasquez', 'https://www.linkedin.com/in/brandon-velasquez-osorio/', 'brandon.velasquez.osorio@gmail.com')
    .addBearerAuth({
      name: 'Authorization',
      type: 'http',
      scheme: 'bearer',
      in: 'header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document);
  const port = process.env.PORT || 3200;
  console.log(`Server running on port ${port}`);
  await app.listen(port);
}
bootstrap();
