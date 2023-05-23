import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, FormEvent, useState } from "react";
import { useTypedDispatch, useTypedSelector } from "redux/hooks";
import { getUser } from "redux/selectors";
import { updateUserThunk } from "redux/user/thunks";
import { UpdateUserRequest } from "utils/models/update-user.request";

export const EditForm: FC = () => {
  const { profile } = useTypedSelector(getUser);
  const dispatch = useTypedDispatch();
  const [editingFields, setEditingFields] = useState(false);
  const [formValue, setFormValue] = useState<Required<UpdateUserRequest>>({
    name: profile?.name || "",
    email: profile?.email || "",
    password: "",
  });

  const onIconClick = () => {
    setEditingFields(true);
  };
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      updateUserThunk(
        {
          ...formValue,
          password: formValue.password || undefined,
        },
        () => {
          setEditingFields(false);
        }
      )
    );
  };

  const onCancel = () => {
    if (!profile) {
      return;
    }

    setFormValue({ ...profile, password: "" });
    setEditingFields(false);
  };

  const canShowBtns = () => {
    if (!profile) {
      return false;
    }
    return (
      profile.email !== formValue.email ||
      profile.name !== formValue.name ||
      !!formValue.password
    );
  };
  return (
    <form onSubmit={onSubmit} className="pt-30">
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={(e) =>
          setFormValue((prev) => ({ ...prev, name: e.target.value }))
        }
        value={formValue.name}
        disabled={!editingFields}
        onIconClick={onIconClick}
        icon={"EditIcon"}
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
        onIconClick={onIconClick}
        disabled={!editingFields}
        name={"email"}
        icon={"EditIcon"}
        error={false}
        size={"default"}
        extraClass="mb-6"
      />
      <Input
        type="password"
        placeholder={"Введите новый пароль"}
        onIconClick={onIconClick}
        onChange={(e) =>
          setFormValue((prev) => ({ ...prev, password: e.target.value }))
        }
        value={formValue.password}
        disabled={!editingFields}
        icon={"EditIcon"}
        name={"password"}
        error={false}
        size={"default"}
        extraClass="mb-6"
      />
      {canShowBtns() && (
        <div className="d-flex">
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass="mr-4"
          >
            Сохранить
          </Button>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass="mr-4"
            onClick={onCancel}
          >
            Отменить
          </Button>
        </div>
      )}
    </form>
  );
};
