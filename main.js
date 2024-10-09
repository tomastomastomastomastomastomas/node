import $ from "jquery";

let gloablQuotes = [];

function getQuotes() {
  return $.get("https://api.breakingbadquotes.xyz/v1/quotes");
}

$(document).ready(async function () {
  gloablQuotes = JSON.parse(localStorage.getItem("quotes")) || [];
  for (let i = 0; i < gloablQuotes.length; i++) {
    console.log(gloablQuotes);
    setQuote(gloablQuotes[i]);
  }
  addQuote();
});

$(".random-quote-button").on("click", function () {
  addQuote();
});

function setQuote(data) {
  let quotP = $(`<p>${data}</p>`);
  let deleteBtn = $("<button>Eliminar</button>");
  let storeBtn = $("<button>Guardar</button>");

  $(".quotes-container").append(quotP);

  quotP
    .on("mouseover", function () {
      quotP.append(
        deleteBtn.on("click", function () {
          deleteQuote(data);
          quotP.remove();
        })
      );
      if (!existQuote(data)) {
        quotP.append(
          storeBtn.on("click", function () {
            storeQuote(data);
            storeBtn.remove();
          })
        );
      }
    })
    .on("mouseleave", function () {
      deleteBtn.remove();
      storeBtn.remove();
    });
}

function storeQuote(quote) {
  if (!existQuote(quote)) {
    gloablQuotes.push(quote);
    localStorage.setItem("quotes", JSON.stringify(gloablQuotes));
  }
}

function existQuote(quote) {
  if (gloablQuotes.includes(quote)) {
    return true;
  }
  return false;
}

function addQuote() {
  getQuotes().then((data) => {
    existQuote(data[0].quote) ? addQuote() : setQuote(data[0].quote);
  });
}

function deleteQuote(deletedQuote) {
  gloablQuotes = gloablQuotes.filter(function (quote) {
    return quote !== deletedQuote;
  });
  localStorage.setItem("quotes", JSON.stringify(gloablQuotes));
}

$(".clear-button").on("click", function () {
  localStorage.clear();
  gloablQuotes = [];
});
