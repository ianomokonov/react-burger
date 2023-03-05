import React, { FC, PropsWithChildren } from "react";
import ReactDOM from "react-dom";
import { ModalProps } from "./modal.props";
import styles from "./modal.module.css";
import { ModalOverlay } from "./modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("react-modals");

export const Modal: FC<PropsWithChildren<ModalProps>> = ({
  children,
  onClose,
  title,
}) => {
  if (!modalRoot) {
    return <></>;
  }
  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        <div className={`${styles.modal__content} p-10`}>
          <div className={styles.modal__header}>
            <span className="text text_type_main-large">{title}</span>
            <CloseIcon type="primary" onClick={onClose} />
          </div>
          {children}
        </div>
      </div>
      <ModalOverlay onClick={onClose} />
    </>,
    modalRoot
  );
};
