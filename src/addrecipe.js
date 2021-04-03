import React, { useContext, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RecipeContext } from "./App";
import "./styles.css";
import {api} from "./App.js";
let Step = function ({ register, index }) {
  let ph = "Enter the recipe's step " + index;
  let name = "steps" + index;
  return (
    <input
      name={name}
      type="text"
      placeholder={ph}
      ref={register({
        validate: (value) => value !== ""
      })}
    />
  );
};
let Ingredient = function ({ register, index }) {
  let ph = "Enter the recipe's Ingredient number " + index;
  let name = "ingredients" + index;
  return (
    <input
      name={name}
      type="text"
      required
      placeholder={ph}
      ref={register({
        validate: (value) => value !== ""
      })}
    />
  );
};

let AddRecipe = function () {
  let history = useHistory();
  const [recipes, setRecipes] = useContext(RecipeContext);
  // useEffect(() => {
    
  // }, [recipes]);
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    let recipe = {};
    recipe.imag = data.imag;
    recipe.title = data.title;
    recipe.time = data.time;
    recipe.serves = data.serves;
    recipe.difficulty = data.difficulty;
    recipe.subtitle = data.subtitle;
    recipe.ingredients = [];
    for (let x in data) {
      if (x.startsWith("ingredients")) recipe.ingredients.push(data[x]);
    }
    recipe.steps = [];
    for (let x in data) {
      if (x.startsWith("steps")) recipe.steps.push(data[x]);
    }
    api.post("/recipes",recipe).then(alert("Recipe added")).catch((err)=>alert("Error"+err));
    setRecipes([...recipes, recipe]);
    history.push("/");
  };
  const intialValues = {
    imag: "",
    title: "",
    time: "25",
    serves: "2",
    difficulty: "easy",
    subtitle: "",
    ingredients: [],
    steps: ""
  };
  const [ingredientsCount, setIngredientsCount] = useState(1);
  const [stepsCount, setStepsCount] = useState(1);
  return (
    <div className="formRecipe">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="imag">Image</label>
          <input
            defaultValue={intialValues.imag}
            name="imag"
            type="text"
            placeholder="Image URL"
            ref={register({
              validate: (value) => value !== ""
            })}
          />
        </div>
        {errors.imag && <p>⚠ Please enter URL of the image</p>}

        <div>
          <label htmlFor="title">Title</label>
          <input
            defaultValue={intialValues.title}
            name="title"
            type="text"
            placeholder="Enter the recipe's title"
            ref={register({
              validate: (value) => value !== ""
            })}
          />
        </div>
        {errors.title && <p>⚠ Please enter the Recipe's title</p>}

        <div>
          <label htmlFor="time">Time</label>
          <input
            name="time"
            type="text"
            placeholder="Cooking time"
            ref={register({
              validate: (value) => {
                return parseFloat(value) > 0;
              }
            })}
          />
        </div>
        {errors.time && <p>⚠ Please enter time taken in minutes</p>}
        <div>
          <label htmlFor="serves">Serves</label>
          <input
            name="serves"
            placeholder="Serves how many?"
            type="text"
            ref={register({
              validate: (value) => {
                return parseFloat(value) > 0;
              }
            })}
          />
        </div>
        {errors.serves && <p>⚠ Please enter the Recipe's serving quantity</p>}
        <div>
          <label htmlFor="difficulty">Difficulty</label>
          <select
            name="difficulty"
            placeholder="Enter prepartion difficulty"
            ref={register}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <div>
          <label htmlFor="subtitle">Sub-Title</label>
          <input
            name="subtitle"
            type="text"
            placeholder="Enter the recipe's sub-title"
            ref={register({
              validate: (value) => value !== ""
            })}
          />
        </div>
        {errors.subtitle && <p>⚠ Please enter the Recipe's subtitle</p>}
        <label>Ingredients</label>
        <div>
          {[...Array(ingredientsCount)].map((x, i) => {
            return <Ingredient register={register} index={i + 1} />;
          })}
          <button
            className="Btn"
            onClick={() => {
              setIngredientsCount(ingredientsCount + 1);
            }}
          >
            Add Ingredient
          </button>
        </div>

        <div>
          <label htmlFor="steps">Steps</label>
          <div>
            {[...Array(stepsCount)].map((x, i) => {
              return <Step register={register} index={i + 1} />;
            })}
            <button
              className="Btn"
              onClick={() => {
                setStepsCount(stepsCount + 1);
              }}
            >
              Add Step
            </button>
          </div>
        </div>
        {errors.steps && <p>⚠ Please enter the Recipe's steps</p>}

        <input type="submit" />
      </form>
    </div>
  );
};
export default AddRecipe;
