let elResult = document.querySelector(".movies__result");
let elList = document.querySelector(".movies__list");
let elSelect = document.querySelector(".card__select");
let elForm = document.querySelector(".form");
let elListBokkmark = document.querySelector(".list-bookmark");
let elModal = document.querySelector(".popap");
let elModalInfo = document.querySelector(".modal--info");

//Janrlarni select ichiga chiqarish uchun funksiya
elResult.textContent = movies.length;
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
  let abc = [];
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
    let newCardList = document.createElement("ul");
    let newBtnBookmark = document.createElement("button");
    let newBtnContainer = document.createElement("div");
    let newBtnMoreInfo = document.createElement("button");

    movie.categories.forEach((genre) => {
      let newCradItem = document.createElement("li");

      newCradItem.textContent = genre;

      newCardList.appendChild(newCradItem);
    });

    newBtnBookmark.dataset.btn = movie.imdbId;
    newBtnMoreInfo.dataset.modalBtnId = movie.imdbId;

    //SET ATRIBUTE
    newItem.setAttribute("class", "movies__item mb-2");
    newCrad.setAttribute("class", "movies__card card h-100");
    newImg.setAttribute("class", "card-img-top");
    newImg.setAttribute("src", movie.smallThumbnail);
    newCardBody.setAttribute("class", "card-body d-flex flex-column");
    newCardTitle.setAttribute("class", "card-title");
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
    newCardBody.appendChild(newCardList);
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
          modalArr.push(movie.summary);
        }
      }
      elModalInfo.textContent = modalArr;
      elListBokkmark.innerHTML = "";
      renderBookmark(abc, elListBokkmark);
    });
  }

  //Bookmark larni o`chirish uchun funksiya
  elListBokkmark.addEventListener("click", (evt) => {
    if (evt.target.matches(".btn-remove")) {
      let bookmarkItemId = evt.target.dataset.idBookmarkItem;
      let bookmarkRemoveId = evt.target.dataset.idBookmarkRemove;
      const foundBookmarkIndex = abc.findIndex(
        () => bookmarkItemId == bookmarkRemoveId
      );
      abc.splice(foundBookmarkIndex, 1);
      elListBokkmark.innerHTML = "";
      renderBookmark(abc, elListBokkmark);
    }
  });
};
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
//BOOKMARKS yaratish uchun funksiya
let renderBookmark = (bookmarks, element) => {
  for (let bookmark of bookmarks) {
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
  }
};
//Modal yaratish uchun funksiya

/* let generateModal = (modalArr, element) => {
  modalArr.forEach((modal) => {
    let newModal = document.createElement("div");
    let newModalContent = document.createElement("div");
    let newModalClose = document.createElement("span");
    let newModalList = document.createElement("ul");
    let newItemSummary = document.createElement("li");

    newModal.setAttribute("class", "popap");
    newModalContent.setAttribute("class", "modal-content");
    newModalClose.setAttribute("class", "close");

    newModalClose.textContent = "&times;";
    newItemSummary.textContent = modal.summary;

    element.appendChild(newModal);
    newModal.appendChild(newModalContent);
    newModalContent.appendChild(newModalClose);
    newModalContent.appendChild(newModalList);
    newModalList.appendChild(newItemSummary);
  });
}; */

//Janrlarni chiqarish uchun funksiya
film(movies);
elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  elList.innerHTML = null;

  let filteredFilms = movies.filter((movie) => {
    return movie.categories.includes(elSelect.value) || elSelect.value == "All";
  });
  /*   for (let film of movies) {
    if (film.categories.includes(elSelect.value) || elSelect.value == "All") {
      filteredFilms.push(film);
    }
  } */
  film(filteredFilms);

  elResult.textContent = filteredFilms.length;
});

generateGenres(movies);
