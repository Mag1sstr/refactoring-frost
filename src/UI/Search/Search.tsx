import { useEffect } from "react";
import styles from "../../components/Header/style.module.css";
import searchImage from "../../images/Header/search.svg";
import { setSearchValue } from "../../store/slices/searchSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function Search() {
  const searchValue = useAppSelector((state) => state.search.searchValue);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (searchValue.trim()) {
      navigate("/search");
    } else {
      navigate("/");
    }
  }, [searchValue]);

  const { t } = useTranslation();
  return (
    <div className={styles.search}>
      <input
        value={searchValue}
        onChange={(e) => {
          dispatch(setSearchValue(e.target.value));
        }}
        className={styles.input}
        type="text"
        placeholder={t("search")}
      />
      <div style={{ width: 1, height: "100%", background: "#6A6A6A" }}></div>
      <img className={styles.searchImg} src={searchImage} alt="search" />
    </div>
  );
}
