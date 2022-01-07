let elResult = document.querySelector(".movies__result");
let elList = document.querySelector(".movies__list");

elResult.textContent = movies.length;

for (let movie of movies) {
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

  //SET ATRIBUTE
  newItem.setAttribute("class", "movies__item mb-2");
  newCrad.setAttribute("class", "movies__card card h-100");
  newImg.setAttribute("class", "card-img-top");
  newImg.setAttribute("src", movie.smallThumbnail);
  newCardBody.setAttribute("class", "card-body d-flex flex-column");
  newCardTitle.setAttribute("class", "card-title");
  newBtnTrailer.setAttribute(
    "class",
    "btn btn-outline-primary mt-auto d-inline-block"
  );
  newBtnTrailer.setAttribute(
    "href",
    `https://www.youtube.com/watch?v=${movie.youtubeId}`
  );
  newBtnTrailer.setAttribute("target", `_blank`);

  //TEXT CONTENT
  newCardTitle.textContent = movie.title;
  newCardDate.textContent = movie.year;
  newCardRating.textContent = movie.imdbRating;
  newCardLanguage.textContent = movie.language;
  newBtnTrailer.textContent = "Watch trailer";
  //APPEND CHILD

  elList.appendChild(newItem);
  newItem.appendChild(newCrad);
  newCrad.appendChild(newImg);
  newCrad.appendChild(newCardBody);
  newCardBody.appendChild(newCardTitle);
  newCardBody.appendChild(newCardDate);
  newCardBody.appendChild(newCardRating);
  newCardBody.appendChild(newCardLanguage);
  newCardBody.appendChild(newBtnTrailer);
}
