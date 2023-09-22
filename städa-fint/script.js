const bookingForm = document.getElementById("booking-form");
const bookingsContainer = document.getElementById("bookings-list");
const completedContainer = document.getElementById("completed-list");

const cleanerInput = bookingForm["cleaner"];
const dateInput = bookingForm["date"];
const timeInput = bookingForm["time"];
const levelInput = bookingForm["level"];

// Två tomma arrayer som deklareras. En för bokningar och en för utförda städningar
let bookings = [];
let completed = [];

// En klass som genererar ett bokninsobjekt vid submit av formulärdata
class Booking {
  constructor(id, date, time, customer, level, cleaner, status) {
    this.id = id;
    this.date = date;
    this.time = time;
    this.customer = customer;
    this.level = level;
    this.cleaner = cleaner;
    this.status = false;
  }
}

// Hämtar json data
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    // Kallar på en funktion som sorterar data efter datum
    sortArray(data);

    // Fördelar objekten till de olika arrayerna baserat på status
    data.forEach((obj) => {
      obj.status ? completed.push(obj) : bookings.push(obj);
    });
    
    // Kallar på funktion som pushar,skapar och appendar elementen i respektive array
    bookings.forEach(createBookingElement);
    completed.forEach(createCompletedElement);

    // Kallar på funktion som dynamisk visar kundens namn
    customerTitle(data[0].customer);
  });

//=============================================================================================================================




// Funktion som skapar element för bokade städningar som sedan pushas och appendas till rätt array och div element
const createBookingElement = ({ id, cleaner, date, time, level }) => {
  // Skapar HTML-element
  const bookingListItem = document.createElement("li");
  bookingListItem.classList.add("booking-list-item");
  bookingListItem.dataset.id = id;
  const cleanerElement = document.createElement("p");
  const dateElement = document.createElement("p");
  const timeElement = document.createElement("p");
  const levelElement = document.createElement("p");
  const deleteBooking = document.createElement("button");
  deleteBooking.classList.add("delete");

  // Fyller elementen med innehåll
  cleanerElement.innerText = cleaner;
  dateElement.innerText = date;
  timeElement.innerText = time;
  levelElement.innerText = level;
  deleteBooking.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

  // Appendar elementen till list-elementet
  bookingListItem.append(
    cleanerElement,
    dateElement,
    timeElement,
    levelElement,
    deleteBooking
  );

  // Appendar listan till DOM
  bookingsContainer.appendChild(bookingListItem);

  // Raderar bokningar
  bookingListItem.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
      const elementId = e.target.parentElement.getAttribute("data-id");
      const findId = bookings.find((obj) => obj.id === +elementId);
      bookings.splice(bookings.indexOf(findId), 1);
      e.target.parentElement.remove();
    }
  });
};

//=============================================================================================================================

// Funktion som skapar element för utförda städningar som sedan pushas och appendas till rätt array och div element
const createCompletedElement = ({ cleaner, date, time, level }) => {
  // Skapar HTML-element
  const bookingListItem = document.createElement("li");
  bookingListItem.classList.add("booking-list-item");
  const checkboxElement = document.createElement("input");
  checkboxElement.setAttribute("type", "checkbox");
  const cleanerElement = document.createElement("p");
  const dateElement = document.createElement("p");
  const timeElement = document.createElement("p");
  const levelElement = document.createElement("p");

  // Fyller elementen med innehåll
  cleanerElement.innerText = cleaner;
  dateElement.innerText = date;
  timeElement.innerText = time;
  levelElement.innerText = level;

  // Appendar elementen till list-elementet
  bookingListItem.append(
    checkboxElement,
    cleanerElement,
    dateElement,
    timeElement,
    levelElement
  );

  // Appendar listan till DOM
  completedContainer.appendChild(bookingListItem);
};

//=============================================================================================================================

//Formulär submit
bookingForm.addEventListener("submit", (e) => {
  // Hindrar sidan från att ladda om vid submit av formuläret
  e.preventDefault();

  // Skapar ett nytt bokningsobjekt med värden från formuläret
  const newBooking = new Booking(
    Math.floor(Math.random() * (1000 - 8)) + 8,
    dateInput.value,
    timeInput.value,
    bookings[0].customer,
    levelInput.value,
    cleanerInput.value,
    false
  );

  // Kollar om den nya bokningen matchar en redan tillagd bokning baserat på datum, tid och städare
  const doubleBooked = bookings.find(
    (obj) =>
      obj.date === newBooking.date &&
      obj.time === newBooking.time &&
      obj.cleaner === newBooking.cleaner
  );

  // Villkor som lägger till bokningen i listan om den inte redan finns där
  doubleBooked
    ? alert("Städaren är inte tillgänglig vid den valda tidpunkten")
    : bookings.push(newBooking);
  // Kallar en funktion som sorterar arrayen
  sortArray(bookings);
  // Tömmer ul-elemententet
  bookingsContainer.innerHTML = "";
  // Skapar en ny lista
  bookings.forEach(createBookingElement);
  // Nollställer formuläret efter submit
  bookingForm.reset();
  console.log(bookings);
});

//=============================================================================================================================

// Dynamisk titel
function customerTitle(customer) {
  const title = document.getElementById("title");
  title.innerText = `${customer}s bokningssida`;
}

// Radera utförda och icheckade bokningar
document.getElementById("delete-completed").addEventListener("click", () => {
  document
    .querySelectorAll('input[type="checkbox"]:checked')
    .forEach((element) => {
      element.parentElement.remove();
    });
});

// Funktion som tar in en array som parameter och sorterar den efter datum
const sortArray = (array) => {
  array.sort((a, b) => {
    if (a.date < b.date) {
      return -1;
    } else if (b.date > a.date) {
      return 1;
    } else {
      return 0;
    }
  });
  
};
