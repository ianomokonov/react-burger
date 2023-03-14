import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useRef } from "react";
import { DragIngredientProps } from "./drag-ingredient.props";
import { useDrag, useDrop } from "react-dnd";
import type { XYCoord } from "dnd-core";
import { useTypedDispatch } from "../../../redux/hooks";
import { updateOrder } from "../../../redux/constructor/constructor.slice";

export const DragIngredient: FC<DragIngredientProps> = ({
  className,
  ingredient,
  extraClass,
  index,
  onRemoveIngredient,
}) => {
  console.log(ingredient.name, index);

  const dispatch = useTypedDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, dragRef] = useDrag({
    type: "ingredient",
    item: { id: ingredient.uniqueId, index },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [{ handlerId }, dropRef] = useDrop({
    accept: "ingredient",
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      console.log(dragIndex, [hoverIndex, ingredient.name]);

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      dispatch(
        updateOrder({
          currIndex: dragIndex,
          nextIndex: hoverIndex,
          id: item.id,
        })
      );

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const opacity = isDragging ? 0 : 1;
  dragRef(dropRef(ref));
  return (
    <div
      ref={ref}
      style={{ opacity }}
      className={className}
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
