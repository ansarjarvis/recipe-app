const meal = document.querySelector(".meals")

addRandomMeal()
async function addRandomMeal() {
    const randomMeal = await (await fetch("https://www.themealdb.com/api/json/v1/1/random.php")).json();
    const emptyMeal = document.createElement("div");
    emptyMeal.innerHTML = `
     <div class="meal">
                <div class="meal-header">
                    <span class="heading"> Meal of the Day</span>
                </div>
                <div class="meal-image">
                    <img src="${randomMeal.meals[0].strMealThumb}"
                        alt="">
                </div>
                <div class="meal-body">
                    <h3>${randomMeal.meals[0].strMeal}</h4>
                        <button><i class="far fa-heart"></i></button>
                </div>

            </div>
    `
    meal.insertAdjacentElement("afterbegin", emptyMeal)
    console.log(randomMeal.meals[0])
}
