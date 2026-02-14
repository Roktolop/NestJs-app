import { DocumentBuilder } from '@nestjs/swagger';

export function getSwaggerConfig() {
  return new DocumentBuilder()
    .setTitle('NestJs API')
    .setDescription('A simple and powerful API for NestJs applications.')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
}
