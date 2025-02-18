import { useNavigate } from "react-router-dom";
import styles from "../../components/Header/style.module.css";
import cartImage from "../../images/Header/cart.svg";
export default function Cart() {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate("/basket")} className={styles.cart}>
      <img className={styles.cart__img} src={cartImage} alt="cart" />
      <div className={styles.cart__circle}>2</div>
    </div>
  );
}
