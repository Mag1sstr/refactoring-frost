import axios from "axios";
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import Products from "../../components/Products/Products";
import Spinner from "../../components/Spinner/Spinner";

export default function SearchPage() {
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://frost.runtime.kz/api/products?page=${1}&size=17&available=${0}`
      )
      .then((resp) => {
        setProductData(resp.data.items);
      });
  }, []);

  if (!productData.length) {
    return <Spinner />;
  }
  return (
    <section className={styles.search}>
      <div className="conteiner">
        {/* <h1 className={styles.title}>Поиск</h1> */}
        <div className={styles.row}>
          <Products productData={productData} />
        </div>
      </div>
    </section>
  );
}
