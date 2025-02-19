import { NavLink } from "react-router-dom";
import styles from "./style.module.css";
export default function NoProductPage() {
  return (
    <div className="conteiner">
      <div className={styles.inner}>
        <h1 className={styles.title}>Нет товара в корзине</h1>

        <NavLink to="/" className={styles.home}>
          Вернуться на главную
        </NavLink>
      </div>
    </div>
  );
}
