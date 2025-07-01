import { MyBaseEntity } from "src/common/BaseEntity/BaseEntity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
