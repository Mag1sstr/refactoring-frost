import styles from "./style.module.css";
import stubImage from "../../images/stub.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import AddModal from "../AddModal/AddModal";
import { useTranslation } from "react-i18next";

interface IProps {
  id: number;
  name: string;
  price: number;
  available: number;
}
export default function Card({ name, price, id, available }: IProps) {
  const [openModal, setOpenModal] = useState(false);
  const { t } = useTranslation();
  return (
    <div className={styles.card}>
      <AddModal
        id={id}
        available={available}
        name={name}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
      <Link className={styles.link} to={`/product/${id}`}>
        <div style={{ textAlign: "center" }}>
          <img className={styles.image} src={stubImage} alt="" />
        </div>
        <p className={styles.card__text}>{name}</p>
      </Link>
      <div className={styles.card__row}>
        <p className={styles.card__price}>{price} тг</p>
        <button onClick={() => setOpenModal(true)} className={styles.card__btn}>
          {t("buy")}
        </button>
      </div>
    </div>
  );
}
