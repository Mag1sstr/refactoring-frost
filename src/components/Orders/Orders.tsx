import { useEffect, useState } from "react";
import styles from "./style.module.css";
import axios from "axios";
import { IOrdersData } from "../../interfaces/interfaces";

export default function Orders() {
  const [orders, setOrders] = useState<IOrdersData[]>([]);
  useEffect(() => {
    axios.get("https://frost.runtime.kz/api/orders").then((resp) => {
      setOrders(resp.data);
    });
  }, []);
  console.log(orders);

  return (
    <section className={styles.orders}>
      <h3>История заказов</h3>
      <div className={styles.info}>
        <div className={styles.info__row}>
          <p>Номер заказа</p>
          <p>Наименование товара</p>
        </div>
        <div className={styles.info__row}>
          <p>Дата заказа</p>
          <p>Стоимость</p>
        </div>
      </div>
      <div className={styles.column}>
        {orders.map((item) => {
          let totalSum = 0;
          for (const el of item.items) {
            totalSum += el.product.price * el.count;
          }
          return (
            <div className={styles.item}>
              <p className={styles.num}>№{item.id}</p>
              <div className={styles.name}>
                {item.items.map((el) => (
                  <p>{el.product.name}</p>
                ))}
              </div>
              <p className={styles.date}>
                {new Date(item.created_at).toLocaleDateString()}
              </p>
              <p className={styles.price}>{totalSum} тг</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
