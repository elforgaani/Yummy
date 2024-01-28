function toggleNavBar(position) {
  $("aside").animate({ left: `${position}` }, 500);
}

$(window).on("load", () => {
  $(".loading-spinner").fadeOut(1000);
});
const showLoadingScreen = () => {

}

const openSideNavBar = () => {
  toggleNavBar(0);
  $("#nav-btn").removeClass("fa-bars");
  $("#nav-btn").addClass("fa-x");
  $("ul li").animate({ top: "0" }, 700);
};
const closeSideNavBar = () => {
  toggleNavBar('-18.75%');
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
                  class="meal-item position-relative rounded-3 overflow-hidden" onclick="displayMealInfo(${meal})"
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

const getMealsByCategory = () => { };
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
const getAreas = () => {
  let areasContainer = ``;
  fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`).then((resp) => resp.json()).then((areas) => {
    areas.meals.forEach((area) => {
      areasContainer += `
      <div class="col-md-3">
      <div class="area-item d-flex flex-column justify-content-center align-items-center" onclick="getMealsByArea('${area.strArea}')">
      <i class="fa-solid fa-house-laptop fa-4x text-light"></i>
      <h4 class="text-light">${area.strArea}</h4>
      </div>
    </div>
      `
    })
    document.querySelector(".container .row").innerHTML = areasContainer;
    let mealsItems = document.querySelectorAll('.meal-item')


  })
}

const getMealsByArea = (area) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`).then((resp) => resp.json()).then((meals) => {
    let mealsContainer = ``;
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
    </div>`
    })
    document.querySelector(".container .row").innerHTML = mealsContainer;
  })
}

const getIngredients = () => {
  fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list').then((resp) => resp.json()).then((ingredients) => {
    let ingredientsContainer = ``;
    console.log(ingredients)
    ingredients.meals.forEach((ingredient) => {

      ingredientsContainer += `
      <div class="col-md-3">
      <div class="area-item d-flex flex-column justify-content-between align-items-center" onclick="getMealsByIngredient('${ingredient.strIngredient}')" >
      <i class="fa-solid fa-drumstick-bite fa-4x text-light"></i>
      <h4 class="text-light">${ingredient.strIngredient}</h4>
      <p class="text-light text-center">${!ingredient.strDescription ? '' : ingredient.strDescription.split('.')[0]}</p>
      </div>
    </div>
      `
    })
    console.log(ingredientsContainer)
    document.querySelector(".container .row").innerHTML = ingredientsContainer;
  })
}

const getMealsByIngredient = (ingrediant) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediant}`).then((resp) => resp.json()).then(meals => {
    let mealsContainer = ``;
    meals.meals.forEach((meal) => {
      mealsContainer += `
      <div class="col-md-3">
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
    </div>
      `
    })
    document.querySelector(".container .row").innerHTML = mealsContainer;

  })
}

const searchSection = () => {
  document.getElementById('main-section').innerHTML = `
  <div class="container">
    <div class="row gy-3">
      <div class="col-md-6">
        <div class="search-input "> <input id="name-search" class="form-control custom-input" type="text" name="name" placeholder="Search By Name">
        </div>
      </div>
      <div class="col-md-6">
        <div class="search-input "> <input id="letter-search" class="form-control custom-input" type="text" name="letter"
            placeholder="Search By Letter">
        </div>

      </div>
    </div>
    <div class="row gy-4 my-4" id="meals-results"></div>
  </div>`
  document.getElementById('name-search').addEventListener('keyup', () => {
    console.log(document.getElementById('name-search').value)
    searchMealByName(document.getElementById('name-search').value);
  });
  document.getElementById('letter-search').addEventListener('keyup', () => {
    searchByFirstLetter(document.getElementById('letter-search').value);

  })
}
const searchMealByName = (mealName) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`).then(resp => resp.json()).then((meal) => {
    let mealsContainer = ``
    meal.meals.forEach(meal => {
      mealsContainer += `
      <div class="col-md-3">
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
    </div>`
    })
    document.getElementById('meals-results').innerHTML = mealsContainer ? mealsContainer : '';
  })

}




const searchByFirstLetter = (letter) => {

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter ?? ''}`).then(resp => resp.json()).then((meals) => {
    let mealsContainer = ``
    meals.meals.forEach(meal => {
      mealsContainer += `
      <div class="col-md-3">
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
    </div>`
    })
    document.getElementById('meals-results').innerHTML = mealsContainer ? mealsContainer : '';
  })
}

const displayMealInfo = (meal) => {
  document.querySelector('.container .row').innerHTML = `
  <div class="col-md-4">
              <div class="meal-img">
                <img src="${meal.strMealThumb}" alt="Meal" class="w-100 rounded-3">
                <h4 class="text-light">${meal.strMeal}</h4>
              </div>
            </div>
            <div class="col-md-8">
              <div class="meal-info">
                <h4 class="text-light">Instruction</h4>
                <p class="text-light">${meal.strInstructions}</p>
                <div class="d-flex align-items-center ">
                  <h4 class="text-light">Area: </h4><span class="text-light">Turkish</span>
                </div>
                <div class="d-flex align-items-center">
                  <h4 class="text-light">Category: </h4><span class="text-light">Turkish</span>
                </div>
                <h4 class="text-light">Recipes: </h4>
                <div class="ingrediants d-flex justify-content-start align-items-center">
                  <h6 class="rounded-2 p-2"> Mohamed</h6>
                </div>
                <div class="buttons my-4">
                  <a href="${meal.strYoutube}" target="_blank" class="btn btn-success">Youtube</a>
                  <a href="" target="_blank" class="btn btn-danger">Youtube</a>
                </div>
              </div>

            </div>
  `
}

