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
import { useTranslation } from "react-i18next";

interface IProps {
  setAvailable: (prev: (p: number) => number) => void;
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
  }, [dispatch]);

  const { t } = useTranslation();

  return (
    <section className={styles.categories}>
      <div className={styles.row}>
        <DropdownCategory
          name={t("category")}
          title={t("all_categories")}
          items={[]}
        />
        <DropdownCategory
          name={t("brand")}
          title={t("all_brands")}
          items={brandData}
          onChange={(id) => {
            setCurrentPage(1);
            setBrandId(id === "all" ? null : id);
            dispatch(handleBrandChange(id));
          }}
        />
        <DropdownCategory
          name={t("model")}
          title={t("all_models")}
          items={modelsData}
          onChange={(id) => {
            setCurrentPage(1);
            setModelId(id === "all" ? null : id);
            dispatch(handleModelChange(id));
          }}
        />
        <DropdownCategory
          name={t("generetions")}
          title={t("all_generations")}
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
