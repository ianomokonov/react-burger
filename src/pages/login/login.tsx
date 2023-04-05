import { FC, useState } from "react";
import styles from "./login.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

export const Login: FC = () => {
  const [formValue, setFormValue] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={styles.main}>
      <form className={styles.form}>
        <p className={`${styles.title} text text_type_main-medium mb-6`}>Вход</p>
        <Input
          type={"email"}
          placeholder={"Email"}
          onChange={(e) =>
            setFormValue((prev) => ({ ...prev, email: e.target.value }))
          }
          value={formValue.email}
          name={"email"}
          error={false}
          size={"default"}
          extraClass="mb-6"
        />
        <Input
          type={showPassword ? "text" : "password"}
          placeholder={"Password"}
          onChange={(e) =>
            setFormValue((prev) => ({ ...prev, password: e.target.value }))
          }
          value={formValue.password}
          icon={showPassword ? "HideIcon" : "ShowIcon"}
          onIconClick={() => setShowPassword(!showPassword)}
          name={"password"}
          error={false}
          size={"default"}
          extraClass="mb-6"
        />
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          extraClass="mb-20"
        >
          Войти
        </Button>
        <div>
          <div className={styles.action}>
            <span className="text text_type_main-default text_color_inactive mr-2">
              Вы — новый пользователь?
            </span>
            <Link to={"/register"}>Зарегистрироваться</Link>
          </div>
          <div className={styles.action}>
            <span className="text text_type_main-default text_color_inactive mr-2">
              Забыли пароль?
            </span>
            <Link to={"/forgot-password"}>Восстановить пароль</Link>
          </div>
        </div>
      </form>
    </div>
  );
};
