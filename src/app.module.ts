import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphService } from './graph.service';
import { DatasetService } from './dataset.service';

@Module({
  imports: [],
  controllers: [],
  providers: [AppService, DatasetService, GraphService],
})
export class AppModule {}
