import { useSelector } from "react-redux";

const ChatPage = () => {
  const user = useSelector((state) => state?.user?.user_data);
  return (
    <div>
      <h1>{`Welcome ${user?.name}`}</h1>
    </div>
  );
};

export default ChatPage;
