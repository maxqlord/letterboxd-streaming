const elementToObserve = document.querySelector("#appMountPoint");

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        console.log(mutation.target);
        console.log(mutation.target.className)
        var toChange = null;

        if (mutation.target.className == "videoMerchPlayer--boxart-wrapper") {
            toChange = mutation.target.parentNode.parentNode.lastChild.firstChild.firstChild.firstChild.firstChild.firstChild.firstChild.lastChild.previousSibling;
            console.log(toChange);
        }
        
        if (toChange != null) {
            if (!toChange.innerHTML.includes("test")) {
                console.log(toChange.innerHTML)
                toChange.insertAdjacentHTML("afterend", "<span>test</span>");
            } else {
                console.log(toChange.innerHTML)
            }
            
        }
    });
});

observer.observe(elementToObserve, {subtree: true, childList: true});

/* img child of  class="videoMerchPlayer--boxart-wrapper" has alt tag w title" */
/* Node.textContent to detect "seasons" to ignore tv shows */