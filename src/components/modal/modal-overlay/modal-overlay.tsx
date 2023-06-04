import { FC } from "react";
import styles from "./modal-overlay.module.css";
import { ModalOverlayProps } from "./modal-overlay.props";

export const ModalOverlay: FC<ModalOverlayProps> = ({ onClick }) => {
  return (
    <div
      data-test="modal-overlay"
      className={styles.backdrop}
      onClickCapture={onClick}
    ></div>
  );
};
