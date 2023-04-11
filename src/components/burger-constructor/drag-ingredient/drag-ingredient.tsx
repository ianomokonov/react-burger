import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { DragIngredientProps } from "./drag-ingredient.props";
import { useDrag, useDrop } from "react-dnd";
import type { XYCoord } from "dnd-core";
import { useTypedDispatch } from "redux/hooks";
import { updateOrder } from "redux/constructor/constructor.slice";

export const DragIngredient: FC<DragIngredientProps> = ({
  className,
  ingredient,
  extraClass,
  index,
  onRemoveIngredient,
  onAddIngredient,
}) => {
  const dispatch = useTypedDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const [sortItemPosition, setSortItemPosition] = useState<
    null | "top" | "bottom"
  >(null);
  const [{ isDragging }, dragRef] = useDrag({
    type: "ingredient",
    item: { id: ingredient.uniqueId, index },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ handlerId, isOver }, dropRef] = useDrop({
    accept: ["ingredient", "main"],
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
      isOver: monitor.isOver(),
    }),
    drop(item: any) {
      if (item.index || item.index === 0) {
        dispatch(
          updateOrder({
            id: item.id,
            currIndex: item.index,
            nextIndex: index,
          })
        );
        return;
      }

      onAddIngredient(item.id, index);
    },
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      const itemPosition = hoverClientY > hoverMiddleY ? "bottom" : "top";

      if (itemPosition === sortItemPosition) {
        return;
      }

      setSortItemPosition(hoverClientY > hoverMiddleY ? "bottom" : "top");
    },
  });

  useEffect(() => {
    if (!isOver) {
      setSortItemPosition(null);
    }
  }, [isOver]);

  const sortPositionClass = useMemo(() => {
    if (!isOver || !sortItemPosition) {
      return "";
    }

    if (sortItemPosition === "top") {
      return "pt-24";
    }

    return "pb-24";
  }, [isOver, sortItemPosition]);
  const opacity = isDragging ? 0 : 1;

  dragRef(dropRef(ref));

  return (
    <div
      ref={ref}
      style={{ opacity, display: isDragging ? "none" : "flex" }}
      className={`${className} ${sortPositionClass}`}
      data-handler-id={handlerId}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        extraClass={extraClass}
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => onRemoveIngredient(ingredient)}
      />
    </div>
  );
};
