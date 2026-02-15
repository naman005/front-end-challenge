import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    name: string;
    description?: string;
    price: number;
    quantity: number;
    createdById: string;
  }) {
    return this.prisma.product.create({ data });
  }

  async findAll() {
    return this.prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    data: Partial<{
      name: string;
      description?: string;
      price: number;
      quantity: number;
    }>,
  ) {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.product.delete({
      where: { id },
    });
  }

  async getDashboardStats() {
    const totalProducts = await this.prisma.product.count();

    const products = await this.prisma.product.findMany({
      select: {
        price: true,
        quantity: true,
      },
    });

    const totalQuantity = products.reduce(
      (sum, p) => sum + p.quantity,
      0,
    );

    const totalInventoryValue = products.reduce(
      (sum, p) => sum + p.price * p.quantity,
      0,
    );

    return {
      totalProducts,
      totalQuantity,
      totalInventoryValue,
    };
  }
}
