import { FC, FormEvent, useState } from "react";
import styles from "./login.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTypedDispatch } from "redux/hooks";
import { loginThunk } from "redux/user/thunks";

export const Login: FC = () => {
  const [formValue, setFormValue] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useTypedDispatch();
  const navidate = useNavigate();
  const location = useLocation();

  const login = async (e: FormEvent) => {
    e.preventDefault();
    await dispatch(
      loginThunk(formValue, () =>
        location.state?.redirectUrl
          ? navidate(location.state.redirectUrl)
          : navidate("/profile")
      )
    );
  };
  return (
    <div className={styles.main}>
      <form className={styles.form} onSubmit={login}>
        <p className={`${styles.title} text text_type_main-medium mb-6`}>
          Вход
        </p>
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
          placeholder={"Пароль"}
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
          htmlType="submit"
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
            <Link to={"/register"} state={location.state}>
              Зарегистрироваться
            </Link>
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
