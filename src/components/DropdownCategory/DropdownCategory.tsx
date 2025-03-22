import styles from "./style.module.css";
import arrowImg from "../../images/Categories/arrow.svg";
import { useEffect, useState } from "react";
import { IItems } from "../../interfaces/interfaces";

interface IProps {
  name: string;
  title: string;
  items: IItems[];
  onChange?: (id: number | string) => void;
}
export default function DropdownCategory({
  name,
  title,
  items,
  onChange,
}: IProps) {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(title);
  const [data, setData] = useState(items);

  useEffect(() => {
    setData([{ id: "all", name: title }, ...items]);
    setCategory(title);
  }, [items, title]);
  function openToggle() {
    setOpen(!open);
  }
  return (
    <div>
      <h3 className={styles.name}>{name}</h3>
      <div
        onClick={openToggle}
        className={`${styles.drop} ${open && styles.open}`}
      >
        <div className={styles.item}>
          {category} <img src={arrowImg} alt="" />
        </div>
        <div className={styles.drop__items}>
          {items &&
            data.map((brand) => (
              <div
                key={brand.id}
                onClick={() => {
                  setCategory(brand.name);
                  onChange!(brand.id);
                }}
                className={styles.item}
              >
                {brand.name}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
