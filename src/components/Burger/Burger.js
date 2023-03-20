
import classes from './Burger.css';
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients"

const Burger = (props) => {
    let ingredients = 
        Object.keys(props.ing).map(l=>[...Array(props.ing[l])]
        .map((_,i)=><BurgerIngredients key={i} type={l} />));


//           Empty Check

    let empty = 0;
    for(let i=0; i<ingredients.length; i++){
        if(ingredients[i].length === 0)
            empty++;
    }
    if(empty === ingredients.length)
        ingredients = <h2 style={{textAlign: 'center'}}>Please Add Some Ingredients</h2>;

/////////////////////////////////////////


    return (
        <div className={classes.burger}>
            <BurgerIngredients type='bread-top' />
            {ingredients}
            <BurgerIngredients type='bread-bottom' />
        </div>
    )
}

export default Burger;
