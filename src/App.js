import React, { useState, createContext, useEffect } from "react";
import "./styles.css";
import RecipeDiv from "./recipe";
import { createBrowserHistory } from "history";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import AddRecipe from "./addrecipe";
import axios from "axios";
export const RecipeContext = createContext();
export const api=axios.create({
  baseURL: "http://localhost:3200"
});
export default function App() {
  const [recipes, setRecipes] = useState([]);
  const history = createBrowserHistory();
  // let history=useHistory();
 useEffect(()=>api.get("/recipes").then(response=>{console.log(response.data);setRecipes([...response.data]);console.log(recipes);}),[]);
 const [searchText,setSearchText]=useState("");
 const [searchTerm,setSearchTerm]=useState([]);
  let recipeObj = [recipes, setRecipes];
  let searchObj= [searchTerm,setSearchTerm];
  let AddARecipe = function () {
    return (
      <RecipeContext.Provider value={recipeObj}>
        <AddRecipe />
      </RecipeContext.Provider>
    );
  };
  let Home = function () {
    return (
      <RecipeContext.Provider value={recipeObj}>
        <RecipeDiv recipes={recipes} />
      </RecipeContext.Provider>
    );
  };
  let Search=function(){
    // setRecipes(searchTerm);
    // alert(JSON.stringify(searchTerm[0].title));
    return(
      <RecipeContext.Provider value={searchObj}>
      <RecipeDiv recipes={searchTerm} />
      </RecipeContext.Provider>
    );
      };
  return (
    
    <Router>
      <div>
        <h1 className="Title"> My Recipe App </h1>
        <ul className="FlexBox">
          <li>
            <input className="Search" type="text" placeholder="Search Recipe by Title" onChange={(e)=>setSearchText(e.target.value)}></input>
            <button className="Search" onClick={async ()=>{
              
              const searchTitle=await api.get("/recipes?title="+searchText);
             
              const search=searchTitle.data;
              
              
              if(search.length>0)
                setSearchTerm([...search]);
              else
                setSearchTerm([...recipes]);

            
              
            }}>
            <Link to="/search" className="HideLink">☕</Link>
            </button>
          </li>
          <li className="NavLink1">
            <button className="LinkButton">
              <Link to="/" className="HideLink">
                Show Recipes
              </Link>
            </button>
          </li>
          <li className="NavLink2">
            <button className="LinkButton">
              <Link to="/addRecipe" className="HideLink">
                Add a Recipe
              </Link>
            </button>
          </li>
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route path="/addRecipe">
            <AddARecipe />
          </Route>
          
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
