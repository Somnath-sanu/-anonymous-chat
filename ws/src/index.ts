import { WebSocketServer } from "ws";
import { ChatRoomManager } from "./chatRoom";

const wss = new WebSocketServer({ port: 8080 });

const chatRoom = new ChatRoomManager();

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  chatRoom.addMember(ws);

  ws.on("disconnect", () => {
    chatRoom.removeMember(ws);
    
  });

  ws.on("message", function message(data) {
    const message = data.toString(); //convert buffer to string
    // ws.send(message);
    console.log("Received %s", data);
  });

  ws.send(JSON.stringify({ type: "connected" }));
  console.log("New WebSocket connection established");
});
