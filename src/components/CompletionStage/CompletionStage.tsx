import styles from "./style.module.css";
import checkImage from "../../images/Completion/check.svg";

interface IProps {
  orderNumber: number | null;
}
export default function CompletionStage({ orderNumber }: IProps) {
  return (
    <section className={styles.wrapper}>
      <h2>Заказ успешно создан</h2>
      <div className={styles.row}>
        <div className={styles.text}>
          <img src={checkImage} alt="" />
          Заказ №{orderNumber} был создан. Вы можете просмотреть список всех
          ваших заказов в личном кабинете.
        </div>
        <button className={styles.link}>Перейти в личный кабинет</button>
      </div>
    </section>
  );
}
