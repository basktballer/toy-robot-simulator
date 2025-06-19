import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RobotController } from './robot/robot.controller';
import { RobotService } from './robot/robot.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Robot } from './robot/models/robot.model';
import { RobotModule } from './robot/robot.module';
import { MovesService } from './moves/moves.service';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      models: [Robot],
      autoLoadModels: true,
      synchronize: true,
    }),
    RobotModule
  ],
  controllers: [AppController, RobotController],
  providers: [AppService, RobotService, MovesService],
})
export class AppModule {}
