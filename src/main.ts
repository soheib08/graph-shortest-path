import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as readline from 'readline';
import 'dotenv/config';
import { DBService } from './db.service';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: false,
  });
  const appService = app.get(AppService);
  const dbService = app.get(DBService);

  const dataset = await dbService.initDB();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Please enter userIds separated by commas: ', async (input) => {
    const users = input.split(',').map((url) => url.trim());
    if (users.length != 2) throw new Error('you can only submit 2 users');

    console.log(dataset.connections.length, dataset.users.length);
    const result = await appService.calculate(users[0], users[1], dataset);
    console.log(result);

    rl.close();
  });
}
bootstrap();
