import  { IsString } from "class-validator"

export class CreateProyectoDto{
    @IsString()
    name:string
    @IsString()
    correoCreador:string
}