import {
  isValidPhoneNumber,
  parsePhoneNumberWithError,
} from "libphonenumber-js";
import { IContactsValue } from "../../interfaces/interfaces";
import styles from "./style.module.css";
import { useState } from "react";

interface IProps {
  setMainStage: (num: number) => void;
  setCurrentStage: (num: number) => void;
  currentStage: number;
  mainStage: number;
  contactsValue: IContactsValue;
  setContactsValue: (v: IContactsValue) => void;
}

const EMAIL_REGEXP =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

export default function ContactsStage({
  mainStage,
  currentStage,
  setCurrentStage,
  setMainStage,
  contactsValue,
  setContactsValue,
}: IProps) {
  const [emailError, setEmailError] = useState(false);
  function next() {
    if (
      contactsValue.name?.length &&
      contactsValue.surname?.length &&
      contactsValue.patronymic.length &&
      contactsValue.tel.length &&
      contactsValue.email?.length &&
      !emailError
    ) {
      setCurrentStage(currentStage + 1);
      setMainStage(mainStage + 1);
    }
  }

  function convertPhoneNumber(tel: string) {
    if (isValidPhoneNumber(tel, "RU")) {
      const phone = parsePhoneNumberWithError(tel, "RU");
      return phone.formatNational();
    }
    return tel;
  }

  function isEmailValid(value: string) {
    if (!EMAIL_REGEXP.test(value)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    return value;
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
                      tel: convertPhoneNumber(e.target.value),
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
              {emailError && (
                <div style={{ color: "red" }}>Некорректный email</div>
              )}
              E-mail
              <input
                value={contactsValue.email}
                onChange={(e) => {
                  setContactsValue({
                    ...contactsValue,
                    email: isEmailValid(e.target.value),
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
