import { useState } from "react";
import styles from "./style.module.css";
import BasketStage from "../../components/BasketStage/BasketStage";

export default function Basket() {
  const [currentStage, setCurrentStage] = useState(0);
  const stages = [
    {
      stage: "Корзина",
      component: <BasketStage />,
    },
    {
      stage: "Контактные данные",
    },
    {
      stage: "Доставка",
    },
    {
      stage: "Завершение",
    },
  ];
  return (
    <section className={styles.order}>
      <div className="conteiner">
        <div className={styles.stages}>
          <h1 className={styles.title}>Оформление заказа</h1>
          <div className={styles.row}>
            {stages.map((item, i) => (
              <div
                onClick={() => {
                  setCurrentStage(i);
                }}
                className={`${styles.stage} ${
                  currentStage === i && styles.active
                }`}
              >
                {item.stage}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
