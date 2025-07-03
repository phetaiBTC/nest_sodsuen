import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Unit } from '../../units/entities/unit.entity';

@Entity('product_units')
export class ProductUnit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_id: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  unit_id: number;

  @ManyToOne(() => Unit)
  @JoinColumn({ name: 'unit_id' })
  unit: Unit;

  @Column('decimal', { precision: 15, scale: 6 })
  conversion_rate: number;

  @Column('decimal', { precision: 15, scale: 4, default: 0 })
  cost_per_unit: number;

  @Column('decimal', { precision: 15, scale: 4, default: 0 })
  selling_price: number;

  @Column({ nullable: true })
  barcode: string;

  @Column({ default: false })
  is_default: boolean;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;
}
