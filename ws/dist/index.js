"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const chatRoom_1 = require("./chatRoom");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const chatRoom = new chatRoom_1.ChatRoomManager();
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
