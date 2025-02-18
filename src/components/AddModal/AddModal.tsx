import { useEffect, useState } from "react";
import styles from "./style.module.css";

interface IProps {
  openModal: boolean;
  setOpenModal: (bool: boolean) => void;
  name: string;
}
export default function AddModal({ openModal, setOpenModal, name }: IProps) {
  const [count, setCount] = useState(1);

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
          <button onClick={() => {}} className={styles.button}>
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
