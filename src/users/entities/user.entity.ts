import {
    Column,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
  } from "typeorm";

export enum UserRole {
    ADMIN = "admin",
    USER = "user",
}
@Entity()
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({ nullable: false, select: false })
    password: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER,
    })
    role: UserRole

    @DeleteDateColumn()
    deletedAt: Date;
}
