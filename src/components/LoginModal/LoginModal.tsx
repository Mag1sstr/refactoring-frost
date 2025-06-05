import { useState } from "react";
import styles from "./style.module.css";
import axios from "axios";
import { useAppDispatch } from "../../store/store";
import { setToken } from "../../store/slices/authSlice";
import { toast } from "react-toastify";

interface IProps {
  openLogin: boolean;
  setOpenLogin: (bool: boolean) => void;
  setOpenReg: (bool: boolean) => void;
}
export default function LoginModal({
  openLogin,
  setOpenLogin,
  setOpenReg,
}: IProps) {
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <div
      onMouseDown={() => setOpenLogin(false)}
      className={`${styles.modal} ${openLogin && styles.open__modal}`}
    >
      <div onMouseDown={(e) => e.stopPropagation()} className={styles.form}>
        <div>
          <h1>Вход в учётную запись</h1>
          {error && <div style={{ color: "red" }}>Неверные данные</div>}
          <input
            value={value.email}
            onChange={(e) => setValue({ ...value, email: e.target.value })}
            className={styles.input}
            type="text"
            placeholder="Адрес электронной почты"
          />
          <input
            value={value.password}
            onChange={(e) => setValue({ ...value, password: e.target.value })}
            className={styles.input}
            type="text"
            placeholder="Пароль"
          />
        </div>
        <div>
          <button
            onClick={() => {
              axios
                .post("https://frost.runtime.kz/api/auth/token", {
                  username: value.email,
                  password: value.password,
                })
                .then((resp) => {
                  dispatch(setToken(resp.data.access_token));
                  localStorage.setItem("token", resp.data.access_token);
                  setOpenLogin(false);
                  toast.success("Вы авторизовались");
                })
                .catch((err) => {
                  setError(true);
                  toast.error("Неверные данные");
                  console.log(err);
                });
            }}
            className={styles.button}
          >
            Войти
          </button>
          <button
            onClick={() => {
              setOpenReg(true);
              setOpenLogin(false);
            }}
            className={`${styles.button} ${styles.exit}`}
          >
            Создать новую учётную запись
          </button>
        </div>
      </div>
    </div>
  );
}
