let favRecipe=JSON.parse(localStorage.getItem('favRecipe'));
var recipeList=document.getElementById("recipe-list");

//fetch data from mealId
const fetchData=async (mealId)=>{
    try {
        //create dynamic url
        let res=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        let result=await res.json();
        displayResults(result.meals[0]);
    } catch (error) {
        console.error(error);
    }
}

const showFavourites=()=>{
    //if there is no meal
    if(favRecipe.length===0){
        recipeList.innerHTML='<h1>No Favourite Meals Present</h1>'
    }else{
        recipeList.innerHTML='';
        favRecipe.map((mealId)=>{
            fetchData(mealId);
        })
    }
}

const displayResults=(meal)=>{
    let isFav=true;
    //create dynamic details 
    recipeList.innerHTML +=`<li class="meal">
    <img src="${meal.strMealThumb}" /img>
     <div class="meal-name" id="${meal.idMeal}">
     <h2 class="recipe-name">${meal.strMeal}</h2> 
     <i class="${ isFav ? 'fas' : 'far' } fa-heart fav-btn"></i>
     </div>
     </li>`;
}



recipeList.addEventListener('click',(e)=>{
    //show recipe detail if user click on recipe-name
    if(e.target.className == 'recipe-name'){
        let recipeId=e.target.parentNode.id;
        window.open(`detail.html?id=${recipeId}`);
    }else if(e.target.classList.contains('fav-btn')){
        let recipeId=e.target.parentNode.id;
        let localArray=JSON.parse(localStorage.getItem('favRecipe'));
        localArray=localArray.filter((item)=> item != recipeId);
        localStorage.setItem('favRecipe',JSON.stringify(localArray));
        favRecipe=JSON.parse(localStorage.getItem('favRecipe'));
        showFavourites();
    }
})


showFavourites();