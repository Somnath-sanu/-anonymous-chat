import {  useMemo, useState } from "react";
import { useSocket } from "../hooks/useSocket";
import { useNavigate } from "react-router-dom";

interface MESSAGE {
  self?: boolean;
  type: string;
  talk: string;
}

export const Chat = () => {
  const [messages, setMessages] = useState<MESSAGE[]>([]);
  const [input, setInput] = useState<string>("");

  const navigate = useNavigate();

  const socket: WebSocket | null = useSocket();

  console.log(messages);
  

  useMemo(() => {
    if (!socket) return;

    console.log("WebSocket connection established");

    const handleMessage = (event: MessageEvent) => {
      console.log(event);
      
      const message = JSON.parse(event.data);
      console.log("Message from ws:", message);

      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.addEventListener("message", handleMessage);

    socket.onmessage = (event) => {
      console.log(event);
      
    }

    return () => {
      // console.log("WebSocket connection closed");
      socket.removeEventListener("message", handleMessage);
      socket.close();
    };
  }, [socket]);

  const sendMessage = () => {
    if (!socket || input.trim() === "") return;

    const message = {
      type: "message",
      talk: input,
    };

    // console.log("Sending message to WebSocket:", message);
    socket.send(JSON.stringify(message));
    // console.log("Message sent successfully");

    setMessages((prevMessages) => [
      ...prevMessages,
      { ...message, self: true },
    ]);
    setInput("");
  };

  return (
    <div className="bg-[rgb(46,47,56)] min-w-screen-lg h-screen relative">
      <div className="w-full h-[90%] flex justify-end items-end flex-col gap-2 p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`text-white px-4 py-2 rounded-xl ${
              msg.self
                ? `bg-blue-500 self-end rounded-tl-none`
                : `bg-blue-700 self-start rounded-tr-none`
            }`}
          >
            {msg.talk}
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 min-w-full flex flex-row-reverse justify-center p-4 gap-4">
        <div className="w-[50%] drop-shadow-lg text-white">
          <input
            type="text"
            placeholder="Send a message"
            className="py-2 w-full bg-[rgb(65,65,72)] rounded px-2 border-none outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
        </div>
        <div className="  flex justify-center gap-3 flex-row-reverse">
          <button className="text-white bg-[rgb(100,75,181)]  px-2 py-2 rounded" onClick={sendMessage}>
            Send
          </button>
          <button className="text-white bg-[rgb(100,75,181)]  px-2 py-2 rounded" onClick={() => {
            socket?.close();
            navigate("/")
          }}>
            Exit
          </button>
        </div>
      </div>
    </div>
  );
};
