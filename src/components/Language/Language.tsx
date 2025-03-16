import { useState } from "react";
import styles from "./style.module.css";

interface IProps {
  currentLanguage: string;
  setCurrentLanguage: (lang: string) => void;
  changeLanguage: (lang: string) => void;
}
export default function Language({
  currentLanguage,
  setCurrentLanguage,
  changeLanguage,
}: IProps) {
  return (
    <div
      onClick={() => {
        changeLanguage(currentLanguage === "EN" ? "RU" : "EN");
        setCurrentLanguage(currentLanguage === "EN" ? "RU" : "EN");
      }}
      className={styles.lang}
    >
      {currentLanguage}
    </div>
  );
}
