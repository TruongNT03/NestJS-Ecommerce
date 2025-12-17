import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { Address } from 'src/entities/address.entity';
import { Product } from 'src/entities/product.entity';
import { ProductVariant } from 'src/entities/product-variant.entity';
import { Cart } from 'src/entities/cart.entity';
import { CartItem } from 'src/entities/cart-item.entity';
import { Payment } from 'src/entities/payment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Address, Product, ProductVariant, Cart, CartItem, Payment]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
