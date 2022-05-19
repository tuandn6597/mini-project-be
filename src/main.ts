import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvironmentService } from '@internal/core/environment/environment.service';
import * as path from "path";
import moduleAlias = require("module-alias");
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from '@internal/core/http-exception-filter/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';

moduleAlias.addAlias("@internal/shared", path.resolve(__dirname, "./shared"));
moduleAlias.addAlias("@internal/core", path.resolve(__dirname, "./core"));
moduleAlias.addAlias("@internal/database", path.resolve(__dirname, "./database"));

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const envService = app.get(EnvironmentService);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter())
  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('Backend Api doc')
    .setDescription('Tuan dep trai')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(envService.ENVIRONMENT.API_PORT || 3000);
}
bootstrap();
