import styles from "../../components/Header/style.module.css";
export default function ContactsHeader() {
  return (
    <div className={styles.contacts}>
      <div className={styles.city}>
        <p>г. Астана</p>
        <p>г. Алматы</p>
      </div>
      <div className={styles.number}>
        <p>+7 777 777 77 77</p>
        <p>+7 777 777 77 77</p>
      </div>
    </div>
  );
}
