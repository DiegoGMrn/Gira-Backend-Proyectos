import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Proyecto } from "./proyectos.dto";

@Entity()
export class EquiposProyectos {
    @Column({ primary: true, generated: true })
    id?: number;

    @Column()
    idProyecto: number;

    @Column()
    idEquipo: number;
    

    
    @ManyToOne(() => Proyecto, proyecto => proyecto.equiposProyectos)
    @JoinColumn()  // Ajusta el nombre de la columna si es diferente
    proyecto?: Proyecto;
    
    
}