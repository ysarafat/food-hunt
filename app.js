const loadFoodData = () => {
    const inputFoodName = document.getElementById('food-name').value;
    const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputFoodName}`
    fetch(URL)
        .then(res => res.json())
        .then(data => getFoodName(data.meals))
        .catch(err => {
            if (err) {
                alert("input valid food name")
            }
        })
    return inputFoodName;
}

const getFoodName = (foods) => {
    const displayFoods = document.getElementById('display-food')
    document.getElementById('food-name').value = ""
    displayFoods.innerHTML = '';
    // console.log(foods);
    foods.forEach(meal => {
        const creatNewDiv = document.createElement('div')
        creatNewDiv.innerHTML = `
        <div class="card w-96 glass">
  <figure><img src="${meal.strMealThumb}" /></figure>
  <div class="card-body">
    <h2 class="card-title">${meal.strMeal}</h2>
    <p>Category : ${meal.strCategory}</p>
    <p>Area : ${meal.strArea}</p>
    <div class="card-actions justify-end">
      <a href="#my-modal-2" onclick="findByID(${meal.idMeal})"
        class="btn btn-primary bg-yellow-400 text-black hover:bg-black hover:text-white border-none">Instructions</a>
    </div>
  </div>
</div> 
   
        `
        displayFoods.appendChild(creatNewDiv);


    });
}
const findByID = (id) => {
    console.log(id);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => Instructions(data.meals[0]))

}
const Instructions = (foodde) => {
    document.getElementById('meal-name').innerText = `${foodde.strMeal}`;
    document.getElementById('meal-details').innerText = `${foodde.strInstructions}`;
}
