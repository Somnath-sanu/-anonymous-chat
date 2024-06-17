"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
class Chat {
    constructor(member1, member2) {
        this.member1 = member1;
        this.member2 = member2;
        this.startTime = new Date();
        this.member1.send(JSON.stringify({
            message: "Anonymous user connected",
            startTime: this.startTime,
        }));
        this.member2.send(JSON.stringify({
            message: "Anonymous user connected",
            startTime: this.startTime,
        }));
    }
    messages(socket, talk) {
        console.log("Messages received");
        if (socket === this.member1) {
            this.member2.send(JSON.stringify({
                message: talk,
            }));
            console.log("send to member2 ", talk);
        }
        else {
            this.member1.send(JSON.stringify({
                message: talk,
            }));
            console.log("send to member1", talk);
        }
    }
    handleDisconnect(socket) {
        const message = "User disconnected";
        if (socket === this.member1) {
            this.member2.send(JSON.stringify({ message }));
        }
        else {
            this.member1.send(JSON.stringify({ message }));
        }
    }
}
exports.Chat = Chat;
