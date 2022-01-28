let elResult = document.querySelector(".movies__result");
let elList = document.querySelector(".movies__list");
let elSelect = document.querySelector(".card__select");
let elForm = document.querySelector(".form");
let elListBokkmark = document.querySelector(".list-bookmark");
let elModal = document.querySelector(".popap");
let elModalInfo = document.querySelector(".modal--info");
let elModalInfoGenre = document.querySelector(".modal--genre");
let elSearchInfo = document.querySelector(".input--search");
let elSearchReating = document.querySelector(".input--reating");

//BOOKMARKS yaratish uchun funksiya
let renderBookmark = (bookmarksArr, element) => {
  bookmarksArr.forEach((bookmark) => {
    let newBookmarkItem = document.createElement("li");
    let newBookmarkRemoveBtn = document.createElement("button");

    newBookmarkRemoveBtn.setAttribute(
      "class",
      "btn btn-danger mt-2 btn-remove"
    );
    newBookmarkItem.setAttribute(
      "class",
      "list-group-item d-flex flex-column align-items-start"
    );
    newBookmarkItem.textContent = bookmark.title;

    newBookmarkItem.dataset.idBookmarkItem = bookmark.imdbId;
    newBookmarkRemoveBtn.dataset.idBookmarkRemove = bookmark.imdbId;

    newBookmarkRemoveBtn.textContent = "Remove";
    element.appendChild(newBookmarkItem);
    newBookmarkItem.appendChild(newBookmarkRemoveBtn);
  });
};

//Janrlarni select ichiga chiqarish uchun funksiya
elResult.textContent = movies.length;
// BOOKMARKLAR UCHUN ARRAY
const bookmarksLocal = JSON.parse(window.localStorage.getItem("bookmarks"));
let abc = bookmarksLocal || [];
renderBookmark(abc, elListBokkmark);
const generateGenres = (films) => {
  const allGenres = [];

  films.forEach((film) => {
    film.categories.forEach((categorie) => {
      if (!allGenres.includes(categorie)) allGenres.push(categorie);
    });
  });

  allGenres.forEach((genre) => {
    let newGenreOption = document.createElement("option");

    newGenreOption.textContent = genre;
    newGenreOption.value = genre;

    elSelect.appendChild(newGenreOption);
  });
};

