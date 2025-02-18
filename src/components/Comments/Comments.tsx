import { useEffect, useState } from "react";
import styles from "./style.module.css";
import axios from "axios";
import { ICommets } from "../../interfaces/interfaces";
import { useUser } from "../../store/slices/authSlice";

interface IProps {
  id: string | undefined;
}
export default function Comments({ id }: IProps) {
  const [comments, setComments] = useState<ICommets[]>([]);
  const user = useUser();

  useEffect(() => {
    axios
      .get(`https://frost.runtime.kz/api/reviews?productId=${id}`)
      .then((resp) => {
        setComments(resp.data);
      });
  }, [id]);
  return (
    <div className={styles.comments}>
      {user ? (
        <div style={{ width: "100%", marginBottom: 20 }}>
          <textarea
            className={styles.textarea}
            placeholder="Оставьте отзыв"
          ></textarea>
          <div>
            <button className={styles.button}>Отправить</button>
          </div>
        </div>
      ) : (
        <>
          <h1>Отзывы</h1>
          <p>
            Чтобы оставить отзыв <span>войдите на сайт</span>
          </p>
        </>
      )}

      <div className={styles.comments__col}>
        {comments.map((item) => {
          return (
            <div className={styles.comments__item}>
              <h3>
                {item.user.firstName} {item.user.lastName}
              </h3>
              <p>{item.review}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
