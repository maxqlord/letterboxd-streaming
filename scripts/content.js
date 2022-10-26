// v2: Link to boxd film page on large film card after clicking hovered film card, async/await refactor 
const elementToObserve = document.querySelector("#appMountPoint");

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        var toChange = null;
        var name = null;

        if (mutation.target.className == "videoMerchPlayer--boxart-wrapper") {
            toChange = mutation.target.parentNode.parentNode.lastChild.firstChild.firstChild.firstChild.firstChild.firstChild.firstChild.lastChild.previousSibling;
            name = mutation.target.firstChild.alt;
            possibleSibling = mutation.target.parentNode.parentNode.lastChild.firstChild.firstChild.firstChild.firstChild.firstChild.firstChild.nextSibling;
            if(possibleSibling.className == "previewModal-episodeDetail-and-badge") {
                toChange = null; // TV Series, not a movie
            } else {
                possibleSeasons = mutation.target.parentNode.parentNode.lastChild.firstChild.firstChild.firstChild.firstChild.firstChild.firstChild.nextSibling.firstChild.firstChild.lastChild;
                if (possibleSeasons != null && (possibleSeasons.innerHTML.includes("Seasons") || possibleSeasons.innerHTML.includes("Parts"))) {
                    toChange = null; // TV Series, not a movie
                }
            }
        }
        
        if (toChange != null) {
            if (!toChange.parentNode.innerHTML.includes("img")) {
                chrome.runtime.sendMessage({
                    contentScriptQuery: "queryFilm",
                    name: name
                  }, function(search_response) {
                    var film_index = search_response.search("film-title-wrapper");
                    var film_offset = 29;

                    if (film_index != -1) {
                        var film_url_start_index = film_index + film_offset;
                        var search_response_back_half = search_response.substring(film_url_start_index);
                        var film_url_end_index = search_response_back_half.indexOf('"');
                        var film_url = search_response_back_half.substring(0, film_url_end_index);

                        chrome.runtime.sendMessage({
                            contentScriptQuery: "queryFilmRating",
                            film_url: film_url
                          }, function(response) {
                                var rating_area_index = response.search("ratingValue");
                                var rating_offset = 13

                                if (rating_area_index != -1) {
                                    var rating_back_half = response.substring(rating_area_index)
                                    var rating_end_index = rating_back_half.indexOf(',')
                                    var rating_hundredth_str = rating_back_half.substring(rating_offset, rating_end_index)
                                    var rating = parseFloat(rating_hundredth_str).toFixed(1).toString()
                                    var img_src = chrome.runtime.getURL("./images/boxd-logo-dark-trans.png");
                                    if (!toChange.parentNode.innerHTML.includes("Letterboxd")) {
                                        var inserted_html = "<img src=" + img_src + " height=50 width= 50 alt='Letterboxd Score'></img><span>" + rating + "</span>"
                                        toChange.insertAdjacentHTML("afterend", inserted_html);
                                    }

                                }
                                
                          });
                    }
                });
            }
        }
    });
});

observer.observe(elementToObserve, {subtree: true, childList: true});
