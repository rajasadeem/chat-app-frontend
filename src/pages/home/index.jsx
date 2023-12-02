import useChat from "./helper";

const ChatPage = () => {
  const { user, chats, setRoomId, activeChat, userId } = useChat();

  return (
    <div className="flex">
      <div className="border-x-4 border-solid border-black-800">
        {chats?.length > 0
          ? chats?.map((item) => (
              <div
                className="w-[10rem] h-[3rem] border-solid border-l-4 border-r-0 border-y-2 border-black-800 px-12 py-3 cursor-pointer"
                onClick={() => setRoomId(item?.roomId)}
              >
                {item?.receiver}
              </div>
            ))
          : "New here! Send message and start your journey with us"}
      </div>
      <div className="h-screen w-screen flex flex-col p-2">
        <div className="h-90">
          {activeChat?.length > 0 &&
            activeChat?.map((item) => (
              <div
                key={item.id} // Make sure to add a unique key for each item in the array
                className={`flex mb-2 ${
                  item?.sender === userId ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-md p-4 rounded ${
                    item?.sender === userId
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {item?.message}
                </div>
              </div>
            ))}
        </div>
        <input
          className="p-2 border-2 border-solid border-black-800"
          placeholder="Type here..."
        />
      </div>
    </div>
  );
};

export default ChatPage;
