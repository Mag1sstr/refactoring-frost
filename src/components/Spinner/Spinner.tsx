import styles from "./style.module.css";
export default function Spinner() {
  return (
    <div className={styles.wrapper}>
      <span className={styles.loader}></span>
    </div>
  );
}
