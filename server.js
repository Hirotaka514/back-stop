import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*", // permite conexión desde cualquier origen (React en local o Vercel)
  },
});

io.on("connection", (socket) => {
  console.log("Jugador conectado:", socket.id);

  // Mensajes de chat
  socket.on("mensaje", (data) => {
    console.log("Mensaje recibido:", data);
    socket.broadcast.emit("mensaje", data);
  });

  // Movimiento del cuadrado
  socket.on("mover", (pos) => {
    console.log("Movimiento recibido:", pos);
    socket.broadcast.emit("mover", pos);
  });

  socket.on("disconnect", () => {
    console.log("Jugador desconectado:", socket.id);
  });
});

app.get("/", (req, res) => {
  res.send("Servidor WebSocket activo 🚀");
});

// Usar el puerto asignado por Render o 3001 en local
httpServer.listen(process.env.PORT || 3001, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT || 3001}`);
});
