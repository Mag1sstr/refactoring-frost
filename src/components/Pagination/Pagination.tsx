import styles from "./style.module.css";

interface IProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}
export default function Pagination({
  totalPages,
  currentPage,
  setCurrentPage,
}: IProps) {
  return (
    <div className={styles.pagination}>
      {[...Array(totalPages)].map((_, i) => {
        return (
          <div
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`${styles.page} ${
              currentPage === i + 1 && styles.active__page
            }`}
          >
            {i + 1}
          </div>
        );
      })}
    </div>
  );
}
