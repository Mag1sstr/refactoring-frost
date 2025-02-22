import styles from "./style.module.css";
import image1 from "../../images/Personal/01.svg";
import image2 from "../../images/Personal/02.svg";
import active1 from "../../images/Personal/01active.svg";
import active2 from "../../images/Personal/02active.svg";

import Orders from "../../components/Orders/Orders";
import { useState } from "react";

const personalStages = [
  {
    text: "Мои заказы",
    img: image1,
    activeImg: active1,
    component: <Orders />,
  },
  {
    text: "Контактные данные",
    img: image2,
    activeImg: active2,
  },
];

export default function PersonalPage() {
  const [currentStage, setCurrentStage] = useState(0);
  return (
    <section className={styles.personal}>
      <div className="conteiner">
        <h2 className={styles.title}>Личный кабинет</h2>
        <div className={styles.row}>
          <div className={styles.left}>
            {personalStages.map((item, i) => (
              <div
                onClick={() => setCurrentStage(i)}
                key={item.text}
                className={`${styles.left__item} ${
                  currentStage === i && styles.active
                }`}
              >
                <img
                  src={currentStage === i ? item.activeImg : item.img}
                  alt=""
                />
                {item.text}
              </div>
            ))}
          </div>

          {personalStages.map((item, i) => {
            return (
              currentStage === i && <div key={item.text}> {item.component}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
