import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { exec } from 'child_process';
import { DataSource } from 'typeorm';
import 'reflect-metadata';
import swaggerOptions from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API Bot')
    .setDescription('API Documentation for Bot')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const datasource = app.get(DataSource);
  datasource.runMigrations();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document , swaggerOptions);

  const port = process.env.PORT ?? 3000;
  
  await app.listen(port, () => {
    const url = `http://localhost:${port}/api`;
    console.log(`Application is running on: http://localhost:${port}`);
    console.log(`Swagger documentation is available at: ${url}`);
    
    // Abrir Swagger automáticamente usando el comando start en Windows
    exec(`start ${url}`, (error) => {
      if (error) {
        console.log('No se pudo abrir el navegador automáticamente');
      }
    });
  });
}
bootstrap();
