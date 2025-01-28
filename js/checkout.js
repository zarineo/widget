const stages = document.querySelectorAll(".stage");
const changeButtons = document.querySelectorAll(".stage .change-button");
const button = document.querySelector(".form-button");

let stage = 0;

// возврат на прошлый этап
changeButtons.forEach((item, index) => {
  item.addEventListener("click", () => {
    stage = index;
    button.innerHTML = "Далее";
    stages.forEach((stage, i) => {
      if (i === index) {
        stage.classList.remove("filled");
      } else if (i > index) {
        stage.classList.remove("is--active");
        stage.classList.remove("filled");
      }
    });
  });
});

// кнопка далее
button.addEventListener("click", (e) => {
  e.preventDefault();
  if (stage < 3 && checkValidations(stage)) {
    stage++;
    stages[stage].classList.add("is--active");
    if (stage === 3) {
      button.innerHTML = "Оплатить";
    }
  }
});

function checkValidations(stage) {
  const activeStage = stages[stage];
  if (stage === 0) {
    const { data, isValid } = checkUserInfoValidation(activeStage);
    if (isValid) {
      activeStage.classList.add("filled");
      activeStage.querySelector(".filled-v .name").textContent = data.name;
      activeStage.querySelector(".filled-v .surname").textContent =
        data.surname;
      activeStage.querySelector(".filled-v .patronymic").textContent =
        data.patronymic;
      activeStage.querySelector(".filled-v .email").textContent = data.email;
      activeStage.querySelector(".filled-v .phone").textContent = data.phone;
    }
    return isValid;
  }

  return false;
}

// валидация данных получателя
function checkUserInfoValidation(activeStage) {
  const name = activeStage.querySelector("#name-input");
  const surname = activeStage.querySelector("#surname-input");
  const patronymic = activeStage.querySelector("#patronymic-input");
  const email = activeStage.querySelector("#email-input");
  const phone = activeStage.querySelector("#phone-input");

  let isValid = true;

  if (!checkText(name)) {
    isValid = false;
  }

  if (!checkText(surname)) {
    isValid = false;
  }

  if (!checkText(patronymic)) {
    isValid = false;
  }

  if (!checkEmail(email)) {
    isValid = false;
  }

  if (!checkPhone(phone)) {
    isValid = false;
  }

  return {
    isValid,
    data: {
      name: name.querySelector("input").value,
      surname: surname.querySelector("input").value,
      patronymic: patronymic.querySelector("input").value,
      email: email.querySelector("input").value,
      phone: phone.querySelector("input").value,
    },
  };
}

function checkText(item) {
  const input = item.querySelector("input");
  const errorLine = item.querySelector(".error-message__text");
  const namePattern = /^[А-Яа-я-]{2,}$/;

  if (namePattern.test(input.value.trim())) {
    item.classList.remove("is--error");
    return true;
  }

  item.classList.add("is--error");

  if (input.value.length === 0) {
    errorLine.textContent = "Поле не может быть пустым";
    return false;
  }

  if (input.value.length < 3) {
    errorLine.textContent = "Поле не может содержать меньше двух символов";
    return false;
  }

  if (!namePattern.test(input.value.trim())) {
    errorLine.textContent =
      'Поле может содержать только кириллицу и символ "-"';
    return false;
  }
}

function checkEmail(item) {
  const input = item.querySelector("input");
  const errorLine = item.querySelector(".error-message__text");

  if (validateEmail(input.value.trim())) {
    item.classList.remove("is--error");
    return true;
  }

  item.classList.add("is--error");

  if (input.value.trim().length === 0) {
    errorLine.textContent = "Поле не может быть пустым";
  } else {
    errorLine.textContent = "Введите правильный email";
  }

  return false;
}

function checkPhone(item) {
  const input = item.querySelector("input");
  const errorLine = item.querySelector(".error-message__text");

  if (validatePhoneNumber(input.value.trim())) {
    item.classList.remove("is--error");
    return true;
  }

  item.classList.add("is--error");

  if (input.value.trim().length === 0) {
    errorLine.textContent = "Поле не может быть пустым";
  } else {
    errorLine.textContent = "Введите правильный телефон";
  }

  return false;
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhoneNumber(phoneNumber) {
  // Удаление пробелов и дефисов из номера телефона
  const cleanedPhoneNumber = phoneNumber.replace(/[\s-]/g, "");

  // Регулярное выражение для проверки формата номера
  const phoneRegex = /^(\d{3})(\d{3})(\d{2})(\d{2})$/;

  // Проверка формата номера
  return phoneRegex.test(cleanedPhoneNumber);
}

// валидация адреса получателя
function checkUserAddressValidation(activeStage) {
  const countrySelect = activeStage.querySelector(".select.country-select");
  const inputCity = activeStage.querySelector("#city-input");
  const inputStreet = activeStage.querySelector("#street-input");
  const inputHome = activeStage.querySelector("#home-input");
  const inputApartment = activeStage.querySelector("#apartment-input");

  let isValid = true;

  if (!checkText(name)) {
    isValid = false;
  }

  if (!checkText(surname)) {
    isValid = false;
  }

  if (!checkText(patronymic)) {
    isValid = false;
  }

  if (!checkEmail(email)) {
    isValid = false;
  }

  if (!checkPhone(phone)) {
    isValid = false;
  }

  return {
    isValid,
    data: {
      name: name.querySelector("input").value,
      surname: surname.querySelector("input").value,
      patronymic: patronymic.querySelector("input").value,
      email: email.querySelector("input").value,
      phone: phone.querySelector("input").value,
    },
  };
}

// ввод адреса

let country = "";
const city = "";

const cityInput = document.querySelector("#city-input input").value;

const countrySelect = document.querySelector(".select.country-select");
const countrySelectPreview = countrySelect.querySelector(".select-preview");
const countrySelectBlock = countrySelect.querySelector(".select-items");
const countrySelectItems = countrySelect.querySelectorAll(".select-item");

const inputCity = document.querySelector(".stage #city-input");
const inputCityTips = inputCity.querySelector("datalist");

countrySelectPreview.addEventListener("click", () => {
  countrySelectBlock.classList.toggle("is--active");
});

// выбор страны
countrySelectItems.forEach((item) => {
  item.addEventListener("click", () => {
    countrySelectItems.forEach((otherItem) => {
      otherItem.classList.remove("is--active");
    });
    countrySelectPreview.textContent = item.textContent;
    country = item.textContent;
    item.classList.add("is--active");
    countrySelectBlock.classList.remove("is--active");
    inputCity.classList.remove("disabled");
    inputCity.querySelector("input").disabled = false;
  });
});

inputCity.querySelector("input").addEventListener("input", (event) => {
  const url =
    "http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
  const token = "52f5fea4e58e7ddc49b94af98475bb870f8d6ef8";
  const value = event.target.value;

  let options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Token " + token,
    },
    body: JSON.stringify({
      query: value,
      locations: [{ country }],
      count: 5,
    }),
  };

  fetch(url, options)
    .then((response) => response.text())
    .then((result) => {
      const cityTips = JSON.parse(result).suggestions;
      inputCityTips.innerHTML = "";

      cityTips.forEach((city) => {
        const option = document.createElement("option");
        option.value = city.value;
        inputCityTips.appendChild(option);
      });
    })
    .catch((error) => console.log("error", error));
});
