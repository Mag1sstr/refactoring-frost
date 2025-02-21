import styles from "./style.module.css";

export default function DeliveryStage() {
  return (
    <>
      <section className={styles.wrapper}>
        <h2>Доставка</h2>
        <div className={styles.row}>
          <div className={styles.col}>
            <div className={styles.input}>
              Область
              <input type="text" />
            </div>
            <div className={styles.input}>
              Город или поселок
              <input type="text" />
            </div>
          </div>
          <div className={styles.line}></div>
          <div className={styles.col}>
            <div className={styles.input}>
              Улица
              <input type="text" />
            </div>
            <div className={styles.adress}>
              <div className={styles.input}>
                Дом
                <input type="text" />
              </div>
              <div className={styles.input}>
                Квартира
                <input type="text" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className={styles.button}>
        <button>Подтвердить</button>
      </div>
    </>
  );
}