const formContent = () => {
  document.getElementById('main-section').innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <div class="form-field-input"><input id="name-field" onkeyup="inputsValidate()" type="text" class="form-control" placeholder="Enter Name">
                <div id="name-error" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div></div>
            </div>
            <div class="col-md-6">
            <div class="form-field-input"><input id="email-field" onkeyup="inputsValidate()" type="email" class="form-control " placeholder="Enter Email">
            <div id="email-error" class="alert alert-danger w-100 mt-2 d-none">
                Email not valid *exemple@yyy.zzz
            </div></div>
            </div>
            <div class="col-md-6">
            <div class="form-field-input"><input id="phone-field" onkeyup="inputsValidate()" type="text" class="form-control " placeholder="Enter Phone">
            <div id="phone-error" class="alert alert-danger w-100 mt-2 d-none">
                Enter valid Phone Number
            </div></div>
            </div>
            <div class="col-md-6">
            <div class="form-field-input"><input id="age-field" onkeyup="inputsValidate()" type="number" class="form-control " placeholder="Enter Age">
            <div id="age-error" class="alert alert-danger w-100 mt-2 d-none">
                Enter valid age
            </div></div>
            </div>
            <div class="col-md-6">
            <div class="form-field-input"> <input  id="password-field" onkeyup="inputsValidate()" type="password" class="form-control " placeholder="Enter Password">
            <div id="password-error" class="alert alert-danger w-100 mt-2 d-none">
                Enter valid password *Minimum eight characters, at least one letter and one number:*
            </div></div>
            </div>
            <div class="col-md-6">
            <div class="form-field-input"><input  id="repassword-field" onkeyup="inputsValidate()" type="password" class="form-control " placeholder="Repassword">
            <div id="repassword-error" class="alert alert-danger w-100 mt-2 d-none">
                Enter valid repassword 
            </div></div>
            </div>
        </div>
        <button id="submit-button" disabled class="btn btn-outline-danger mt-4 px-3 ">Submit</button>
    </div>
</div> `


  document.getElementById("name-field").addEventListener("focus", () => {
    nameFieldFocus = true
  })

  document.getElementById("email-field").addEventListener("focus", () => {
    emailFieldFocus = true
  })

  document.getElementById("phone-field").addEventListener("focus", () => {
    phoneFieldFocus = true
  })

  document.getElementById("age-field").addEventListener("focus", () => {
    ageFieldFocus = true
  })

  document.getElementById("password-field").addEventListener("focus", () => {
    passwordFieldFocus = true
  })

  document.getElementById("repassword-field").addEventListener("focus", () => {
    repasswordFieldFocus = true
  })
}

let nameFieldFocus = false;
let emailFieldFocus = false;
let phoneFieldFocus = false;
let ageFieldFocus = false;
let passwordFieldFocus = false;
let repasswordFieldFocus = false;

const inputsValidate = () => {
  if (nameFieldFocus) {
    if (nameValidation()) {
      document.getElementById("name-error").classList.replace("d-block", "d-none")

    } else {
      document.getElementById("name-error").classList.replace("d-none", "d-block")

    }
  }
  if (emailFieldFocus) {

    if (emailValidation()) {
      document.getElementById("email-error").classList.replace("d-block", "d-none")
    } else {
      document.getElementById("email-error").classList.replace("d-none", "d-block")

    }
  }

  if (phoneFieldFocus) {
    if (phoneValidation()) {
      document.getElementById("phone-error").classList.replace("d-block", "d-none")
    } else {
      document.getElementById("phone-error").classList.replace("d-none", "d-block")

    }
  }

  if (ageFieldFocus) {
    if (ageValidation()) {
      document.getElementById("age-error").classList.replace("d-block", "d-none")
    } else {
      document.getElementById("age-error").classList.replace("d-none", "d-block")

    }
  }

  if (passwordFieldFocus) {
    if (passwordValidation()) {
      document.getElementById("password-error").classList.replace("d-block", "d-none")
    } else {
      document.getElementById("password-error").classList.replace("d-none", "d-block")

    }
  }
  if (repasswordFieldFocus) {
    if (repasswordValidation()) {
      document.getElementById("repassword-error").classList.replace("d-block", "d-none")
    } else {
      document.getElementById("repassword-error").classList.replace("d-none", "d-block")

    }
  } (nameValidation() && emailValidation() && phoneValidation() && ageValidation() && passwordValidation() && repasswordValidation()) ? $('#submit-button').removeAttr('disabled') : $('#submit-button').attr('disabled', true)
}

const nameValidation = () => (/^[a-zA-Z ]+$/.test(document.getElementById("name-field").value))


const emailValidation = () => (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("email-field").value))


const phoneValidation = () => (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phone-field").value))


const ageValidation = () => (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("age-field").value))


const passwordValidation = () => (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("password-field").value))


const repasswordValidation = () => document.getElementById("repassword-field").value == document.getElementById("password-field").value

