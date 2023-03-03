import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerConstructorProps } from "./burger-constructor.props";
import styles from "./burger-constructor.module.css";

export function BurgerContructor({ ingredients }: BurgerConstructorProps) {
  return (
    <div className="pl-4">
      <div className="pl-8">
        <ConstructorElement
          type="top"
          extraClass="mb-4"
          isLocked={true}
          text={ingredients[0].name}
          price={ingredients[0].price}
          thumbnail={ingredients[0].image}
        />
      </div>

      <div className={`${styles.main} custom-scroll`}>
        {ingredients.slice(1, -2).map((ingredient) => (
          <div key={ingredient._id} className={`pl-8 ${styles.ingredient}`}>
            <DragIcon type="primary" />
            <ConstructorElement
              extraClass={styles.ingredient__card}
              text={ingredient.name}
              price={ingredient.price}
              thumbnail={ingredient.image}
            />
          </div>
        ))}
      </div>

      <div className="pl-8">
        <ConstructorElement
          type="bottom"
          isLocked={true}
          extraClass="mt-4"
          text={ingredients[ingredients.length - 1].name}
          price={ingredients[ingredients.length - 1].price}
          thumbnail={ingredients[ingredients.length - 1].image}
        />
      </div>
    </div>
  );
}
