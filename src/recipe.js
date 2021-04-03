import React, { useState, useContext } from "react";
import "./styles.css";
import { RecipeContext } from "./App";
import {api} from "./App.js";
const Step = function (props) {
  let [buttonState, setButtonState] = useState(false);
  let doneClick = function () {
    if (props.done < props.stepLength) props.setDone(props.done + 1);
    setButtonState(true);
  };

  return (
    <div>
      {props.step}
      <br />
      <button
        disabled={buttonState}
        className="Btn"
        onClick={() => {
          doneClick();
        }}
      >
        <span>✅</span>Done
      </button>
    </div>
  );
};
const StepsDiv = function (steps) {
  let [done, setDone] = useState(1);
  console.log(done);
  return steps.steps.map((step, i, steps) => {
    //let idstr = "Step" + steps.id + "-" + (i + 1).toString();
    let idPrint = i + 1;

    return idPrint > done ? (
      ""
    ) : (
      <div className="FloatLeft">
        <h5>STEP {idPrint}</h5>
        <Step
          step={step}
          done={done}
          setDone={setDone}
          stepLength={steps.length}
        />
      </div>
    );
  });
};
const IngredientsDiv = function (ingredients) {
  return ingredients.ingredients.map((ing) => {
    return (
      <div>
        <i>{ing}</i>
        <br />
        <br />
      </div>
    );
  });
};
const SingleRecipe = function ({ prop , i, setRecipes, recipes}) {
  const [showRecipe, setShowRecipe] = useState(false);
  let onShowRecipeButtonClick = () => {
    setShowRecipe(!showRecipe);
  };
  let onDeleteRecipe=()=>{
    api.delete("/recipes/"+prop._id).then(()=>{
      let recipes2=[...recipes];
      recipes2.splice(i,1);
      setRecipes([...recipes2]);
    });
  };
  return (
    <div>
      <div className="OuterDiv">
        <img src={prop.imag} alt="Dish" className="Dishimage" />
      </div>
      <h1>{prop.title}</h1>
      <h3>
        🕑 {prop.time} Minutes&nbsp;🍕 Serves {prop.serves} &nbsp;🎩{" "}
        {prop.difficulty}{" "}
      </h3>
      <h5>{prop.subtitle}</h5>
      <button className="Btn" onClick={onShowRecipeButtonClick}>
        Toggle Recipe
      </button>
      {showRecipe ? (
        <div className="InnerDiv">
          <div className="Left">
            <h4>Ingredients</h4>
            <br />
            <IngredientsDiv ingredients={prop.ingredients} />
          </div>
          <div className="Right">
            <StepsDiv steps={prop.steps} />
          </div>
        </div>
      ) : (
        ""
      )}
<button className="BtnDelete" onClick={onDeleteRecipe}>Delete Recipe</button>
      <hr />
    </div>
  );
};
const AllRecipe = function ({ recipes, setRecipes }) {
  return recipes.map((prop, i) => {
    return <SingleRecipe prop={prop} setRecipes={setRecipes} i={i} recipes={recipes}/>;
  });
};
const RecipeDiv = function () {
  const [recipes, setRecipes] = useContext(RecipeContext);

  return (
    <div className="App">
      <AllRecipe recipes={recipes} setRecipes={setRecipes}/>
    </div>
  );
};

export default RecipeDiv;
