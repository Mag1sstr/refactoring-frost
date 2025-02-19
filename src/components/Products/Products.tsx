import { IProductData } from "../../interfaces/interfaces";
import { useAppSelector } from "../../store/store";
import Card from "../Card/Card";
import styles from "./style.module.css";

interface IProps {
  productData: IProductData[];
}
export default function Products({ productData }: IProps) {
  const searchValue = useAppSelector((state) => state.search.searchValue);
  return (
    <div className={styles.row}>
      {productData
        ?.filter((c) =>
          c.name.toLowerCase().trim().includes(searchValue.toLowerCase().trim())
        )
        .map((item) => {
          return (
            <Card
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              available={item.available}
            />
          );
        })}
    </div>
  );
}
