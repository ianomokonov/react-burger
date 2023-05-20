import { FC } from "react";
import styles from "./order-info.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useLocation } from "react-router-dom";

export const OrderInfo: FC = () => {
  const { state } = useLocation();
  return (
    <div className="centered">
      <div className={styles.container}>
        {!state?.background && (
          <p className="d-flex centered text text_type_digits-default mt-30">
            #1234567
          </p>
        )}
        <div className="mb-15 pt-8">
          <p className="text text_type_main-medium mb-2">
            Black Hole Singularity острый бургер
          </p>
          <span className="text text_type_main-default success-text">
            Выполнен
          </span>
        </div>
        <div className="mb-10">
          <p className="mb-6 text text_type_main-medium">Состав:</p>
          <div className={`${styles.ingredients} custom-scroll pr-6`}>
            <div className={`${styles.ingredient} mb-5`}>
              <div className="d-flex align-items-center">
                <div
                  className={`${styles.ingredient__img} mr-4`}
                  style={{
                    backgroundImage: `url(https://code.s3.yandex.net/react/code/bun-02.png)`,
                  }}
                ></div>
                <span className="text text_type_main-default">
                  Флюоресцентная булка R2-D3
                </span>
              </div>

              <span className="d-flex align-items-center">
                <span className="mr-2 text text_type_digits-default">
                  2 x 20
                </span>
                <CurrencyIcon type="primary" />
              </span>
            </div>
            <div className={`${styles.ingredient} mb-5`}>
              <div className="d-flex align-items-center">
                <div
                  className={`${styles.ingredient__img} mr-4`}
                  style={{
                    backgroundImage: `url(https://code.s3.yandex.net/react/code/bun-02.png)`,
                  }}
                ></div>
                <span className="text text_type_main-default">
                  Флюоресцентная булка R2-D3
                </span>
              </div>

              <span className="d-flex align-items-center">
                <span className="mr-2 text text_type_digits-default">
                  2 x 20
                </span>
                <CurrencyIcon type="primary" />
              </span>
            </div>
            <div className={`${styles.ingredient} mb-5`}>
              <div className="d-flex align-items-center">
                <div
                  className={`${styles.ingredient__img} mr-4`}
                  style={{
                    backgroundImage: `url(https://code.s3.yandex.net/react/code/bun-02.png)`,
                  }}
                ></div>
                <span className="text text_type_main-default">
                  Флюоресцентная булка R2-D3
                </span>
              </div>

              <span className="d-flex align-items-center">
                <span className="mr-2 text text_type_digits-default">
                  2 x 20
                </span>
                <CurrencyIcon type="primary" />
              </span>
            </div>
            <div className={`${styles.ingredient} mb-5`}>
              <div className="d-flex align-items-center">
                <div
                  className={`${styles.ingredient__img} mr-4`}
                  style={{
                    backgroundImage: `url(https://code.s3.yandex.net/react/code/bun-02.png)`,
                  }}
                ></div>
                <span className="text text_type_main-default">
                  Флюоресцентная булка R2-D3
                </span>
              </div>

              <span className="d-flex align-items-center">
                <span className="mr-2 text text_type_digits-default">
                  2 x 20
                </span>
                <CurrencyIcon type="primary" />
              </span>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <span className="text text_type_main-default text_color_inactive">
            Вчера, 13:50
          </span>
          <span className="d-flex align-items-center">
            <span className="mr-2 text text_type_digits-default">510</span>
            <CurrencyIcon type="primary" />
          </span>
        </div>
      </div>
    </div>
  );
};
