import { useState } from "react";
import styles from "./style.module.css";
import { useTranslation } from "react-i18next";

export default function Language() {
  const [currentLanguage, setCurrentLanguage] = useState("ru");
  const { i18n } = useTranslation();

  function changeLanguage(language: string) {
    i18n.changeLanguage(language);
    setCurrentLanguage(currentLanguage === "en" ? "ru" : "en");
  }
  return (
    <div
      onClick={() => {
        changeLanguage(currentLanguage === "ru" ? "en" : "ru");
      }}
      className={styles.lang}
    >
      {currentLanguage.toUpperCase()}
    </div>
  );
}
