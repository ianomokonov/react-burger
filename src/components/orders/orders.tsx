import { FC } from "react";
import { Order } from "./order/order";
import { useLocation, useNavigate } from "react-router-dom";

export const Orders: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="h-100 overflow-auto custom-scroll pr-2">
      <Order
        className="mb-4"
        onClick={() =>
          navigate(`/feed/${1}`, {
            state: { background: location, orderNumber: "1234567" },
          })
        }
      />
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
