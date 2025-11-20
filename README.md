# Tic-Tac-Toe Game

Welcome to the Tic-Tac-Toe Game project! This is a real-time multiplayer (and local single-player) Tic-Tac-Toe application built with Vue 3, Pinia for state management, and a WebSocket-based backend using Express.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [How to Play](#how-to-play)
- [Roadmap](#roadmap)

## Description

This project provides a classic Tic-Tac-Toe game experience with two main modes:

1.  **Online Multiplayer:** Players can create rooms, join existing rooms, and play against other players in real-time over WebSockets.
2.  **Local Multuplayer:** Play against yourself or a friend on the same device, no internet connection required.

The application is designed with a clear separation of concerns, using composables for core game logic, Pinia for global state management, and Vue components for the UI.

## Features

-   **Real-time Online Multiplayer:**
    -   Create unique game rooms.
    -   Join rooms using their ID.
    -   Real-time move synchronization between players.
    -   Waiting screen for second player.
    -   Disconnection handling (including server-side heartbeat for inactive connections).
-   **Local Game Mode:**
    -   Play Tic-Tac-Toe locally without needing a server connection.
    -   Uses the same core game logic as the online mode.
-   **Responsive UI:** Designed to be playable across various screen sizes.
-   **Clean Code Architecture:**
    -   Vue 3 with Composition API.
    -   Pinia for robust state management.
    -   Composable functions for reusable game logic.
    -   Modular component design.
-   **Basic Error Handling:** Notification for full rooms.

## Technologies

**Frontend:**

-   **Vue 3:** The progressive JavaScript framework for building user interfaces.
-   **Pinia:** A lightweight, intuitive, and type-safe state management library for Vue.
-   **Vue Router:** For declarative routing.
-   **Vite:** A next-generation frontend tooling that provides an extremely fast development experience.
-   **Tailwind CSS:** A utility-first CSS framework for rapidly styling components.
-   **@vueuse/core:** A collection of essential Vue Composition Utilities, used for WebSocket integration.
-   **Heroicons:** A set of free, MIT-licensed high-quality SVG icons.

**Backend:**

-   **Node.js:** JavaScript runtime.
-   **Express.js:** A fast, unopinionated, minimalist web framework for Node.js.
-   **express-ws:** Extends Express with WebSocket routes.
-   **nodemon:** A tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.

**Development Tools:**

-   **ESLint:** For code linting.
-   **Prettier:** For code formatting.
-   **Vitest:** A blazing fast unit test framework powered by Vite.
-   **Happy DOM:** A JavaScript DOM implementation for Node.js.

## Installation

To get this project up and running on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/tic-tac-toe.git
    cd tic-tac-toe
    ```

2.  **Install frontend dependencies:**
    ```bash
    npm install
    ```

3.  **Install backend dependencies (within the server directory):**
    ```bash
    cd server
    npm install
    cd .. # Go back to the project root
    ```

## Running the Project

You can run the frontend and backend development servers concurrently.

1.  **Start the backend server:**
    Open a new terminal in the project root and run:
    ```bash
    npm run serve:dev
    ```
    This will start the WebSocket server, typically on port `5172`. You should see a message like `Server is running on port 5172`.

2.  **Start the frontend development server:**
    Open another terminal in the project root and run:
    ```bash
    npm run dev
    ```
    This will start the Vite development server, usually on `http://localhost:5173`.

3.  **Open in browser:**
    Navigate to `http://localhost:5173` in your web browser.

**Build for Production:**

To build the project for production, run:
```bash
npm run build
```
This will create a `dist` directory in the root and in the `server` directory. You can then serve the built frontend with the Node.js server.
```bash
npm run serve
```

## Project Structure

```
tic-tac-toe/
├── codestyle/                # Code style configurations
├── node_modules/             # Node.js dependencies
├── public/                   # Static assets
├── server/                   # Backend application
│   ├── controllers/          # WebSocket message handlers
│   └── index.js              # Server entry point, WebSocket setup
├── src/                      # Frontend application (Vue.js)
│   ├── assets/               # Static assets (images, icons)
│   ├── components/           # Reusable Vue components (e.g., Button, Matrix, Cell)
│   │   ├── base/             # Generic base components
│   │   └── game/             # Game-specific layout components
│   ├── composables/          # Reusable Vue Composition API functions (e.g., useGame, useWebSocket)
│   │   └── use-game.js       # Core game logic (matrix, moves, win conditions)
│   ├── data/                 # Game-related constants (e.g., WINNING_IDXS, MATRIX_INIT)
│   ├── pages/                # Top-level page components (e.g., Game.vue, Local.vue, Lobby.vue, Main.vue)
│   ├── router/               # Vue Router configuration
│   ├── store/                # Pinia stores for global state (e.g., game.js, user.js)
│   ├── App.vue               # Main Vue application component
│   └── main.js               # Frontend entry point
├── .dockerignore             # Files to ignore for Docker builds
├── .gitignore                # Files to ignore for Git
├── .prettierrc.js            # Prettier configuration
├── CHECKLIST.md              # Project checklist
├── Dockerfile                # Docker configuration
├── README.md                 # Project README
├── eslint.config.js          # ESLint configuration
├── index.html                # Main HTML file
├── package.json              # Project dependencies and scripts (frontend)
├── postcss.config.js         # PostCSS configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── vite.config.js            # Vite configuration
```

## How to Play

### Local Game

1.  Start the frontend application (`npm run dev`).
2.  From the main menu, select "Local Game".
3.  Click on the cells to make moves. The first player is 'X', the second is 'O'.
4.  The game will detect a winner or a draw. You can restart the game at any time.

### Online Multiplayer

1.  Start both the backend (`npm run serve:dev`) and frontend (`npm run dev`) applications.
2.  Open two separate browser tabs or windows and navigate to `http://localhost:5173`.
3.  In each tab, provide a unique username (e.g., "Player1" and "Player2").
4.  **Creating a Room:** In one tab, select "Online Game" -> "Create Room". A unique room ID will be displayed.
5.  **Joining a Room:** In the second tab, select "Online Game" -> "Join Room", then enter the room ID created in the first tab.
6.  Once both players are in the room, the game will begin.
7.  The current player's turn will be indicated.
8.  Make your moves by clicking on the cells.
9.  The game synchronizes moves in real-time.
10. The game will announce the winner or a draw. You can restart the game or return to the lobby.
<!--
## Roadmap

-   [ ] Implement a more robust matchmaking system.
-   [ ] Add a chat feature within game rooms.
-   [ ] Implement a spectator mode for online games.
-   [ ] Improve UI/UX with animations and sound effects.
-   [ ] Add AI opponent for the local game mode.
-   [ ] Persistent user profiles and game statistics.
-   [ ] Dockerize both frontend and backend for easier deployment.
-   [ ] Expand test coverage (unit and end-to-end tests).-->
