import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useState } from "react";
import { useTypedSelector } from "redux/hooks";
import { getUser } from "redux/selectors";

export const EditForm: FC = () => {
  const { profile } = useTypedSelector(getUser);
  const [formValue, setFormValue] = useState({
    name: profile?.name || "",
    email: profile?.email || "",
    password: "1234",
  });
  return (
    <>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={(e) =>
          setFormValue((prev) => ({ ...prev, name: e.target.value }))
        }
        value={formValue.name}
        disabled
        icon={"EditIcon"}
        name={"name"}
        error={false}
        size={"default"}
        extraClass="mb-6"
      />
      <Input
        type={"email"}
        placeholder={"Login"}
        onChange={(e) =>
          setFormValue((prev) => ({ ...prev, email: e.target.value }))
        }
        value={formValue.email}
        disabled
        name={"email"}
        icon={"EditIcon"}
        error={false}
        size={"default"}
        extraClass="mb-6"
      />
      <Input
        type="password"
        placeholder={"Пароль"}
        onChange={(e) =>
          setFormValue((prev) => ({ ...prev, password: e.target.value }))
        }
        value={formValue.password}
        disabled
        icon={"EditIcon"}
        name={"password"}
        error={false}
        size={"default"}
        extraClass="mb-6"
      />
    </>
  );
};
