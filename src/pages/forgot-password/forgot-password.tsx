import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useState } from "react";
import { Link } from "react-router-dom";

import styles from "../login/login.module.css";

export const ForgotPassword: FC = () => {
  const [formValue, setFormValue] = useState({ email: "" });
  return (
    <div className={styles.main}>
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
        <Link to="/reset-password">
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            extraClass="mb-20"
          >
            Восстановить
          </Button>
        </Link>
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
