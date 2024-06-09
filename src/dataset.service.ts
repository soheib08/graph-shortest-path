import { Injectable } from '@nestjs/common';
import fs from 'fs/promises';

@Injectable()
export class DatasetService {
  async initDB() {
    console.log(
      'number of users:',
      process.env.NUM_USERS,
      'number of connections:',
      process.env.NUM_CONNECTIONS,
    );

    if (
      !Number(process.env.NUM_USERS) ||
      !Number(process.env.NUM_CONNECTIONS)
    ) {
      throw new Error('Missing environment variables');
    }

    const dataset = this.generateUsersAndConnections(
      Number(process.env.NUM_USERS),
      Number(process.env.NUM_CONNECTIONS),
    );

    return dataset;
  }

  private generateUsersAndConnections(
    numUsers: number,
    numConnections: number,
  ) {
    const users: Array<string> = [];
    const connections: Array<Array<string>> = [];

    for (let i = 1; i <= numUsers; i++) {
      users.push(`user${i}`);
    }

    for (let i = 0; i < numConnections; i++) {
      const userA = users[Math.floor(Math.random() * numUsers)];
      const userB = users[Math.floor(Math.random() * numUsers)];
      if (
        userA !== userB &&
        !connections.some(
          (conn) =>
            (conn[0] === userA && conn[1] === userB) ||
            (conn[0] === userB && conn[1] === userA),
        )
      ) {
        connections.push([userA, userB]);
      }
    }

    return { users, connections };
  }
}
