const COOKIE_HTML = "";
(() =>{
    const bodyDOM = document.querySelector('body');
    const cookieLawContainer = document.querySelector('.cookie-law-container');
    const btnAcceptCookies = document.getElementById('btn-accept-cookies');

    if(typeof Cookies.get('xoner-org-cookies-consent') === 'undefined'){
        console.log("Oh! snap we must annoy the user with the EUROPEAN COOKIE BANNER");

        // disable page schroll
        bodyDOM.style.overflow = "hidden";

        btnAcceptCookies.addEventListener('click', (event) =>{
            event.preventDefault();
            Cookies.set('xoner-org-cookies-consent', 'true', { expires: 30});

            // Re-enable page schroll
            bodyDOM.style.overflow = "";
            // Delete the cookie law message.
            cookieLawContainer.parentNode.removeChild(cookieLawContainer);

            return false;
        });

    }
    else{
        // User has previously accepted the cookies, do not annoy them.
        cookieLawContainer.parentNode.removeChild(cookieLawContainer);
    }
})();