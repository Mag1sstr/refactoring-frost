import { IContactsValue } from "../../interfaces/interfaces";
import styles from "./style.module.css";

interface IProps {
  setMainStage: (num: number) => void;
  setCurrentStage: (num: number) => void;
  currentStage: number;
  mainStage: number;
  contactsValue: IContactsValue;
  setContactsValue: (v: IContactsValue) => void;
}

export default function ContactsStage({
  mainStage,
  currentStage,
  setCurrentStage,
  setMainStage,
  contactsValue,
  setContactsValue,
}: IProps) {
  function next() {
    if (
      contactsValue.name?.length &&
      contactsValue.surname?.length &&
      contactsValue.patronymic.length &&
      contactsValue.tel.length &&
      contactsValue.email?.length
    ) {
      setCurrentStage(currentStage + 1);
      setMainStage(mainStage + 1);
    }
  }
  return (
    <>
      <section className={styles.wrapper}>
        <h2>Контактные данные</h2>
        <div className={styles.row}>
          <div className={styles.col}>
            <div className={styles.input}>
              Фамилия
              <input
                value={contactsValue.surname}
                onChange={(e) => {
                  setContactsValue({
                    ...contactsValue,
                    surname: e.target.value,
                  });
                }}
                type="text"
              />
            </div>
            <div className={styles.input}>
              Имя
              <input
                value={contactsValue.name}
                onChange={(e) => {
                  setContactsValue({
                    ...contactsValue,
                    name: e.target.value,
                  });
                }}
                type="text"
              />
            </div>
            <div className={styles.input}>
              Отчество
              <input
                value={contactsValue.patronymic}
                onChange={(e) => {
                  setContactsValue({
                    ...contactsValue,
                    patronymic: e.target.value,
                  });
                }}
                type="text"
              />
            </div>
            <div className={styles.input}>
              Телефон
              <input
                value={contactsValue.tel}
                onChange={(e) => {
                  if (Number(e.target.value)) {
                    setContactsValue({
                      ...contactsValue,
                      tel: e.target.value,
                    });
                  } else {
                    setContactsValue({
                      ...contactsValue,
                      tel: "",
                    });
                  }
                }}
                type="text"
                placeholder="+7 (___) ___ __ __"
              />
            </div>
          </div>
          <div className={styles.line}></div>
          <div className={styles.col}>
            <div className={styles.input}>
              E-mail
              <input
                value={contactsValue.email}
                onChange={(e) => {
                  setContactsValue({
                    ...contactsValue,
                    email: e.target.value,
                  });
                }}
                type="text"
              />
            </div>
          </div>
        </div>
      </section>
      <div className={styles.button}>
        <button onClick={next}>Подтвердить</button>
      </div>
    </>
  );
}
