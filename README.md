# Funktoon

This project uses the following technologies:

- Node.js: JavaScript runtime built on Chrome's V8 JavaScript engine.
- Express.js: Web application framework for Node.js.
- TypeScript: Superset of JavaScript which primarily provides optional static typing, classes, and interfaces.
- MySQL: Open-source relational database management system.
- MySQL2: MySQL client for Node.js with focus on performance.
- Zod: TypeScript-first schema declaration and validation library.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need to have Node.js, NPM, and MySQL installed on your machine.

### Installing and Running

1. Clone the repository:

```bash
git clone https://github.com/yourusername/yourrepository.git
```

2. Navigate into the directory:
```bash
cd yourrepository
```

3. Install dependencies:
```bash
npm install
```
4. Run in terminal for database in docker container:
```bash
docker-compose up -d
```
5. Run the server:
```bash
npm start
```

Your server will now be running at: http://localhost:{port}.

ENV:

 sudo systemctl start FunktoonAPI.service

 sudo systemctl daemon-reload
