import { useTranslation } from "react-i18next";
import styles from "../../components/Header/style.module.css";
export default function ContactsHeader() {
  const { t } = useTranslation();
  return (
    <div className={styles.contacts}>
      <div className={styles.city}>
        <p>{t("astana")}</p>
        <p>{t("almaty")}</p>
      </div>
      <div className={styles.number}>
        <p>+7 777 777 77 77</p>
        <p>+7 777 777 77 77</p>
      </div>
    </div>
  );
}
