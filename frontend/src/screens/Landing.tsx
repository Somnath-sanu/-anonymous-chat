/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useSocket } from "../hooks/useSocket";
import { useEffect, useMemo, useState } from "react";

export const Landing = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  const socket = useSocket();
  console.log(socket);

  useMemo(() => {
    if (!socket) {
      return;
    }

    const handleMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      
      if (data.message) {
        // alert(data.message)
        console.log(data.message);
        setLoading(false);
        navigate("/chat");
      }
    };

    socket.addEventListener("message", handleMessage);

    return () => {
      socket.removeEventListener("message", handleMessage);
    }
  }, [socket , navigate]);
  return (
    <div className="bg-[rgb(16,15,25)] grid grid-cols-1 md:grid-cols-2 gap-6 select-none min-h-screen min-w-screen-lg">
      <div className="text-white p-4 mr-4 flex flex-col gap-4 items-center w-full ">
        <div className="p-32">
          <h1 className="text-5xl font-extrabold font-serif">
            Talk to strangers, Make friends!
          </h1>
          <p className="pt-7 font-mono tracking-wide whitespace-break-spaces">
            Experience a random chat alternative to find friends, connect with
            people, and chat with strangers from all over the world!
          </p>

          <button
            className={`bg-[rgb(78,70,228)] px-4 py-2 rounded-lg w-full my-10 mx-auto ${loading ? `bg-[rgb(42,38,119)] ` : `hover:bg-[rgb(106,101,246)]`} shadow-md overflow-hidden  font-sans font-medium`}
            disabled={loading}
            onClick={() => {
              setLoading(true);
              socket?.send(
                JSON.stringify({
                  type: "init_chat",
                })
              );
            }}
          >
            {loading ? " Waiting..." : "Text chat"}
          </button>
        </div>
      </div>
      <div className=" flex justify-center items-center flex-col ">
        <div className="aspect-square  rounded w-fit shadow-sm">
          <div className="relative rounded border-none outline-none">
            <img
              src="https://www.chitchat.gg/_astro/woman-selfie.82e28300_1Ozara.webp"
              alt=""
              className="object-contain rounded overflow-hidden"
            />
            <img
              src="https://www.chitchat.gg/_astro/user_message.8f2137e3_Z2uBwg3.webp"
              alt=""
              className="w-44 absolute top-28 -left-36 overflow-hidden drop-shadow-lg"
            />
            <img
              src="https://www.chitchat.gg/_astro/newnotification.b0398330_Z1PHmfD.svg"
              alt=""
              className="w-32 absolute -top-2 -left-28 overflow-hidden drop-shadow-lg"
            />
          </div>
          <div className="border-blue-300 border-none outline-none">
            <img
              src="https://www.chitchat.gg/_astro/man-selfie.1c175fd1_1MhJ6q.webp"
              alt=""
              className="rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
