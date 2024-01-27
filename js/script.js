// setTimeout(() => {
//   console.log("From setTimeout");
// }, 1000);

// // setInterval(() => {
// //   console.log("From setInterval");
// // }, 1000);

// // $('.btn').on('click' , ()=>{
// // $('.demo').toggle(1000)
// // } );

// // $('.btn').on('click' , ()=>{

// // })

// $('.demo').animate({height : '100px' , borderRadius : '20%'},1000)

function toggleNavBar(position) {
  $("aside").animate({ left: `${position}px` }, 500);
}

$(window).on("load", () => {
  $(".loading-spinner").fadeOut(1000);
});
const showLoadingScreen= ()=>{

}

const openSideNavBar = () => {
  toggleNavBar(0);
  $("#nav-btn").removeClass("fa-bars");
  $("#nav-btn").addClass("fa-x");
  $("ul li").animate({ top: "0" }, 700);
};
const closeSideNavBar = () => {
  toggleNavBar(-250);
  $("#nav-btn").removeClass("fa-x");
  $("#nav-btn").addClass("fa-bars");
  $("ul li").animate({ top: '350px' }, 700);
};

$("#nav-btn").on("click", () => {
  if ($("#nav-btn").hasClass("fa-bars")) {
    openSideNavBar();
  } else {
    closeSideNavBar();
  }
});

const getMealsByName = (mealName) => {
  let mealsContainer = ``;
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
    .then((resp) => resp.json())
    .then((meals) => {
      meals.meals.forEach((meal) => {
        mealsContainer += `<div class="col-md-3">
                <div
                  class="meal-item position-relative rounded-3 overflow-hidden"
                >
                  <picture class="meal-img">
                    <img src="${meal.strMealThumb}" alt="Meal" class="w-100" />
                  </picture>
                  <div
                    class="meal-layer d-flex justify-content-left align-items-center position-absolute top-100 start-0 w-100 h-100 p-3"
                  >
                    <h4>${meal.strMeal}</h4>
                  </div>
                </div>
              </div>`;
      });
      document.querySelector(".container .row").innerHTML = mealsContainer;
    });
};

getMealsByName("");

$("ul li");

const getMealsByCategory = () => {};
const getCategories = () => {
  let categoriesContainer = ``;
  fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then((resp) => resp.json())
    .then((categories) => {
      categories.categories.forEach(
        (category) =>
          (categoriesContainer += `<div class="col-md-3">
      <div
        class="meal-item position-relative rounded-3 overflow-hidden"
      >
        <picture class="meal-img">
          <img src="${category.strCategoryThumb}" alt="Meal" class="w-100" />
        </picture>
        <div
          class="meal-layer d-flex flex-column justify-content-center align-items-center position-absolute top-100 start-0 w-100 h-100 p-3"
        >
          <h4>${category.strCategory}</h4>
          <p style="font-size:12px">${category.strCategoryDescription.split('.')[0]}</p>
        </div>
      </div>
    </div>`)
      );
      document.querySelector(".container .row").innerHTML = categoriesContainer;
    });
};
// getCategories();
