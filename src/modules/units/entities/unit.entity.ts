import { MyBaseEntity } from "src/common/BaseEntity/BaseEntity";
import { ProductUnit } from "src/modules/product_units/entities/product_unit.entity";
import { Product } from "src/modules/products/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Unit extends MyBaseEntity {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @Column()
    symbol: string
    @Column({ nullable: true })
    description: string

      @OneToMany(() => Product, (product) => product.base_unit)
      products: Product[];

      @OneToMany(() => ProductUnit, (product_unit) => product_unit.unit)
      product_units: Product[];
}
