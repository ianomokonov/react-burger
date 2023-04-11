import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../login/login.module.css";
import { useTypedDispatch } from "redux/hooks";
import { resetPasswordThunk } from "redux/user/thunks";

export const ResetPassword: FC = () => {
  const [formValue, setFormValue] = useState({ newPassword: "", code: "" });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await dispatch(
      resetPasswordThunk(formValue.newPassword, formValue.code, () =>
        navigate("/login")
      )
    );
  };
  return (
    <div className={styles.main}>
      <form className={styles.form} onSubmit={onSubmit}>
        <p className={`${styles.title} text text_type_main-medium mb-6`}>
          Восстановление пароля
        </p>
        <Input
          type={showPassword ? "text" : "password"}
          placeholder={"Новый пароль"}
          onChange={(e) =>
            setFormValue((prev) => ({ ...prev, newPassword: e.target.value }))
          }
          value={formValue.newPassword}
          icon={showPassword ? "HideIcon" : "ShowIcon"}
          onIconClick={() => setShowPassword(!showPassword)}
          name={"new-passord"}
          error={false}
          size={"default"}
          extraClass="mb-6"
        />
        <Input
          type={"text"}
          placeholder={"Код из письма"}
          onChange={(e) =>
            setFormValue((prev) => ({ ...prev, code: e.target.value }))
          }
          value={formValue.code}
          name={"code"}
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
