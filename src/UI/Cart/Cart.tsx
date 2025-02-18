import styles from "../../components/Header/style.module.css";
import cartImage from "../../images/Header/cart.svg";
export default function Cart() {
  return (
    <div className={styles.cart}>
      <img className={styles.cart__img} src={cartImage} alt="cart" />
      <div className={styles.cart__circle}>2</div>
    </div>
  );
}
