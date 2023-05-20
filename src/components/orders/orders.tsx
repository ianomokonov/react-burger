import { FC } from "react";
import { Order } from "./order/order";

export const Orders: FC = () => {
  return (
    <div className="h-100 overflow-auto custom-scroll pr-2">
      <Order className="mb-4" />
      <Order className="mb-4" />
      <Order className="mb-4" />
      <Order className="mb-4" />
      <Order className="mb-4" />
      <Order className="mb-4" />
      <Order className="mb-4" />
      <Order className="mb-4" />
      <Order className="mb-4" />
      <Order className="mb-4" />
      <Order className="mb-4" />
      <Order className="mb-4" />
      <Order className="mb-4" />
      <Order className="mb-4" />
      <Order className="mb-4" />
    </div>
  );
};
