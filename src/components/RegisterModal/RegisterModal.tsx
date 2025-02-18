import { useState } from "react";
import styles from "./style.module.css";
import axios from "axios";
import { toast } from "react-toastify";

interface IProps {
  openReg: boolean;
  setOpenReg: (bool: boolean) => void;
  setOpenLogin: (bool: boolean) => void;
}
export default function RegisterModal({
  openReg,
  setOpenReg,
  setOpenLogin,
}: IProps) {
  const [value, setValue] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    rep_password: "",
  });
  const [passwordError, setPasswordError] = useState(false);

  return (
    <div
      onClick={() => setOpenReg(false)}
      className={`${styles.modal} ${openReg && styles.open__modal}`}
    >
      <div onClick={(e) => e.stopPropagation()} className={styles.form}>
        <div>
          <h1>Создание учётной записи</h1>
          <div className={styles.row}>
            <input
              value={value.name}
              onChange={(e) => setValue({ ...value, name: e.target.value })}
              className={styles.input}
              type="text"
              placeholder="Имя"
            />
            <input
              value={value.surname}
              onChange={(e) => setValue({ ...value, surname: e.target.value })}
              className={styles.input}
              type="text"
              placeholder="Фамилия"
            />
          </div>
          <input
            value={value.email}
            onChange={(e) => setValue({ ...value, email: e.target.value })}
            className={styles.input}
            type="text"
            placeholder="Адрес электронной почты"
          />
          {passwordError && (
            <div className={styles.err}>Пароли не совпадают</div>
          )}
          <input
            value={value.password}
            onChange={(e) => setValue({ ...value, password: e.target.value })}
            className={styles.input}
            type="text"
            placeholder="Пароль"
          />
          <input
            value={value.rep_password}
            onChange={(e) =>
              setValue({ ...value, rep_password: e.target.value })
            }
            className={styles.input}
            type="text"
            placeholder="Повторите пароль"
          />
        </div>
        <div>
          <button
            onClick={() => {
              if (value.password !== value.rep_password) {
                return setPasswordError(true);
              }
              axios
                .post("https://frost.runtime.kz/api/registration", {
                  first_name: value.name,
                  last_name: value.surname,
                  email: value.email,
                  password: value.password,
                })
                .then((resp) => {
                  console.log(resp);
                  setOpenReg(false);
                  toast.success("Вы зарегистрировались");
                })
                .catch(() => {
                  toast.error("Неверные данные");
                });
            }}
            className={styles.button}
          >
            Зарегистрироваться
          </button>
          <button
            onClick={() => {
              setOpenLogin(true);
              setOpenReg(false);
            }}
            className={`${styles.button} ${styles.exit}`}
          >
            Войти в существующую учётную запись
          </button>
        </div>
      </div>
    </div>
  );
}
