import { useEffect, useState } from "react";
import DropdownCategory from "../DropdownCategory/DropdownCategory";
import styles from "./style.module.css";
// import checkImage from "../../images/Categories/check.svg";
import Checkbox from "../Checkbox/Checkbox";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  getBrandData,
  handleBrandChange,
  handleModelChange,
  IFilter,
} from "../../store/slices/filterSlice";

interface IProps {
  setAvailable: (num: number) => void;
  setGenerationId: (id: number | string | null) => void;
  setBrandId: (id: number | string | null) => void;
  setModelId: (id: number | string | null) => void;
  setCurrentPage: (page: number) => void;
}

export default function Categories({
  setAvailable,
  setBrandId,
  setModelId,
  setGenerationId,
  setCurrentPage,
}: IProps) {
  const [active, setActive] = useState(false);
  const { brandData, modelsData, generationData }: IFilter = useAppSelector(
    (state) => state.filter
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getBrandData());
  }, []);

  return (
    <section className={styles.categories}>
      <div className={styles.row}>
        <DropdownCategory name="Категория" title="Все категории" items={[]} />
        <DropdownCategory
          name="Марка"
          title="Все марки"
          items={brandData}
          onChange={(id) => {
            setCurrentPage(1);
            setBrandId(id === "all" ? null : id);
            dispatch(handleBrandChange(id));
          }}
        />
        <DropdownCategory
          name="Модель"
          title="Все модели"
          items={modelsData}
          onChange={(id) => {
            setCurrentPage(1);
            setModelId(id === "all" ? null : id);
            dispatch(handleModelChange(id));
          }}
        />
        <DropdownCategory
          name="Поколение"
          title="Все поколения"
          items={generationData}
          onChange={(id) => {
            setCurrentPage(1);
            setGenerationId(id === "all" ? null : id);
          }}
        />
      </div>
      <Checkbox
        active={active}
        setActive={setActive}
        setAvailable={setAvailable}
      />
    </section>
  );
}
