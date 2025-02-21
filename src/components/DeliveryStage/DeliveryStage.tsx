import axios from "axios";
import { IDeliveryValue } from "../../interfaces/interfaces";
import styles from "./style.module.css";
import { useState } from "react";
import Spinner from "../Spinner/Spinner";

interface IProps {
  setMainStage: (num: number) => void;
  setCurrentStage: (num: number) => void;
  currentStage: number;
  mainStage: number;
  deliveryValue: IDeliveryValue;
  setDeliveryValue: (v: IDeliveryValue) => void;
  tel: string;
  setOrderNumber: (num: number) => void;
}

export default function DeliveryStage({
  deliveryValue,
  setDeliveryValue,
  currentStage,
  setCurrentStage,
  mainStage,
  setMainStage,
  tel,
  setOrderNumber,
}: IProps) {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <Spinner />;
  }

  function next() {
    if (
      deliveryValue.apartment.length &&
      deliveryValue.city.length &&
      deliveryValue.house.length &&
      deliveryValue.region.length &&
      deliveryValue.street.length
    ) {
      setLoading(true);
      axios
        .post("https://frost.runtime.kz/api/orders", {
          phone: tel,
          area: deliveryValue.region,
          city: deliveryValue.city,
          street: deliveryValue.street,
          house: deliveryValue.house,
          apartment: deliveryValue.apartment,
        })
        .then((resp) => {
          setOrderNumber(resp.data);
          setCurrentStage(currentStage + 1);
          setMainStage(mainStage + 1);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }
  return (
    <>
      <section className={styles.wrapper}>
        <h2>Доставка</h2>
        <div className={styles.row}>
          <div className={styles.col}>
            <div className={styles.input}>
              Область
              <input
                value={deliveryValue.region}
                onChange={(e) =>
                  setDeliveryValue({ ...deliveryValue, region: e.target.value })
                }
                type="text"
              />
            </div>
            <div className={styles.input}>
              Город или поселок
              <input
                value={deliveryValue.city}
                onChange={(e) =>
                  setDeliveryValue({ ...deliveryValue, city: e.target.value })
                }
                type="text"
              />
            </div>
          </div>
          <div className={styles.line}></div>
          <div className={styles.col}>
            <div className={styles.input}>
              Улица
              <input
                value={deliveryValue.street}
                onChange={(e) =>
                  setDeliveryValue({ ...deliveryValue, street: e.target.value })
                }
                type="text"
              />
            </div>
            <div className={styles.adress}>
              <div className={styles.input}>
                Дом
                <input
                  value={deliveryValue.house}
                  onChange={(e) =>
                    setDeliveryValue({
                      ...deliveryValue,
                      house: e.target.value,
                    })
                  }
                  type="text"
                />
              </div>
              <div className={styles.input}>
                Квартира
                <input
                  value={deliveryValue.apartment}
                  onChange={(e) =>
                    setDeliveryValue({
                      ...deliveryValue,
                      apartment: e.target.value,
                    })
                  }
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className={styles.button}>
        <button onClick={next}>Подтвердить</button>
      </div>
    </>
  );
}
