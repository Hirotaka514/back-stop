import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

// Crear app de Express
const app = express();

// Crear servidor HTTP
const httpServer = createServer(app);

// Configurar Socket.IO con CORS abierto para pruebas
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Permite conexiones desde cualquier frontend
  },
});

// Evento cuando un cliente se conecta
io.on("connection", (socket) => {
  console.log("Jugador conectado:", socket.id);

  // Recibir mensajes del cliente
  socket.on("mensaje", (data) => {
    console.log("Mensaje recibido:", data);
    socket.broadcast.emit("mensaje", data); // Enviar a todos menos al que envió
  });

  // Evento al desconectarse
  socket.on("disconnect", () => {
    console.log("Jugador desconectado:", socket.id);
  });
});

// Ruta de prueba HTTP
app.get("/", (req, res) => {
  res.send("Servidor WebSocket activo 🚀");
});

// Iniciar servidor
httpServer.listen(process.env.PORT || 3001, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT || 3001}`);
});