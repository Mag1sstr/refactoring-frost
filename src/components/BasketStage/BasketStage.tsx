import { useEffect, useState } from "react";
import styles from "./style.module.css";
import axios from "axios";
import { IBasketPageData } from "../../interfaces/interfaces";
import NoProductPage from "../NoProductPage/NoProductPage";

export default function BasketStage() {
  const [products, setProducts] = useState<IBasketPageData[]>([]);
  useEffect(() => {
    axios.get("https://frost.runtime.kz/api/cart").then((resp) => {
      setProducts(resp.data.items);
    });
  }, []);
  const totalPrice = products?.reduce(
    (acc, v) => (acc += v.product.price * v.count),
    0
  );

  if (!products.length) {
    return <NoProductPage />;
  }

  return (
    <>
      <section className={styles.wrapper}>
        <h2>Корзина</h2>
        <div className={styles.info}>
          <p>Наименование товара</p>
          <div className={styles.row}>
            <p>Количество</p>
            <p>Цена</p>
          </div>
        </div>
        <div className={styles.products}>
          {products.map((item) => (
            <div key={item.id} className={styles.item}>
              <div className={styles.name}>
                <p>{item.product.name}</p>
                <div className={styles.delete}>
                  <span>Артикул: {item.product.code}</span>
                  <button>Удалить из корзины</button>
                </div>
              </div>
              <div className={styles.general}>
                <div className={styles.count}>
                  <button>-</button>
                  <p>{item.count}</p>
                  <button>+</button>
                </div>
                <div className={styles.price}>
                  <p>{item.product.price * item.count} тг</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {totalPrice}
      </section>
      <div className={styles.button}>
        <button>Оформить заказ</button>
      </div>
    </>
  );
}
