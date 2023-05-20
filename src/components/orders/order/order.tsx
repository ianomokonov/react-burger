import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";
import styles from "./order.module.css";

export const Order: FC<{ className?: string }> = ({ className }) => {
  const ingredients = [
    {
      id: 1,
      img: "https://code.s3.yandex.net/react/code/bun-02.png",
    },
    {
      id: 2,
      img: "https://code.s3.yandex.net/react/code/bun-02.png",
    },
    {
      id: 3,
      img: "https://code.s3.yandex.net/react/code/bun-02.png",
    },
    {
      id: 4,
      img: "https://code.s3.yandex.net/react/code/bun-02.png",
    },
    {
      id: 5,
      img: "https://code.s3.yandex.net/react/code/bun-02.png",
    },
    {
      id: 6,
      img: "https://code.s3.yandex.net/react/code/bun-02.png",
    },
    {
      id: 7,
      img: "https://code.s3.yandex.net/react/code/bun-02.png",
    },
    {
      id: 8,
      img: "https://code.s3.yandex.net/react/code/bun-02.png",
    },
  ];
  return (
    <div className={`p-6 ${styles.order} ${className}`}>
      <div className="d-flex justify-content-between mb-6 align-items-center">
        <span className="text text_type_digits-default">#122344</span>
        <span className="text text_type_main-default text_color_inactive">
          сегодня, 16:20
        </span>
      </div>
      <p className="text text_type_main-medium mb-6">
        Death Star Starship Main бургер
      </p>
      <div className="d-flex justify-content-between align-items-center">
        <div className="ingredients d-flex">
          {ingredients.slice(0, 5).map((ingredient) => (
            <div
              key={ingredient.id}
              className={`${styles.ingredient}`}
              style={{
                backgroundImage: `url(${ingredient.img})`,
              }}
            ></div>
          ))}
          {ingredients.length > 5 && (
            <div
              className={`${styles.ingredient}`}
              style={{
                backgroundImage: `url(https://code.s3.yandex.net/react/code/bun-02.png)`,
              }}
            >
              <span className="text text_type_digits-default">
                +{ingredients.length - 5}
              </span>
            </div>
          )}
        </div>
        <span className="price text text_type_digits-default d-flex align-items-center">
          <span className="mr-2">480</span> <CurrencyIcon type="primary" />
        </span>
      </div>
    </div>
  );
};
