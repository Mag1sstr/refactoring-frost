import styles from "./style.module.css";
import logo from "../../images/logo.svg";
import ContactsHeader from "../../UI/Contacts/ContactsHeader";
import Search from "../../UI/Search/Search";
import Cart from "../../UI/Cart/Cart";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { setUser, useUser } from "../../store/slices/authSlice";
import { useAppDispatch } from "../../store/store";
import { useTranslation } from "react-i18next";
import Language from "../Language/Language";

export default function Header() {
  const [openReg, setOpenReg] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const navigate = useNavigate();
  const user = useUser();
  const dispatch = useAppDispatch();

  return (
    <header className={styles.header}>
      <RegisterModal
        openReg={openReg}
        setOpenReg={setOpenReg}
        setOpenLogin={setOpenLogin}
      />
      <LoginModal
        openLogin={openLogin}
        setOpenLogin={setOpenLogin}
        setOpenReg={setOpenReg}
      />
      <div className="conteiner">
        <div className={styles.row}>
          <img
            onClick={() => navigate("/")}
            className={styles.logo}
            src={logo}
            alt="logo"
          />
          <ContactsHeader />
          <Search />
          {user ? (
            <div className={styles.auth}>
              <a
                onClick={() => navigate("/personal")}
              >{`${user.firstName} ${user.lastName} (${user.email})`}</a>
              <a
                onClick={() => {
                  localStorage.setItem("token", "null");
                  dispatch(setUser(null));
                }}
              >
                Выйти
              </a>
            </div>
          ) : (
            <div className={styles.auth}>
              <a onClick={() => setOpenLogin(true)}>Вход в личный кабинет</a>
              <a onClick={() => setOpenReg(true)}>Зарегистрироваться</a>
            </div>
          )}
          <Language />
          <Cart />
        </div>
      </div>
    </header>
  );
}
