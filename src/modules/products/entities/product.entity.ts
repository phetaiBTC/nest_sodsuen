// src/products/entities/product.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProductUnit } from '../../product_units/entities/product_unit.entity';
import { Unit } from 'src/modules/units/entities/unit.entity';
import { Category } from 'src/modules/categories/entities/category.entity';
import { MyBaseEntity } from 'src/common/BaseEntity/BaseEntity';

@Entity('products')
export class Product extends MyBaseEntity {
  @PrimaryGeneratedColumn()
  product_id: number;

  @Column({ unique: true })
  product_code: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  category_id: number;

  @Column()
  base_unit_id: number;

  @Column({ type: 'decimal', precision: 15, scale: 4, default: 0 })
  base_cost: number;

  @Column({ type: 'decimal', precision: 15, scale: 4, default: 0 })
  base_price: number;

  @Column({ nullable: true })
  barcode: string;

  //   @Column({ nullable: true })
  //   sku: string;

  @Column({ type: 'decimal', precision: 15, scale: 4, default: 0 })
  min_stock_level: number;

  @Column({ type: 'decimal', precision: 15, scale: 4, default: 0 })
  max_stock_level: number;

  @Column({ type: 'decimal', precision: 15, scale: 4, default: 0 })
  reorder_point: number;

  @Column({ default: true })
  is_active: boolean;

  @Column({ nullable: true })
  image: string;

  @OneToMany(() => ProductUnit, (unit) => unit.product, { cascade: true })
  product_units: ProductUnit[];

  @ManyToOne(() => Category, { eager: false })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Unit, { eager: false })
  @JoinColumn({ name: 'base_unit_id' })
  base_unit: Unit;
}
