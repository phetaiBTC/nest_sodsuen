import { MyBaseEntity } from "src/common/BaseEntity/BaseEntity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Supplier extends MyBaseEntity {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @Column()
    contact_person: string
    @Column()
    phone: string
    @Column()
    address: string
    @Column()
    email: string
    @Column()
    payment_terms: string
    @Column()
    is_active: boolean
}
