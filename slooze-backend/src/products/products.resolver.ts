import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  ObjectType,
  Field,
  Float,
  Int,
  InputType,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../common/enums/role.enum';

@ObjectType()
class Product {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Float)
  price: number;

  @Field(() => Int)
  quantity: number;

  @Field()
  createdById: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@InputType()
class CreateProductInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Float)
  price: number;

  @Field(() => Int)
  quantity: number;
}

@InputType()
class UpdateProductInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Float, { nullable: true })
  price?: number;

  @Field(() => Int, { nullable: true })
  quantity?: number;
}

@ObjectType()
class DashboardStats {
  @Field(() => Int)
  totalProducts: number;

  @Field(() => Int)
  totalQuantity: number;

  @Field(() => Float)
  totalInventoryValue: number;
}

@Resolver()
@UseGuards(GqlAuthGuard) 
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}


  @Query(() => [Product])
  async products() {
    return this.productsService.findAll();
  }

  @Query(() => Product, { nullable: true })
  async product(@Args('id') id: string) {
    return this.productsService.findOne(id);
  }


  @Mutation(() => Product)
  async createProduct(
    @Args('input') input: CreateProductInput,
    @Context() context,
  ) {
    const user = context.req.user;

    return this.productsService.create({
      ...input,
      createdById: user.sub,
    });
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('id') id: string,
    @Args('input') input: UpdateProductInput,
  ) {
    return this.productsService.update(id, input);
  }

  @Mutation(() => Product)
  async deleteProduct(@Args('id') id: string) {
    return this.productsService.remove(id);
  }


  @Query(() => DashboardStats)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.MANAGER)
  async dashboard() {
    return this.productsService.getDashboardStats();
  }
}
