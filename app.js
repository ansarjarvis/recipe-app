const meal = document.querySelector(".meals")
const button = document.querySelector(".header-btn")
const input = document.querySelector("input")
const popupMealContainer = document.querySelector(".meal-info-container");
const popupButton = document.querySelector(".popup-button");
const mealInfo = document.querySelector(".meal-info")

getRandomMeal()
async function getRandomMeal() {
    const randomMeal = await (await fetch("https://www.themealdb.com/api/json/v1/1/random.php")).json();
    // console.log(randomMeal)
    const oneMeal = randomMeal.meals[0];
    addMeals(oneMeal);
    console.log(oneMeal)

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

    emptyMeal.addEventListener("click", () => {
        showMealPopup(mealData)
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
    else {
        alert(" blah blah blah ! No such meal exist ")
    }
});

popupButton.addEventListener("click", () => {
    popupMealContainer.classList.add("hidden");
})

function showMealPopup(mealData) {
    mealInfo.innerHTML = " "
    const emptyMealinfo = document.createElement("div")
    emptyMealinfo.innerHTML = `
    <h1> ${mealData.strMeal}</h1>
    <img src="${mealData.strMealThumb}" alt="">
    <h3> Instructions </h3>
    <div>
        <p>${mealData.strInstructions}</p>
    </div>
   `
    mealInfo.insertAdjacentElement("afterbegin", emptyMealinfo)

    popupMealContainer.classList.remove("hidden")
}