import InputField from "../../components/InputField";
import Button from "../../components/button";
import Loader from "../../components/loader";
import useChat from "./helper";

const ChatPage = () => {
  const {
    chats,
    setRoomId,
    activeChat,
    userId,
    loading,
    setSearchParam,
    queryParam,
    chatContainerRef,
    onChangeMessageHandler,
    sendMessageHandler,
    message,
  } = useChat();

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex w-screen">
          <div className="border-x-4 border-solid border-black-800 w-1/5">
            {chats?.length > 0 &&
              chats?.map((item) => (
                <div
                  className=" w-full h-[4rem] flex justify-center items-center border-solid border-l-4 border-r-0 border-y-2 border-black-800 cursor-pointer"
                  onClick={() => {
                    setRoomId(item?.roomId);
                    setSearchParam({ roomId: item?.roomId });
                  }}
                >
                  <div className="flex flex-col">
                    <div className="text-gray-600">{item?.receiver}</div>
                    {/* <div className="text-xs">
                      {" "}
                      {item?.lastMessage.sender !== userId
                        ? item?.receiver + ":" + item.lastMessage?.message
                        : "You:" + item?.lastMessage?.message}{" "}
                    </div> */}
                  </div>
                </div>
              ))}
          </div>
          {queryParam ? (
            <div className="h-screen w-4/5 flex flex-col p-2">
              <div className="flex-grow overflow-auto" ref={chatContainerRef}>
                {activeChat?.length > 0 &&
                  activeChat?.map((item) => (
                    <div
                      key={item.id}
                      className={`flex mb-2 ${
                        item?.sender === userId
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`p-4 rounded ${
                          item?.sender === userId
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                        style={{
                          maxWidth: "80%",
                          flexShrink: 1,
                          wordWrap: "break-word",
                        }}
                      >
                        {item?.message}
                      </div>
                    </div>
                  ))}
              </div>
              <div className="flex">
                <InputField
                  className={"w-5/6"}
                  customStyle={"h-[4rem] text-lg"}
                  placeholder={"Type here..."}
                  value={message}
                  onChange={onChangeMessageHandler}
                  onKeyDown={(e) => e?.key === "Enter" && sendMessageHandler()}
                />
                <Button
                  className={"w-1/6 h-[4rem] text-lg"}
                  onClick={sendMessageHandler}
                >
                  Send
                </Button>
              </div>
            </div>
          ) : (
            <div className="h-screen w-4/5 flex justify-center items-center">
              <h1 className="text-5xl font-extrabold text-gray-600">
                Welcome to ChatApp
              </h1>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ChatPage;
