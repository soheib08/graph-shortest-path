import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as readline from 'readline';
import 'dotenv/config';
import { AppService } from './app.service';
import { DatasetService } from './dataset.service';
var util = require('util');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
var askQuestion = util.promisify(rl.question).bind(rl);

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: false,
  });
  const appService = app.get(AppService);
  const datasetService = app.get(DatasetService);
  const dataset = await datasetService.initDB();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  while (true) {
    const input = (await askQuestion('Enter a command (start or exit): '))
      .trim()
      .toLowerCase();

    if ((input as string).toLowerCase() === 'start') {
      const start = (await askQuestion('Enter the start user: ')).trim();
      const target = (await askQuestion('Enter the target user: ')).trim();
      const path = await appService.calculate(
        start as string,
        target as string,
        dataset,
      );

      if (path) {
        console.log(path);
      } else {
        console.log('No path found');
      }
    } else if ((input as string) === 'exit') {
      console.log('Goodbye!');
      rl.close();
      break;
    } else {
      console.log('Invalid command. Please enter "start" or "exit".');
    }
  }
}

bootstrap();
