// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from './files/files.module';
import { FileEntity } from './files/file.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data.sqlite',
      entities: [FileEntity],
      synchronize: true,
    }),
    FilesModule,
  ],
})

export class AppModule {}
