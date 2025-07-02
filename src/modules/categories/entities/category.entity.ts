import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MyBaseEntity } from "src/common/BaseEntity/BaseEntity";
import { Product } from "src/modules/products/entities/product.entity";

@Entity()
export class Category extends MyBaseEntity {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @Column({ nullable: true })
    description: string
    @OneToMany(() => Product, (product) => product.category)
    products: Product[]
}
