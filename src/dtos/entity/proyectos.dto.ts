import { Column, Entity, OneToMany } from "typeorm";


@Entity()
export class Proyecto {
    @Column({ primary: true, generated: true })
    id?: number;

    @Column()
    name: string;

    @Column()
    correoCreador: string;

    @Column({ nullable: true })
    idEquipo: number;
}