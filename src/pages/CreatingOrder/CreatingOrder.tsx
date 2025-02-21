import { useState } from "react";
import styles from "./style.module.css";
import BasketStage from "../../components/BasketStage/BasketStage";
import ContactsStage from "../../components/ContactsStage/ContactsStage";
import { IContactsValue } from "../../interfaces/interfaces";
import { useUser } from "../../store/slices/authSlice";
import DeliveryStage from "../../components/DeliveryStage/DeliveryStage";

export default function Basket() {
  const user = useUser();
  const [currentStage, setCurrentStage] = useState(0);
  const [mainStage, setMainStage] = useState(0);
  const [contactsValue, setContactsValue] = useState<IContactsValue>({
    name: user ? user.firstName : "",
    surname: user ? user.lastName : "",
    patronymic: "",
    tel: "",
    email: user ? user.email : "",
  });

  const stages = [
    {
      stage: "Корзина",
      component: (
        <BasketStage
          currentStage={currentStage}
          setCurrentStage={setCurrentStage}
          mainStage={mainStage}
          setMainStage={setMainStage}
        />
      ),
    },
    {
      stage: "Контактные данные",
      component: (
        <ContactsStage
          contactsValue={contactsValue}
          setContactsValue={setContactsValue}
          currentStage={currentStage}
          setCurrentStage={setCurrentStage}
          mainStage={mainStage}
          setMainStage={setMainStage}
        />
      ),
    },
    {
      stage: "Доставка",
      component: <DeliveryStage />,
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
                key={item.stage}
                onClick={() => {
                  if (i < mainStage) {
                    setCurrentStage(i);
                  }
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
        <div>
          {stages.map((item, i) => (
            <div key={item.stage}>{i === currentStage && item.component}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
