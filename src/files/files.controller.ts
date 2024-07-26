// src/files/files.controller.ts

import { Controller, Post, Get, Param, Patch, Delete, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
      }
    })
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body('description') description: string) {
    return this.filesService.uploadFile(file, description);
  }

  @Get(':id')
  async getFileById(@Param('id') id: number) {
    return this.filesService.getFileById(id);
  }

  @Get('info/:id')
  async getFileInfoById(@Param('id') id: number) {
    return this.filesService.getFileById(id);
  }

  @Patch(':id')
  async updateFileInfo(@Param('id') id: number, @Body('description') description: string) {
    await this.filesService.updateFileInfo(id, description);
  }

  @Delete(':id')
  async deleteFile(@Param('id') id: number) {
    await this.filesService.deleteFile(id);
  }
}
