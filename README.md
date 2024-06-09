## User Pathfinding Problem

This application allows users to find the shortest path between two users in a social network graph.

### Instructions

1. Clone the repository and navigate to the project directory.
2. Install dependencies using `npm install`.
3. Copy the `.env.example` file to `.env` (`cp .env.example .env`).
4. Adjust the `NUMBER_OF_USERS` and `NUMBER_OF_CONNECTIONS` variables in the `.env` file to set the desired number of users and connections.
5. Run the application using `npm run start`.
6. Follow the prompts to enter the start and target users.

### Why BFS?

BFS (Breadth-First Search) is preferred for this problem because it systematically explores neighbors level by level, ensuring that the shortest path is discovered as soon as the target user is reached. This makes it ideal for finding the shortest path between users in an unweighted graph, such as a social network. DFS (Depth-First Search) is not suitable for this problem because it explores paths deeply before backtracking, potentially leading to long and inefficient paths. DFS does not guarantee finding the shortest path in an unweighted graph and may miss the shortest path entirely if it explores a longer path first.
