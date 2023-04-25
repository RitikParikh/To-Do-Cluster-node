const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('./lib/db');
const numCPUs = require('os').cpus().length;
const cluster = require('cluster');

// Check if running in the master process
if (cluster.isMaster) {
  console.log(`Master process ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Listen for workers to come online
  cluster.on('online', (worker) => {
    console.log(`Worker process ${worker.process.pid} is online`);
  });

  // Listen for workers to exit
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker process ${worker.process.pid} has died`);
    console.log(`Starting a new worker...`);
    cluster.fork();
  });
} else {
  // Use body parser middleware
  app.use(bodyParser.json());

  // Routes
  const taskRoutes = require('./routes/taskRoutes');
  app.use(taskRoutes);

  // Handle 404 Not Found
  app.use((req, res) => {
    res.status(404).json({ message: '404 Not Found' });
  });

  // Listen for incoming connections
  const port = process.env.PORT || 3002;
  app.listen(port, () => {
    console.log(`Worker process ${process.pid} is listening on port ${port}`);
  });
}
