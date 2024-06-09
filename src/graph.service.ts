import { Injectable } from '@nestjs/common';

interface UserNode {
  user: string;
  connections: string[];
}

@Injectable()
export class GraphService {
  private userMap: Map<string, UserNode> = new Map();

  addUser(user: string) {
    if (!this.userMap.has(user)) {
      this.userMap.set(user, { user, connections: [] });
    }
  }

  addConnection(user1: string, user2: string) {
    this.userMap.get(user1)?.connections.push(user2);
    this.userMap.get(user2)?.connections.push(user1);
  }

  bfsPath(start: string, target: string): string[] | null {
    if (!this.userMap.has(start) || !this.userMap.has(target)) {
      return null;
    }

    const queue: string[][] = [[start]];
    const visited: Set<string> = new Set([start]);
    while (queue.length > 0) {
      const path = queue.shift();
      if (!path) continue;

      const node = path[path.length - 1];
      const userNode = this.userMap.get(node);
      if (userNode?.user === target) {
        return path;
      }

      for (const neighbor of userNode?.connections || []) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push([...path, neighbor]);
        }
      }
    }

    return null;
  }

  dfsPath(start: string, target: string): string[] | null {
    if (!this.userMap.has(start) || !this.userMap.has(target)) {
      return null;
    }

    const stack: string[][] = [[start]];
    const visited: Set<string> = new Set();

    while (stack.length > 0) {
      const path = stack.pop();
      if (!path) continue;

      const node = path[path.length - 1];
      if (node === target) {
        return path;
      }

      if (!visited.has(node)) {
        visited.add(node);
        const userNode = this.userMap.get(node);

        for (const neighbor of userNode?.connections || []) {
          if (!visited.has(neighbor)) {
            stack.push([...path, neighbor]);
          }
        }
      }
    }

    return null;
  }
}
