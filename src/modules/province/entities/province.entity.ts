import { District } from "src/modules/district/entities/district.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Province {
        @PrimaryGeneratedColumn()
        id: number;
        @Column()
        name: string;
        @Column()
        name_en: string;
        @OneToMany(() => District, (district) => district.province)
        districts: District[]
}
