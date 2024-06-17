import { WebSocket } from "ws";
import { INIT_CHAT, MESSAGE } from "./constants";
import { Chat } from "./chat";

export class ChatRoomManager {
  private pendingMember: WebSocket | null;
  private members: WebSocket[];
  private chatRooms: Chat[];

  constructor() {
    this.pendingMember = null;
    this.members = [];
    this.chatRooms = [];
  }

  addMember(socket: WebSocket) {
    this.members.push(socket);
    this.addHandler(socket);
    console.log("Member added. Current members:", this.members.length);
  }

  removeMember(socket: WebSocket) {
    this.members = this.members.filter((member) => member != socket);
    console.log("Member removed. Current members:", this.members.length);

    // const chat = this.chatRooms.find(
    //   (chat) => chat.member1 === socket || chat.member2 === socket
    // );

    // if (chat) {
    //   chat.handleDisconnect(socket);
    //   this.chatRooms = this.chatRooms.filter((c) => c != chat);
    //   console.log("Chat room removed. Current chat rooms:", this.chatRooms.length);
    // }
  }

  private addHandler(socket: WebSocket) {
    socket.on("message", (data) => {
      const message = JSON.parse(data.toString());
      console.log("Received message:", message);

      if (message.type === INIT_CHAT) {
        if (this.pendingMember) {
          //* start the chat
          console.log("Got both member");

          const chat = new Chat(socket, this.pendingMember);
          console.log(
            "Chat initialized between:",
            socket.eventNames,
            "and",
            this.pendingMember.eventNames
          );
          console.log(socket === this.pendingMember);

          console.log("chat.member1 :", chat.member1 === socket);
          console.log("chat.member2 :", chat.member2 === socket);

          this.chatRooms.push(chat);
          console.log("Chat-rooms :", this.chatRooms.length);

          this.pendingMember = null;
        } else {
          console.log("Set to pending user");

          this.pendingMember = socket;
        }
      } else if (message.type === MESSAGE) {
        console.log("Inside message type");

        // this.chatRooms.map((chat) => {
        //   chat.messages(socket, message.talk);
        // });

        const chat = this.chatRooms.find(
          (chat) => chat.member1 === socket || chat.member2 === socket
        );

        console.log("chat room found", chat);

        if (chat) {
          chat.messages(socket, message.talk);
        }else {
          console.error("Chat room not found for socket:", socket.eventNames);
        }
      }
    });

    socket.on("close", () => {
      this.removeMember(socket);
    });
  }
}
