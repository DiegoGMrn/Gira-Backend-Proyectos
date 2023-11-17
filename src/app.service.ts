import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProyectoDto } from './dtos/create-proyecto-dto';
import { JwtService } from '@nestjs/jwt';

import * as nodemailer from 'nodemailer';
import { Proyecto } from './dtos/entity/proyectos.dto';


@Injectable()
export class AppService {
  constructor(@Inject('PROYECTO_SERVICE') private client: ClientProxy,
  @InjectRepository(Proyecto) private readonly proyectoRepository: Repository<Proyecto>,private readonly jwtService: JwtService,){}
  
  
  async createProyecto(nombre: string,correo: string): Promise<boolean> {
    const equipo = new Proyecto();
    equipo.name = nombre;
    equipo.correoCreador = correo;
    //console.log(equipo)
    const savedProyecto = await this.proyectoRepository.save(equipo);
    console.log("asd",savedProyecto) 
    if(savedProyecto){
      return true;
    }
    
    return false; 
  }
  async deleteNameProyecto(correo: string , nameProyecto:string): Promise<boolean> {
    const correoCreador = correo;
    const name = nameProyecto;
    const proyecto = await this.proyectoRepository.findOne({ where: { correoCreador,name } });
    console.log(proyecto)

    if(proyecto && proyecto.correoCreador == correo){
      await this.proyectoRepository.remove(proyecto);
      
      return true;
    }
    

    return false;
  }

  async showInfoProyecto(correoT: string): Promise<{ id: number,nombre: string; correo: string, idEquipo: number }[] | null> {
    const correoCreador = correoT;
    const proyecto = await this.proyectoRepository.find({ where: { correoCreador } });
  
    if (proyecto) {
      return proyecto.map((proyecto) => ({ id: proyecto.id,nombre: proyecto.name, correo: proyecto.correoCreador, idEquipo: proyecto.idEquipo}));
    }
  
    return null; 
  }
  

  async agregarEquipo(idProyecto: number, idEquipo: number, correoT: string): Promise<boolean> {
    const idDelProyecto = idProyecto;
    const idDelEquipo = idEquipo;
    const correoCreador = correoT;

    const proyectoBuscado = await this.proyectoRepository.findOne({where:{id:idDelProyecto}})
    if(proyectoBuscado){
      proyectoBuscado.idEquipo = idDelEquipo;
      await this.proyectoRepository.save(proyectoBuscado)
      return true
    }
    


    return false
      }
  

}


