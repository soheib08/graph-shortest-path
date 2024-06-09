import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { DBService } from './db.service';
import { GraphService } from './graph.service';

@Module({
  imports: [],
  controllers: [],
  providers: [AppService, DBService, GraphService],
})
export class AppModule {}
