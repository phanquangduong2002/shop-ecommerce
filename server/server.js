const app = require("./app");

const PORT = 8000;

const server = app.listen(PORT, () => {
  console.log(`Listen to port ${PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => console.log(`Exit server Express`));
});
