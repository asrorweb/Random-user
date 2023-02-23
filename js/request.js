//api
const API = "https://randomuser.me/api/?results=9";

// for leader
const overlay = document.getElementById("overlay");

// refresh btn
const refreshBtn = document.getElementById("form__button");

const getInfo = (API) => {
    return new Promise((resolve, reject) => {
        request = new XMLHttpRequest();

        request.addEventListener("readystatechange", () => {
            if (request.readyState != 4) {
                overlay.classList.remove("hidden");
            } else if (request.status == 200 && request.readyState == 4) {
                resolve(JSON.parse(request.responseText));
                overlay.classList.add("hidden");
            } else if (request.readyState == 4) {
                reject();
                overlay.classList.add("hidden");
            }
        });

        request.open("GET", API);
        request.send();
    });
};

// refresh btn => new card new users
refreshBtn.addEventListener("click", () => {
    getInfo(API)
        .then((data) => {
            createCard(data);
        })
        .catch(() => {
            errorCard();
        });
});
