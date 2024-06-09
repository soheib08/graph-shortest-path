import { Injectable } from '@nestjs/common';
import { log } from 'console';
import { GraphService } from './graph.service';

@Injectable()
export class AppService {
  constructor(private readonly graph: GraphService) {}

  calculate(user1: string, user2: string, dataset): string {
    log(user1, user2);
    dataset.users.forEach((user) => {
      this.graph.addUser(user);
    });

    dataset.connections.forEach(([user1, user2]) =>
      this.graph.addConnection(user1, user2),
    );

    const bfsResult = this.graph.bfsPath(user1, user2);
    const dfsResult = this.graph.bfsPath(user1, user2);
    return !!bfsResult && !!dfsResult
      ? `users are connected,short path bfs: ${bfsResult}, dfs: ${dfsResult}}`
      : 'users are not connected';
  }
}
