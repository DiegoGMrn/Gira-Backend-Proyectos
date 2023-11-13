import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtModule } from '@nestjs/jwt'; // Asegúrate de importar JwtModule

import { Proyecto } from './dtos/entity/proyectos.dto';




@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PROYECTO_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'proyecto_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3310,
      username: 'user_crud2',
      password: 'root',
      database: 'db_crud2',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Proyecto]),
    JwtModule.register({
      secret: 'tu_clave_secreta', // Remplaza con tu clave secreta real
      signOptions: { expiresIn: '1h' }, // Opciones de firma del token
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}