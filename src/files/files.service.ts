// src/files/files.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from './file.entity';
import { Express } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}

  async uploadFile(file: Express.Multer.File, description: string): Promise<FileEntity> {
    const fileEntity = new FileEntity();
    fileEntity.filename = file.filename;
    fileEntity.originalname = file.originalname;
    fileEntity.mimetype = file.mimetype;
    fileEntity.size = file.size;
    fileEntity.description = description;

    await this.fileRepository.save(fileEntity);

    return fileEntity;
  }

  async getFileById(id: number): Promise<FileEntity> {
    return this.fileRepository.findOneBy({ id });
  }

  async updateFileInfo(id: number, description: string): Promise<void> {
    await this.fileRepository.update(id, { description });
  }

  async deleteFile(id: number): Promise<void> {
    const file = await this.getFileById(id);
    if (file) {
      fs.unlinkSync(path.join(__dirname, '../../uploads', file.filename));
      await this.fileRepository.delete(id);
    }
  }
}
