import { MyBaseEntity } from 'src/common/BaseEntity/BaseEntity';
import { District } from 'src/modules/district/entities/district.entity';
import { Role } from 'src/modules/roles/entities/role.entity';
import { Column, PrimaryGeneratedColumn,Entity, ManyToOne } from 'typeorm';
@Entity()
export class User extends MyBaseEntity {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    username: string
    @Column()
    password: string
    @Column({ unique: true })
    email: string
    @Column()
    phone: string
    @ManyToOne(() => District, (district) => district.users)
    district: District
    @ManyToOne(() => Role, (role) => role.users)
    role: Role
}

