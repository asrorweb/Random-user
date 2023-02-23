const form = document.getElementById("form");
const formButton = document.getElementById("form__button");
const user = document.getElementById("user");
const deleteBtn = document.getElementById("delete__btn");
const clearBtn = document.getElementById("clear__button");

// error-massage
let errorMassage = document.getElementById("error-massage");

/*
UZ: localStoragega yozish uchun object
En: object to write to localStorage
Ru: объект для записи в localStorage
*/
let cardList = localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : [];

if (cardList) {
    user.innerHTML = "";
    cardList.forEach((car) => {
        createCardFromLocalStorage(car);
    });
}

// clear btn
clearBtn.addEventListener("click", () => {
    clearCards();
});

// search form
form["form__input"].addEventListener("input", (e) => {
    user.innerHTML = "";

    cardList.forEach((card) => {
        const { gender, dob, location, name } = card;
        let searchValue = e.target.value.toLowerCase().trim();

        if (
            String(dob.age).includes(String(searchValue)) ||
            gender.includes(searchValue) ||
            location.city.toLowerCase().includes(searchValue) ||
            location.country.toLowerCase().includes(searchValue) ||
            name.first.toLowerCase().includes(searchValue) ||
            name.last.toLowerCase().includes(searchValue) ||
            name.title.toLowerCase().includes(searchValue)
        ) {
            createCardFromLocalStorage(card);
        }
    });
});

/*
UZ: eski malumotni anig'rog'i localStorage dan olib card yaratadi
En: creates a card by taking the old data from localStorage
Ru: создает карту, взяв старые данные из localStorage
*/
function createCardFromLocalStorage(card) {
    const { gender, dob, location, name, picture, index } = card;

    user.innerHTML += `
        <li class="user__item">
            <button onclick = "deleteCard(${index})" id="delete__btn" class="user__delete--btn">
                <i class="fas fa-trash"></i>
            </button>
            <img
                class="user__img"
                alt="User photo"
                src="${picture.large}"
                width="100"
                height="100"
            />
            <div class="user__name">
                <span class="material-symbols-outlined"
                    >badge</span
                >
                <span>- ${name.title}, ${name.first}, ${name.last}</span>
            </div>
            <div class="user__year">
                <span class="material-symbols-outlined"
                    >cake</span
                >
                <span>- ${dob.age} years old.</span>
            </div>
            <div class="user__location">
                <span class="material-symbols-outlined"
                    >person_pin_circle</span
                >
                <span>-${location.city}, ${location.country}</span>
            </div>
            <div class="user__gender">
                <span class="material-symbols-outlined"
                    >man</span
                >
                <span>- ${gender}</span>
            </div>
        </li>
        
        `;
}

/*
UZ: Api dan kelgan malumotni  olib card yaratadi 
En: Creates a card by taking information from the api
Ru: Создает карту, беря информацию из API
*/
function createCard(data) {
    cardList = [];
    localStorage.setItem("users", JSON.stringify(cardList));

    user.innerHTML = "";
    data.results.forEach((element, i) => {
        const { gender, dob, location, name, picture } = element;

        let userInfo = {
            index: i,
            gender: gender,
            dob: dob,
            location: location,
            name: name,
            picture: picture,
        };

        cardList.push(userInfo);
        localStorage.setItem("users", JSON.stringify(cardList));

        user.innerHTML += `
        <li class="user__item">
            <button onclick = "deleteCard(${i})" id="delete__btn" class="user__delete--btn">
                <i class="fas fa-trash"></i>
            </button>
            <img
                class="user__img"
                alt="User photo"
                src="${picture.large}"
                width="100"
                height="100"
            />
            <div class="user__name">
                <span class="material-symbols-outlined"
                    >badge</span
                >
                <span>- ${name.title}, ${name.first}, ${name.last}</span>
            </div>
            <div class="user__year">
                <span class="material-symbols-outlined"
                    >cake</span
                >
                <span>- ${dob.age} years old.</span>
            </div>
            <div class="user__location">
                <span class="material-symbols-outlined"
                    >person_pin_circle</span
                >
                <span>-${location.city}, ${location.country}</span>
            </div>
            <div class="user__gender">
                <span class="material-symbols-outlined"
                    >man</span
                >
                <span>- ${gender}</span>
            </div>
        </li>
        
        `;
    });
}

// clear container
function clearCards() {
    user.innerHTML = "";
    cardList = [];
    localStorage.setItem("users", JSON.stringify(cardList));
}

// error message
function errorCard() {
    clearCards();
    errorMassage.classList.remove("hidden");
}

// delete card
function deleteCard(id) {
    user.innerHTML = "";
    form["form__input"].value = "";

    let newarr = cardList.filter((card) => {
        return card.index !== id;
    });

    cardList = newarr;
    localStorage.setItem("users", JSON.stringify(cardList));

    cardList.forEach((car) => {
        createCardFromLocalStorage(car);
    });
}
