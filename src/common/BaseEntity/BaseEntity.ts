import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm"

export class MyBaseEntity {
    @CreateDateColumn()
    createdAt: Date
    @UpdateDateColumn()
    updatedAt: Date
    @DeleteDateColumn()
    deletedAt: Date
}