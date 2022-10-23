const elementToObserve = document.querySelector("#appMountPoint");

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        var toChange = null;

        if (mutation.target.className == "videoMerchPlayer--boxart-wrapper") {
            toChange = mutation.target.parentNode.parentNode.lastChild.firstChild.firstChild.firstChild.firstChild.firstChild.firstChild.lastChild.previousSibling;
            // Get movie name
        }
        
        if (toChange != null) {
            if (!toChange.parentNode.innerHTML.includes("img")) {
                console.log(toChange.parentNode.innerHTML)

                var img_src = chrome.runtime.getURL("./images/boxd-logo-dark-trans.png");
                var inserted_html = "<img src=" + img_src + " height=50 width= 50 alt='Letterboxd Score'></img><span>3.8</span>"
                toChange.insertAdjacentHTML("afterend", inserted_html);
            }
        }
    });
});

observer.observe(elementToObserve, {subtree: true, childList: true});

/* img child of  class="videoMerchPlayer--boxart-wrapper" has alt tag w title" */
/* Node.textContent to detect "seasons" to ignore tv shows */