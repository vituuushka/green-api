import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/hooks";
import { setCredentials } from "../store/slices/chatSlice";
import s from "./AuthPage.module.css";

const AuthPage = () => {
  const [idInstance, setIdInstance] = useState<number | undefined>();
  const [apiTokenInstance, setApiTokenInstance] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.value.trim();
    if (id) {
      setIdInstance(Number(id));
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (idInstance && apiTokenInstance.trim()) {
      dispatch(setCredentials({ idInstance, apiTokenInstance }));

      navigate("/contact");
    }
  };
  return (
    <div>
      <h2>Авторизация</h2>
      <form className={s.form} onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Введите idInstance"
          value={idInstance}
          onChange={handleChange}
          className={s.input}
        />
        <input
          type="text"
          placeholder="Введите apiTokenInstance"
          value={apiTokenInstance}
          onChange={(e) => {
            setApiTokenInstance(e.target.value);
          }}
          className={s.input}
        />
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default AuthPage;
