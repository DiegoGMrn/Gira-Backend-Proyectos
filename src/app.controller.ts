import { Controller,Logger  } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { Proyecto } from './dtos/entity/proyectos.dto';
import { CreateProyectoDto } from './dtos/create-proyecto-dto';


@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}


    @EventPattern('new_proyecto_created')
    async handleNewProyectoCreated(data: { nombre: string, correoCreador: string }) {
      const { nombre, correoCreador } = data;
      console.log(data)
      if (data) {
        const resp = await this.appService.createProyecto(nombre,correoCreador)
        return resp;
      } else {
        console.error('Falta INFO1.');
      }
    }
  @EventPattern('delete_name_proyecto')
    async handleDeleteNameProyecto(data: { name: string, correo: string }) {
      const { name, correo } = data;
      
      if (name && correo) {
        const resp = await this.appService.deleteNameProyecto(correo,name)
        return resp;
      } else {
        console.error('Falta INFO1.');
      }
    }
  
  @EventPattern('show_info_proyecto')
    async handleShowInfoProyecto(data: { correo: string }) {
      const { correo } = data;
      
      if (correo) {
        const resp = await this.appService.showInfoProyecto(correo)
        return resp
      } else {
        console.error('Falta INFO.');
      }
    }

    @EventPattern('agregar_equipo')
    async handleAgregarIntegrante(data: { idProyecto: number, idEquipo: number,correo: string }) {
      const { idProyecto, idEquipo , correo } = data;
      
      if (idProyecto && idEquipo) {
        const resp = await this.appService.agregarEquipo(idProyecto,idEquipo,correo)
        return resp;
      } else {
        console.error('Falta INFO.');
      }
    }
  
}

