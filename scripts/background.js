chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    switch (request.contentScriptQuery) {
        case "queryFilm":
            var search_url = "https://letterboxd.com/search/films/" + encodeURIComponent(request.name);
            console.log(search_url)
            fetch(search_url, {mode: 'same-origin'})
                .then((response) => response.text())
                .then((text) => sendResponse(text));
            break;
    }
    return true;
});