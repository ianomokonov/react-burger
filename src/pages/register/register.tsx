import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "../login/login.module.css";
import { useTypedDispatch } from "redux/hooks";
import { createUserThunk } from "redux/user/thunks";

export const Register: FC = () => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const onBtnClick = async (e: FormEvent) => {
    e.preventDefault();
    await dispatch(
      createUserThunk(formValue, () =>
        location.state?.redirectUrl
          ? navigate(location.state.redirectUrl)
          : navigate("/profile/")
      )
    );
  };
  return (
    <div className={styles.main}>
      <form className={styles.form} onSubmit={onBtnClick}>
        <p className={`${styles.title} text text_type_main-medium mb-6`}>
          Регистрация
        </p>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={(e) =>
            setFormValue((prev) => ({ ...prev, name: e.target.value }))
          }
          value={formValue.name}
          name={"name"}
          error={false}
          size={"default"}
          extraClass="mb-6"
        />
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
          Зарегистрироваться
        </Button>
        <div>
          <div className={styles.action}>
            <span className="text text_type_main-default text_color_inactive mr-2">
              Уже зарегистрированы?
            </span>
            <Link to={"/login"} state={location.state}>
              Войти
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
