import { FC } from "react";

export const NotFound: FC = () => {
  return (
    <div
      className="text text_type_main-large"
      style={{
        height: "calc(100vh - var(--offset-base-size) * 24)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Страница не найдена
    </div>
  );
};
