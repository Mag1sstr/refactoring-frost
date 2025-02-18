import styles from "./style.module.css";
import checkImage from "../../images/Categories/check.svg";

interface IProps {
  active: boolean;
  setActive: (bool: boolean) => void;
  setAvailable: (prev: any) => void;
}
export default function Checkbox({ active, setActive, setAvailable }: IProps) {
  return (
    <div className={styles.checkbox}>
      <div
        onClick={() => {
          setActive(!active);
          setAvailable((prev: number) => (prev === 0 ? 1 : 0));
        }}
        className={`${styles.box} ${active && styles.active}`}
      >
        <img className={styles.check} src={checkImage} alt="" />
      </div>
      в наличии
    </div>
  );
}
