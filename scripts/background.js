chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    switch (request.contentScriptQuery) {
        case "queryFilm":
            var search_url = "https://letterboxd.com/search/films/" + encodeURIComponent(request.name) + "/";
            fetch(search_url)
                .then((response) => response.text())
                .then((text) => sendResponse(text));
            break;
        case "queryFilmRating":
            var search_url = "https://letterboxd.com" + request.film_url
            fetch(search_url)
                .then((response) => response.text())
                .then((text) => sendResponse(text));
            break;
    }
    return true;
});