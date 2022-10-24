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

                cleaned_name = name.replaceAll(" ", "+");
                var search_url = "https://letterboxd.com/search/" + cleaned_name
                console.log(search_url)
                // Check cache for search URL
                // Call search URL
                // Parse HTML
                // Cache rating and URL
                var img_src = chrome.runtime.getURL("./images/boxd-logo-dark-trans.png");
                var inserted_html = "<img src=" + img_src + " height=50 width= 50 alt='Letterboxd Score'></img><span>3.8</span>"
                toChange.insertAdjacentHTML("afterend", inserted_html);
            }
        }
    });
});

observer.observe(elementToObserve, {subtree: true, childList: true});
