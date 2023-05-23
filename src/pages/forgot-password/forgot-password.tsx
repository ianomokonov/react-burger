import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "../login/login.module.css";
import { useTypedDispatch } from "redux/hooks";
import { getResetCodeThunk } from "redux/user/thunks";

export const ForgotPassword: FC = () => {
  const [formValue, setFormValue] = useState({ email: "" });
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(e);
    
    await dispatch(
      getResetCodeThunk(formValue.email, () => navigate("/reset-password"))
    );
  };
  return (
    <div className={styles.main} onSubmit={onSubmit}>
      <form className={styles.form}>
        <p className={`${styles.title} text text_type_main-medium mb-6`}>
          Восстановление пароля
        </p>
        <Input
          type={"email"}
          placeholder={"Укажите email"}
          onChange={(e) =>
            setFormValue((prev) => ({ ...prev, email: e.target.value }))
          }
          value={formValue.email}
          name={"email"}
          error={false}
          size={"default"}
          extraClass="mb-6"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mb-20"
        >
          Восстановить
        </Button>
        <div>
          <div className={styles.action}>
            <span className="text text_type_main-default text_color_inactive mr-2">
              Вспомнили пароль?
            </span>
            <Link to={"/login"}>Войти</Link>
          </div>
        </div>
      </form>
    </div>
  );
};
