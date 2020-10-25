/* eslint-disable camelcase */
/* eslint-disable indent */
/* eslint-disable prettier/prettier */
$(document).ready(() => {

    // init();

    $("#get-author").on("click", getAuthor);
    $("#get-title").on("click", getTitle);
    $("#input-submit").on("click", insertBook);

    $("#search-button").on("click", () => {
        console.log("2 + 2 is 4");
        $(".search-elements").removeClass("is-hidden");
        $(".create-elements").addClass("is-hidden");
    });

    $("#create-button").on("click", () => {
        console.log("2 + 2 is 4");
        $(".create-elements").removeClass("is-hidden");
        $(".search-elements").addClass("is-hidden");

    });

    function displayOneBook(book) {
        $("#title-input").val("");
        const resultDiv = $(".results");
        resultDiv.empty();

        if (book.cover_link !== null && book.cover_link !== "") {
            resultDiv.append("<img src='" + book.cover_link + "' alt='book cover'>");
        }
        else {
            resultDiv.append("<img src='https://via.placeholder.com/150'>");
        }
        resultDiv.append("<p>Title: " + book.title + "</p>");
        resultDiv.append("<p>Author: " + book.author + "</p>");
        if (book.average_rating !== null) {
            resultDiv.append("<p>Rating: " + book.average_rating + "</p>");
        }
        else {
            resultDiv.append("<p>Rating: N/A</p>");
        }
        resultDiv.append("<p>Number of Pages: " + book.number_of_pages + "</p>");
    }

    function displayBooks(book) {

        $("#author-input").val("");
        const resultDiv = $(".results");
        resultDiv.empty();

        for (let i = 0; i < book.length; i++) {
            if (i % 3 === 0) {
                console.log(i);
                var row = $("<div>");
                row.addClass("columns");
            }

            const column = $("<div>");
            column.addClass("column");

            if (book[i].cover_link !== null && book[i].cover_link !== "") {
                column.append("<img src='" + book[i].cover_link + "' alt='book cover'>");
            }
            else {
                column.append("<img src='https://via.placeholder.com/350'>");
            }
            column.append("<p>Title: " + book[i].title + "</p>");
            column.append("<p>Author: " + book[i].author + "</p>");
            if (book.average_rating !== null) {
                column.append("<p>Rating: " + book[i].average_rating + "</p>");
            }
            else {
                column.append("<p>Rating: N/A</p>");
            }
            column.append("<p>Number of Pages: " + book[i].number_of_pages + "</p>");
            row.append(column);
            resultDiv.append(row);

        }
    }

    function insertBook() {
        const book = {
            title: $("#book-title-input").val(),
            cover_link: null,
            author: $("#book-author-input").val(),
            number_of_pages: $("#number-of-pages").val(),
            date_published: $("#date-published").val(),
            publisher: $("#publisher").val(),
            genre: $("#genre").val(),
            description: $("#description").val()
        };
        console.log(book);
        $.post("/api/create-book", book)
            .then(() => {
                alert("Book Added!");
            });
    }

    function init() {

        $.get("/api/books", (data) => {
            console.log("hi");
            initializePage(data);
        });
    }

    function initializePage(book) {
        const resultDiv = $(".results");
        resultDiv.empty();

        let numberOfBooks;
        let randomBook;

        if (book.length > 9) {
            numberOfBooks = 9;
        }
        else {
            numberOfBooks = book.length;
        }

        for (let i = 0; i < numberOfBooks; i++) {
            randomBook = Math.floor(Math.random() * book.length);

            if (i % 3 === 0) {
                console.log(i);
                var row = $("<div>");
                row.addClass("columns");
            }

            const column = $("<div>");
            column.addClass("column");

            if (book[randomBook].cover_link !== null && book[randomBook].cover_link !== "") {
                column.append("<img src='" + book[randomBook].cover_link + "' alt='book cover'>");
            }
            else {
                column.append("<img src='https://via.placeholder.com/350'>");
            }
            column.append("<p>Title: " + book[randomBook].title + "</p>");
            column.append("<p>Author: " + book[randomBook].author + "</p>");
            if (book.average_rating !== null) {
                column.append("<p>Rating: " + book[randomBook].average_rating + "</p>");
            }
            else {
                column.append("<p>Rating: N/A</p>");
            }
            column.append("<p>Number of Pages: " + book[randomBook].number_of_pages + "</p>");
            row.append(column);
            resultDiv.append(row);
        }
    }

    function getAuthor() {

        const author = {
            author: $("#author-input").val()
        };

        $.post("/api/author", author).then(response => {
            console.log(response);
            displayBooks(response);
        });
    }

    function getTitle() {
        $("#title-input").attr("placeholder", "Search by title");
        const title = {
            title: $("#title-input").val()
        };

        $.post("/api/title", title).then(data => {
            displayOneBook(data);
        });
    }
});