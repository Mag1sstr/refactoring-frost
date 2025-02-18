import styles from "./style.module.css";
import banner1 from "../../images/Slider/banner1.png";
import banner2 from "../../images/Slider/banner2.png";
import banner3 from "../../images/Slider/banner3.png";
import Carousel from "../Carousel/Carousel";

export default function Slider() {
  return (
    <Carousel>
      <img src={banner1} className={styles.image} alt="" />
      <img src={banner2} alt="" />
      <img src={banner3} alt="" />
    </Carousel>
  );
}
