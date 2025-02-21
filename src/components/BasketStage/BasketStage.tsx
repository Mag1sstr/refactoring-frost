import { useEffect, useState } from "react";
import styles from "./style.module.css";
import axios from "axios";
import { IBasketPageData } from "../../interfaces/interfaces";
import NoProductPage from "../NoProductPage/NoProductPage";

interface IProps {
  setMainStage: (num: number) => void;
  setCurrentStage: (num: number) => void;
  currentStage: number;
  mainStage: number;
}

export default function BasketStage({
  setMainStage,
  setCurrentStage,
  currentStage,
  mainStage,
}: IProps) {
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

  function increase(id: number) {
    const newArr = products.map((p) => {
      if (p.product.id === id) {
        return {
          ...p,
          count: p.count + 1,
        };
      }
      return p;
    });
    setProducts(newArr);
    axios.get(`https://frost.runtime.kz/api/cart/increase?productId=${id}`);
  }
  function decrease(id: number) {
    const newArr = products.map((p) => {
      if (p.product.id === id && p.count > 1) {
        axios.get(`https://frost.runtime.kz/api/cart/decrease?productId=${id}`);
        return {
          ...p,
          count: p.count - 1,
        };
      }
      return p;
    });
    setProducts(newArr);
  }
  function deleteProduct(id: number) {
    setProducts(products.filter((c) => c.product.id !== id));
    axios.get(`https://frost.runtime.kz/api/cart/delete?productId=${id}`);
  }
  function next() {
    setCurrentStage(currentStage + 1);
    setMainStage(2);
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
            <div key={item.product.id} className={styles.item}>
              <div className={styles.name}>
                <p>{item.product.name}</p>
                <div className={styles.delete}>
                  <span>Артикул: {item.product.code}</span>
                  <button onClick={() => deleteProduct(item.product.id)}>
                    Удалить из корзины
                  </button>
                </div>
              </div>
              <div className={styles.general}>
                <div className={styles.count}>
                  <button onClick={() => decrease(item.product.id)}>-</button>
                  <p>{item.count}</p>
                  <button onClick={() => increase(item.product.id)}>+</button>
                </div>
                <div className={styles.price}>
                  <p>{item.product.price * item.count} тг</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.total}>
          Итого к оплате: <span>{totalPrice} тг</span>
        </div>
      </section>
      <div className={styles.button}>
        <button onClick={next}>Оформить заказ</button>
      </div>
    </>
  );
}
