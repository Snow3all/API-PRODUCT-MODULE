import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { productDate } from './dto/product.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllProducts(@Res() res: Response) {
    return this.appService.getAllProducts(res);
  }

  @Post('/create')
  createProduct(@Body() body: productDate, @Res() res: Response) {
    return this.appService.createProduct(body, res);
  }
}
