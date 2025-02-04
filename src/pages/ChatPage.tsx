import { useEffect, useState } from "react";
import { getMessages, sendMessage } from "../store/slices/chatSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useNavigate } from "react-router-dom";
import "./ChatPage.css";

const ChatPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const messages = useAppSelector((state) => state.chat.messages);
  const filteredMessages = messages.slice().reverse();
  const idInstance = useAppSelector((state) => state.auth.idInstance);
  const apiTokenInstance = useAppSelector(
    (state) => state.auth.apiTokenInstance
  );
  const chatId = useAppSelector((state) => state.auth.chatId);
  const [message, setMessage] = useState("");

  if (!idInstance || !apiTokenInstance) {
    navigate(`/`);
  }
  if (!chatId) {
    navigate(`/contact`);
  }
  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log(new Date().toString());
      dispatch(getMessages({}));
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      await dispatch(sendMessage({ message }));
      setMessage("");
    }
  };
  return (
    <div className="chat-container">
      <div className="chat-window">
        {filteredMessages.map((m) => (
          <div
            key={m.idMessage}
            className={`message ${m.isIncoming ? "incoming" : "outgoing"}`}
          >
            <span className="text">{m.textMessage}</span>
            <span className="timestamp">
              {new Date(m.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        ))}
      </div>
      <form className="input-container" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Введите сообщение..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
};

export default ChatPage;
