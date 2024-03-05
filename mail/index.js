const tracer = require("./utils/tracer");
tracer("mail-service");
const app = require("./app");

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server is running : http://localhost:${PORT}`);
});

// TODO: Shutdown the server gracefully
const graceFullShutdown = async (signal) => {
  process.on(signal, () => {
    server.close(() => {
      // TODO: Shutdown the tracer
      sdk
        .shutdown()
        .then(() => {
          // TODO: Send log data to your logging system
          console.log("Tracing Terminated Successfully");
        })
        .catch((err) => {
          // TODO: Send log data to your logging system
          console.log("Error in Tracing Termination", err);
        })
        .finally(() => process.exit(0));
    });
  });
};

const signals = ["SIGTERM", "SIGINT", "SIGQUIT"];

signals.forEach((signal) => {
  graceFullShutdown(signal);
});
