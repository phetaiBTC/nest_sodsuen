import { Category } from "src/modules/categories/entities/category.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @Column()
    code: string
    @Column({ nullable: true })
    description: string
    @ManyToOne(() => Category, (category) => category.products)
    category: Category
}
