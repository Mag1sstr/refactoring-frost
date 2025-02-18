import styles from "./style.module.css";
import mail from "../../images/Footer/Mail.svg";
import insta from "../../images/Footer/Insta.svg";
import tel from "../../images/Footer/Phone.svg";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="conteiner">
        <div className={styles.footer__row}>
          <div className={styles.social}>
            <img src={insta} alt="" />
            frostauto
          </div>
          <div className={styles.social}>
            <img style={{ width: 35 }} src={mail} alt="" />
            frostauto@gmail.com
          </div>
          <div className={styles.social}>
            <img src={tel} alt="" />
            <div className={styles.row}>
              <p className={styles.city}>г. Астана</p>
              <p>+7 777 777 77 77</p>
            </div>
          </div>
          <div className={styles.social}>
            <img src={tel} alt="" />
            <div className={styles.row}>
              <p className={styles.city}>г. Алматы</p>
              <p>+7 777 777 77 77</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
