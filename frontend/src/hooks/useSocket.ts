/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useMemo, useState } from "react";

const WS_URL = "ws://localhost:8080";

export const useSocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      console.log("Connected");

      setSocket(ws);
    };

    ws.onclose = () => {
      console.log("Disconnected");
      setSocket(null);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onmessage = (event) => {
      console.log(JSON.parse(event.data));
    };

    return () => {
      ws.close();
    };
  }, []);

  return socket;
};
