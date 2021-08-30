const meal = document.querySelector(".meals")
const button = document.querySelector(".header-btn")
const input = document.querySelector("input")

getRandomMeal()
async function getRandomMeal() {
    const randomMeal = await (await fetch("https://www.themealdb.com/api/json/v1/1/random.php")).json();
    // console.log(randomMeal)
    const oneMeal = randomMeal.meals[0];
    addMeals(oneMeal);

}



function addMeals(mealData) {
    // console.log(mealData)
    const emptyMeal = document.createElement("div");
    emptyMeal.innerHTML = `
     <div class="meal">
                <div class="meal-header">
                    <span class="heading"> Meal of the Day</span>
                </div>
                <div class="meal-image">
                    <img src="${mealData.strMealThumb}"
                        alt="">
                </div>
                <div class="meal-body">
                    <h3>${mealData.strMeal}</h4>
                        <button class = "fav-btn"><i class="far fa-heart"></i></button>
                </div>

            </div>
    `
    meal.insertAdjacentElement("afterbegin", emptyMeal)

    const btn = meal.querySelector(".meal-body .fav-btn");
    btn.addEventListener("click", () => {
        btn.classList.toggle("active")
    })
}


async function getMealsBySearch(term) {
    const resp = await fetch(
        "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
    );

    const respData = await resp.json();
    const meal = respData.meals;
    // console.log(meal)

    return meal;
}

button.addEventListener("click", async () => {
    meal.innerHTML = ""
    const searchMeal = input.value;
    const foundMeals = await getMealsBySearch(searchMeal);
    console.log(foundMeals)
    // addMeals(foundMeals)

    if (foundMeals) {
        foundMeals.forEach((meal) => {
            addMeals(meal);
        });
    }
});