import Server from "./server";

// Web server's working port env variable
const PORT: Number = Number(process.env.PORT || 3000);

Server.listen(PORT, () => {
  console.log(`Web client server listening @ http://localhost:${PORT}`);
});
