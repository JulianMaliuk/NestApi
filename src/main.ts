import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import configuration from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  const options = new DocumentBuilder()
    .setTitle('Personal Area')
    .setDescription('API description')
    .setVersion('1.0')
    // .addTag('personal-area')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));

  app.setGlobalPrefix('v1');
  
  await app.listen(configuration().port);
}
bootstrap();
