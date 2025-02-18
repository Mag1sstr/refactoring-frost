import styles from "./style.module.css";
import image1 from "../../images/ProductInfo/compres.png";
import image2 from "../../images/ProductInfo/1.png";
import image3 from "../../images/ProductInfo/2.png";
import image4 from "../../images/ProductInfo/3.png";
import has from "../../images/ProductInfo/has.svg";
import hasnt from "../../images/ProductInfo/hasnt.svg";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IProduct } from "../../interfaces/interfaces";
import Spinner from "../../components/Spinner/Spinner";
import Comments from "../../components/Comments/Comments";

const imageData = [image1, image2, image3, image4];
export default function ProductInfo() {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [currImage, setCurrImage] = useState(0);
  const { id } = useParams();
  useEffect(() => {
    axios.get(`https://frost.runtime.kz/api/products/${id}`).then((resp) => {
      setProduct(resp.data);
    });
  }, [id]);
  if (!product) {
    return <Spinner />;
  }
  return (
    <section className={styles.product__info}>
      <div className="conteiner">
        <div className={styles.row}>
          <div className={styles.left}>
            <div className={styles.wrapper}>
              <img
                className={styles.image}
                src={imageData[currImage]}
                alt="image"
              />
            </div>
            <div className={styles.images__row}>
              {imageData.map((image, i) => {
                return (
                  <div
                    onClick={() => setCurrImage(i)}
                    key={i}
                    className={styles.images__item}
                  >
                    <img className={styles.item__image} src={image} alt="" />
                  </div>
                );
              })}
            </div>
            <div className={styles.cars}>
              <p>Применим к автомобилям:</p>
              <div className={styles.cars__info}>
                <div className={styles.cars__row}>
                  -
                  <p>
                    {product.brand.name} {product.model.name}
                    {product.generation.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.info}>
              <div className={styles.desc}>
                <h3 className={styles.title}>{product?.name}</h3>
                <p className={styles.desc__text}>
                  <span>Артикул:</span> {product?.code}
                </p>
                <p className={styles.desc__text}>
                  <span>Производитель:</span> {product?.manufacturer}
                </p>
                <p className={styles.desc__text}>
                  <span>Описание:</span> {product?.description}
                </p>
              </div>
              <div className={styles.card__price}>
                <p className={styles.price}>{product?.price} тг</p>
                <div className={styles.available}>
                  <p>
                    <img src={product?.available === 1 ? has : hasnt} alt="" />{" "}
                    в наличии
                  </p>
                  <p>г. Астана</p>
                  <p>г. Алматы</p>
                </div>
                <button className={styles.button}>Купить</button>
              </div>
            </div>
            <Comments id={id} />
          </div>
        </div>
      </div>
    </section>
  );
}
