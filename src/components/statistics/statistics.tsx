import { FC } from "react";
import styles from "./statistics.module.css";

export const Statistics: FC = () => {
  return (
    <>
      <div className="d-flex mb-15">
        <div className="col mr-9">
          <p className="mb-6 text text_type_main-medium">Готовы:</p>
          <div className={styles.numbers}>
            <span className="text text_type_digits-default success-text">
              034533
            </span>
            <span className="text text_type_digits-default success-text">
              034533
            </span><span className="text text_type_digits-default success-text">
              034533
            </span><span className="text text_type_digits-default success-text">
              034533
            </span><span className="text text_type_digits-default success-text">
              034533
            </span><span className="text text_type_digits-default success-text">
              034533
            </span><span className="text text_type_digits-default success-text">
              034533
            </span><span className="text text_type_digits-default success-text">
              034533
            </span><span className="text text_type_digits-default success-text">
              034533
            </span><span className="text text_type_digits-default success-text">
              034533
            </span><span className="text text_type_digits-default success-text">
              034533
            </span><span className="text text_type_digits-default success-text">
              034533
            </span><span className="text text_type_digits-default success-text">
              034533
            </span>
          </div>
        </div>
        <div className="col">
          <p className="mb-6 text text_type_main-medium">В работе:</p>
          <div className={styles.numbers}>
            <span className="text text_type_digits-default">034533</span>
          </div>
        </div>
      </div>
      <div className="mb-15">
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <span className="text text_type_digits-large neon-text">28 752</span>
      </div>
      <div className="mb-15">
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <span className="text text_type_digits-large neon-text">138</span>
      </div>
    </>
  );
};
