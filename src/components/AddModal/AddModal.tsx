import { useEffect, useState } from "react";
import styles from "./style.module.css";
import { useUser } from "../../store/slices/authSlice";
import axios from "axios";
import { toast } from "react-toastify";

interface IProps {
  openModal: boolean;
  setOpenModal: (bool: boolean) => void;
  name: string;
  available: number;
  id: number;
}
export default function AddModal({
  openModal,
  setOpenModal,
  name,
  available,
  id,
}: IProps) {
  const [count, setCount] = useState(1);
  const [userError, setUserError] = useState(false);
  const [availableError, setAvailableError] = useState(false);
  const user = useUser();

  document.onkeydown = (e) => {
    if (e.key === "ArrowLeft") {
      if (count > 1) {
        setCount(count - 1);
      }
    }
    if (e.key === "ArrowRight") {
      setCount(count + 1);
    }
  };

  return (
    <div
      onClick={() => setOpenModal(false)}
      className={`${styles.modal} ${openModal && styles.open__modal}`}
    >
      <div onClick={(e) => e.stopPropagation()} className={styles.form}>
        <h1>Добавление в корзину</h1>
        <p>{name}</p>

        {userError && <div style={{ color: "red" }}>Вы не авторизованы</div>}
        {availableError && <div style={{ color: "red" }}>Нет в наличии</div>}
        <div className={styles.row}>
          Укажите количество:
          <div className={styles.count}>
            <button
              onClick={() => {
                if (count > 1) {
                  setCount(count - 1);
                }
              }}
            >
              -
            </button>
            <div>{count}</div>
            <button onClick={() => setCount(count + 1)}>+</button>
          </div>
        </div>
        <div>
          <button
            onClick={() => {
              if (!user) {
                return setUserError(true);
              }
              if (available == 0) {
                return setAvailableError(true);
              } else {
                axios.get(
                  `https://frost.runtime.kz/api/cart/add?productId=${id}&count=${count}`
                );
                setOpenModal(false);
                toast.success("Добавлено в корзину");
              }
            }}
            className={styles.button}
          >
            Добавить в корзину
          </button>
          <button className={`${styles.button} ${styles.exit}`}>
            Продолжить выбор товаров
          </button>
        </div>
      </div>
    </div>
  );
}
