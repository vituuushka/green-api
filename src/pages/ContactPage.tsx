import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { setChatId } from "../store/slices/chatSlice";
import s from "./ContactPage.module.css";

const ContactPage = () => {
  const [contact, setContact] = useState("");
  const idInstance = useAppSelector((state) => state.auth.idInstance);
  const apiTokenInstance = useAppSelector(
    (state) => state.auth.apiTokenInstance
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (contact.trim()) {
      const chatId = `${contact}@c.us`;

      dispatch(setChatId(chatId));
      navigate(`/chat/${contact}`, { state: { contact } });
    }
  };
  if (!idInstance || !apiTokenInstance) {
    navigate(`/`);
  }
  return (
    <div>
      <h2>Введите номер контакта</h2>
      <form className={s.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="79998887766"
          value={contact}
          onChange={(e) => {
            setContact(e.target.value);
          }}
          className={s.input}
        />
        <button type="submit">Начать диалог</button>
      </form>
    </div>
  );
};

export default ContactPage;
