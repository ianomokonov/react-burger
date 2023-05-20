import { FC } from "react";
import { Order } from "./order/order";
import { useLocation, useNavigate } from "react-router-dom";
import { FeedOrder } from "redux/feed/models";

export const Orders: FC<{ modalUrl: string; orders: FeedOrder[] }> = ({
  modalUrl,
  orders,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="h-100 overflow-auto custom-scroll pr-2">
      {orders.map((order) => (
        <Order
          key={order.number}
          className="mb-4"
          order={order}
          onClick={() =>
            navigate(`${modalUrl}/${order.number}`, {
              state: { background: location, orderNumber: order.number },
            })
          }
        />
      ))}
    </div>
  );
};
