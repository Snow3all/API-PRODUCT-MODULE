import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import { Model, Types } from 'mongoose';
import { Products, ProductsDocument } from './schema/products.schema';
import { productDate } from './dto/product.dto';
import { getProductInfo } from './dto/getProductInfo.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Products.name)
    private readonly productModel: Model<ProductsDocument>,
  ) {}
  async getAllProducts(res: Response) {
    try {
      const getProducts = await this.productModel.find();
      return res.status(200).json({
        statusCode: 0,
        responseData: getProducts,
        message: 'Success',
      });
    } catch (e) {
      return res.status(200).json({
        statusCode: 999,
        message: e,
      });
    }
  }

  async createProduct(body: productDate, res: Response) {
    try {
      const newProduct = new this.productModel({
        name: body.data.name,
        detail: body.data.details,
        price: body.data.price,
        createDate: new Date(),
        updateDate: new Date(),
      });
      const _newProduct = await newProduct.save();
      return res.status(200).json({
        statusCode: 0,
        responseData: _newProduct,
        message: 'Success add new product',
      });
    } catch (e) {
      return res.status(200).json({
        statusCode: 999,
        message: e,
      });
    }
  }

  async getProductInfo(body: getProductInfo, res: Response) {
    try {
      const { productId } = body.data;
      const detailOfProduct = await this.productModel.findOne({
        _id: productId,
      });
      return res.status(200).json({
        statusCode: 0,
        responseData: detailOfProduct,
        message: 'Success',
      });
    } catch (e) {
      return res.status(200).json({
        statusCode: 999,
        message: e,
      });
    }
  }
}