//Cardlarni yaratish uchun funksiya
let film = (films) => {
  for (let movie of films) {
    //CEREAT
    let newItem = document.createElement("li");
    let newCrad = document.createElement("div");
    let newImg = document.createElement("img");
    let newCardBody = document.createElement("div");
    let newCardTitle = document.createElement("h5");
    let newCardDate = document.createElement("p");
    let newCardRating = document.createElement("p");
    let newCardLanguage = document.createElement("p");
    let newBtnTrailer = document.createElement("a");
    let newBtnBookmark = document.createElement("button");
    let newBtnContainer = document.createElement("div");
    let newBtnMoreInfo = document.createElement("button");

    newBtnBookmark.dataset.btn = movie.imdbId;
    newBtnMoreInfo.dataset.modalBtnId = movie.imdbId;

    //SET ATRIBUTE
    newItem.setAttribute("class", "movies__item mb-2");
    newCrad.setAttribute("class", "movies__card card h-100");
    newImg.setAttribute("class", "card-img-top");
    newImg.setAttribute("src", movie.smallThumbnail);
    newCardBody.setAttribute("class", "card-body d-flex flex-column");
    newCardTitle.setAttribute("class", "card-title");
    newCardDate.setAttribute("class", "card__time");
    newCardRating.setAttribute("class", "card__mark");
    newBtnContainer.setAttribute(
      "class",
      "mt-auto d-flex justify-content-around flex-wrap"
    );
    newBtnTrailer.setAttribute("class", "btn btn-outline-primary ");
    newBtnTrailer.setAttribute(
      "href",
      `https://www.youtube.com/watch?v=${movie.youtubeId}`
    );
    newBtnTrailer.setAttribute("target", `_blank`);
    newBtnBookmark.setAttribute(
      "class",
      "btn btn-outline-success btn-bookmark"
    );
    newBtnMoreInfo.setAttribute("class", "btn btn-outline-info mt-3 btn--info");

    //TEXT CONTENT
    newCardTitle.textContent = movie.title;
    newCardDate.textContent = movie.year;
    newCardRating.textContent = movie.imdbRating;
    newCardLanguage.textContent = movie.language;
    newBtnTrailer.textContent = "Watch trailer";
    newBtnBookmark.textContent = "Bookmark";
    newBtnMoreInfo.textContent = "More info";

    //APPEND CHILD

    elList.appendChild(newItem);
    newItem.appendChild(newCrad);
    newCrad.appendChild(newImg);
    newCrad.appendChild(newCardBody);
    newCardBody.appendChild(newCardTitle);
    newCardBody.appendChild(newCardDate);
    newCardBody.appendChild(newCardRating);
    newCardBody.appendChild(newCardLanguage);
    newCardBody.appendChild(newBtnContainer);
    newBtnContainer.appendChild(newBtnTrailer);
    newBtnContainer.appendChild(newBtnBookmark);
    newBtnContainer.appendChild(newBtnMoreInfo);
    // Bookmark buttunga quloq solinayapdi ya'ni bookmark button bosilganda push qiladi
    newBtnContainer.addEventListener("click", (evt) => {
      let modalArr = [];
      if (evt.target.matches(".btn-bookmark")) {
        let bookmarkId = evt.target.dataset.btn;
        if (!abc.includes(movie)) {
          if (movie.imdbId == bookmarkId) {
            abc.push(movie);
          }
        } else {
          alert("Bu kino eslatmalarga qo`shilgan!");
        }
      } else if (evt.target.matches(".btn--info")) {
        elModal.style.display = "block";
        let modalId = evt.target.dataset.modalBtnId;
        if (movie.imdbId == modalId) {
          modalArr.push(movie);
        }
      }
      for (let movie of modalArr) {
        elModalInfoGenre.textContent = "Categories: " + movie.categories;
        elModalInfo.textContent = movie.summary;
      }
      elListBokkmark.innerHTML = "";
      renderBookmark(abc, elListBokkmark);
      window.localStorage.setItem("bookmarks", JSON.stringify(abc));
    });
  }
};
//Bookmark larni o`chirish uchun funksiya
elListBokkmark.addEventListener("click", (evt) => {
  if (evt.target.matches(".btn-remove")) {
    let bookmarkRemoveId = evt.target.dataset.idBookmarkRemove;
    const foundBookmarkIndex = abc.findIndex(
      (movie) => movie.imdbId === bookmarkRemoveId
    );
    abc.splice(foundBookmarkIndex, 1);
    elListBokkmark.innerHTML = "";
    renderBookmark(abc, elListBokkmark);
    window.localStorage.setItem("bookmarks", JSON.stringify(abc));
  }
});
//modal yo`q bo`lishi uchun funksiya
window.onclick = (evt) => {
  if (evt.target.matches(".popap")) {
    elModal.style.display = "none";
  }
  if (evt.target.matches(".close")) {
    elModal.style.display = "none";
  }
};
document.addEventListener("keydown", (evt) => {
  if (evt.keyCode == "27") {
    elModal.style.display = "none";
  }
});

//Janrlarni chiqarish uchun funksiya
film(movies);
elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  let searchValue = elSearchInfo.value.trim();
  let searchReatingValue = elSearchReating.value.trim();
  elList.innerHTML = null;

  let filteredFilms = movies.filter((movie) => {
    return (
      (movie.categories.includes(elSelect.value) || elSelect.value == "All") &&
      movie.title.toLowerCase().includes(searchValue.toLowerCase()) &&
      Math.floor(movie.imdbRating) == searchReatingValue
    );
  });

  /*   for (let film of movies) {
    if (film.categories.includes(elSelect.value) || elSelect.value == "All") {
      filteredFilms.push(film);
    }
  } */

  film(filteredFilms);

  elResult.textContent = filteredFilms.length;
});

elSearchInfo.oninput = (evt) => {
  evt.preventDefault();
  let searchValue = elSearchInfo.value.trim();
  let searchBox = movies.filter((movie) => {
    return movie.title.toLowerCase().includes(searchValue.toLowerCase());
  });
  elList.innerHTML = "";
  film(searchBox);
  elResult.textContent = searchBox.length;
};
elSearchReating.oninput = (evt) => {
  evt.preventDefault();
  let searchReatingValue = elSearchReating.value.trim();
  let reatingBox = movies.filter((movie) => {
    return Math.floor(movie.imdbRating) == searchReatingValue;
  });
  elList.innerHTML = "";
  film(reatingBox);
  elResult.textContent = reatingBox.length;
};

generateGenres(movies);
