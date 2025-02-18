import styles from "./style.module.css";
import arrowLeft from "../../images/Slider/arrow_left.svg";
import arrowRight from "../../images/Slider/arrow_right.svg";
import { Children, useEffect, useState } from "react";

interface IProps {
  children: React.ReactNode;
}

const PAGE_WIDTH = 1920;
export default function Carousel({ children }: IProps) {
  const [offset, setOffset] = useState(0);
  const [pages, setPages] = useState<number>(0);
  const maxOffset = -(PAGE_WIDTH * (pages - 1));

  useEffect(() => {
    const count = Children.map(children, (_, i) => i);
    setPages(count!.length);
  }, []);

  function arrowLeftClick() {
    if (offset < 0) {
      setOffset(offset + PAGE_WIDTH);
    }
  }
  function arrowRightClick() {
    if (offset > maxOffset) {
      setOffset(offset - PAGE_WIDTH);
    }
  }
  return (
    <div className={styles.main}>
      <img
        className={styles.arrow__left}
        src={arrowLeft}
        alt=""
        draggable={false}
        onClick={arrowLeftClick}
      />
      <div className={styles.window}>
        <div
          className={styles.banners__container}
          style={{
            transform: `translateX(${offset}px)`,
          }}
        >
          {children}
        </div>
      </div>
      <img
        className={styles.arrow__right}
        src={arrowRight}
        alt=""
        draggable={false}
        onClick={arrowRightClick}
      />
    </div>
  );
}
