
const showDetails = (mealId)=>{
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(res => res.json())
    .then(data => {
        const details = document.getElementById('details');
        details.innerHTML = `<div class="card">
            <img src="${data.meals[0].strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
            <h2 class="card-title">${data.meals[0].strMeal}</h2>
            <h5 class="card-title">Ingredients</h5>
            <ul id="ingredientList" style="list-style: square;"></ul>
            </div>
        </div>`;

        //Make an array using all the ingredient
        const allIngredient = [data.meals[0].strIngredient1,data.meals[0].strIngredient2,data.meals[0].strIngredient3,data.meals[0].strIngredient4,data.meals[0].strIngredient5,data.meals[0].strIngredient6,data.meals[0].strIngredient7,data.meals[0].strIngredient8,data.meals[0].strIngredient9,data.meals[0].strIngredient10,data.meals[0].strIngredient11,data.meals[0].strIngredient12,data.meals[0].strIngredient13,data.meals[0].strIngredient14,data.meals[0].strIngredient15,data.meals[0].strIngredient16,data.meals[0].strIngredient17,data.meals[0].strIngredient18,data.meals[0].strIngredient19,data.meals[0].strIngredient20];
        
        //Remove duplicate element from array
        const originalIngredient = new Set(allIngredient);

        //Put thus value under ul
        const ul = document.getElementById('ingredientList');
        originalIngredient.forEach(element => {
            if(element !== null && element !== ""){
                const li = document.createElement('li');
                li.innerText = element;
                ul.appendChild(li);
            }
        });
        
    })
    
}

//Display Search Result
const displaySearchResult = allFoods =>{
    if(allFoods == null){
        //hiding previous result using empty string
        const displayResult = document.getElementById('displayResult');
        displayResult.innerHTML = '';
        //hiding details using empty string
        const details = document.getElementById('details');
        details.innerHTML = '';

        //showing not found alert
        const notFound = document.getElementById('notFound');
        notFound.innerHTML = `<div class="alert alert-danger text-center alert-dismissible fade show" role="alert">
        <strong>Not Found!</strong> This food is not found, please enter the right food name or check your spelling.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
    }
    else{
        //hiding previous result using empty string
        const displayResult = document.getElementById('displayResult');
        displayResult.innerHTML = '';
        const notFound = document.getElementById('notFound');
        notFound.innerHTML = '';
        //hiding details using empty string
        const details = document.getElementById('details');
        details.innerHTML = '';

        allFoods.forEach(element => {
            //showing all result
            const div = document.createElement('div');
            div.className = 'col';
            div.innerHTML = `<div class="card h-100" onclick="showDetails('${element.idMeal}')">
                <img src="${element.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title text-center">${element.strMeal}</h5>
                </div>
            </div>`;
            displayResult.appendChild(div); 
        });
    }
}

// Taking input value and searching for it
const startSearch = ()=>{
    const searchValue = document.getElementById('searchInput').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
    .then(res => res.json())
    .then(data => displaySearchResult(data.meals))
}