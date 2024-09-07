let contacts;
let longitude;
let latitude;
let map;

document.addEventListener("DOMContentLoaded", () => {
    function initMap() {
        map = L.map('map').setView([0, 0], 2);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    }

    function loadContacts() {
        contacts = document.querySelectorAll(".cnt-btn");

        if (!contacts.length) {
            setTimeout(loadContacts, 100);
            return;
        }
        setupListeners();
        initMap();

        contacts.forEach((contact) => {
            contact.addEventListener("click", () => {
                longitude = parseFloat(contact.parentElement.parentElement.querySelector("#longittude").innerText);
                latitude = parseFloat(contact.parentElement.parentElement.querySelector("#latitude").innerText);

                if (!isNaN(latitude) && !isNaN(longitude)) {
                    map.setView([latitude, longitude], 13);
                    L.marker([latitude, longitude]).addTo(map);
                    // document.querySelector(".map").classList.add("active");
                    map.invalidateSize();
                } else {
                    console.error("Invalid latitude or longitude");
                }
            })
        })
    }

    function setupListeners() {
        const whereBtn = document.querySelector("#root > div > div.result > div:nth-child(1) > div.details > div.detail.where");
        const mapContainer = document.querySelector("#root > div > div.result > div.map");
        const exit = document.querySelector("#map > span");

        if (!whereBtn || !mapContainer) {
            setTimeout(setupListeners, 100);
            return;
        }

        whereBtn.addEventListener("click", (event) => {
            event.preventDefault();
            mapContainer.classList.toggle("active");
            if (mapContainer.classList.contains("active")) {
                map.invalidateSize();
            }
        });

        exit.addEventListener("click", (event) => {
            event.preventDefault();
            if (event.target === exit) {
                mapContainer.classList.toggle("active");
            }
        });
    }

    loadContacts();
});

function getContacts() {
    contacts.forEach((el) => {
        console.log(el.parentElement);
    });
}