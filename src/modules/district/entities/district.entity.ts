import { Province } from "src/modules/province/entities/province.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
@Entity()
export class District {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    name_en: string;
    @ManyToOne(() => Province, (province) => province.districts)
    province: Province
    @OneToMany(() => User, (user) => user.district)
    users: User[]
}
