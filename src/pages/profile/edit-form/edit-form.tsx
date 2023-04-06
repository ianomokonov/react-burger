import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useState } from "react";
import { useTypedDispatch, useTypedSelector } from "redux/hooks";
import { getUser } from "redux/selectors";
import { updateUserThunk } from "redux/user/thunks";
import { UpdateUserRequest } from "utils/models/update-user.request";

export const EditForm: FC = () => {
  const { profile } = useTypedSelector(getUser);
  const dispatch = useTypedDispatch();
  const [editingFields, setEditingFields] = useState({
    name: false,
    email: false,
    password: false,
  });
  const [formValue, setFormValue] = useState<Required<UpdateUserRequest>>({
    name: profile?.name || "",
    email: profile?.email || "",
    password: "",
  });

  const onIconClick = async (name: keyof UpdateUserRequest) => {
    if (editingFields[name]) {
      await dispatch(updateUserThunk({ [name]: formValue[name] }));
    }
    setEditingFields({ ...editingFields, [name]: !editingFields[name] });
  };
  return (
    <>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={(e) =>
          setFormValue((prev) => ({ ...prev, name: e.target.value }))
        }
        value={formValue.name}
        disabled={!editingFields.name}
        onIconClick={() => onIconClick("name")}
        icon={!editingFields.name ? "EditIcon" : "CheckMarkIcon"}
        name={"name"}
        error={false}
        size={"default"}
        extraClass="mb-6"
      />
      <Input
        type={"email"}
        placeholder={"Логин"}
        onChange={(e) =>
          setFormValue((prev) => ({ ...prev, email: e.target.value }))
        }
        value={formValue.email}
        onIconClick={() => onIconClick("email")}
        disabled={!editingFields.email}
        name={"email"}
        icon={!editingFields.email ? "EditIcon" : "CheckMarkIcon"}
        error={false}
        size={"default"}
        extraClass="mb-6"
      />
      <Input
        type="password"
        placeholder={"Введите новый пароль"}
        onIconClick={() => onIconClick("password")}
        onChange={(e) =>
          setFormValue((prev) => ({ ...prev, password: e.target.value }))
        }
        value={formValue.password}
        disabled={!editingFields.password}
        icon={!editingFields.password ? "EditIcon" : "CheckMarkIcon"}
        name={"password"}
        error={false}
        size={"default"}
        extraClass="mb-6"
      />
    </>
  );
};
