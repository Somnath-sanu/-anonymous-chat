import { WebSocket } from "ws";

export class Chat {
  public member1: WebSocket;
  public member2: WebSocket;
  private startTime: Date;

  constructor(member1: WebSocket, member2: WebSocket) {
    this.member1 = member1;
    this.member2 = member2;
    this.startTime = new Date();

    this.member1.send(
      JSON.stringify({
        message: "Anonymous user connected",
        startTime: this.startTime,
      })
    );

    this.member2.send(
      JSON.stringify({
        message: "Anonymous user connected",
        startTime: this.startTime,
      })
    );
  }

  messages(socket: WebSocket, talk: string) {
    console.log("Messages received");
    
    if (socket === this.member1) {
      this.member2.send(
        JSON.stringify({
          message: talk,
        })
      );
      console.log("send to member2 ",talk);
      
    } else {
      this.member1.send(
        JSON.stringify({
          message: talk,
        })
      );
      console.log("send to member1",talk);
    }
  }

  handleDisconnect(socket: WebSocket) {
    const message = "User disconnected";

    if (socket === this.member1) {
      this.member2.send(JSON.stringify({ message }));
    } else {
      this.member1.send(JSON.stringify({ message }));
    }
  }
}
