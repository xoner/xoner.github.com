const COOKIE_HTML =[
'<div id="cookie-law-container" class="cookie-law-container">',
    '<div class="cookie-message">',
        '<div class="image-container">',
            '<img src="/img/cookies.png" alt="Cookies! Everybody likes cookies">',
        '</div>',
        '<div class="inner-space">',
        '<div class="message-container">',
            '<div class="message">',
                '<p>Me obligan a molestarte con este mensaje, uso cookies (google analytics) en este sitio para poder tener una visión del publico de la pagina.</p>',
                '<p>Si no estas conforme en compartir los datos de navegación conmigo, pulsar sobre <strong>Rechazar Cookies</strong> ofrece una versión cookieless del sitio.</p>',
            '</div>',
            '<div class="buttons">',
                '<a id="btn-accept-cookies" class="btn btn-light btn-sm" href="#" role="button">Aceptar Cookies</a>',
                '<a id="btn-reject-cookies" class="btn btn-dark btn-sm" href="https://europa.eu" role="button">Rechazar Cookies</a>',
            '</div>',
        '</div>',
    '</div>',
'</div>',
];

const GOOGLE_ANALYTICS = [
"<script>",
    "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){",
    "(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),",
    "m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)",
    "})(window,document,'script','//www.google-analytics.com/analytics.js','ga');",
    "ga('create', 'UA-38202803-1', 'xoner.org');",
    "ga('send', 'pageview');",
"</script>",
];

const GOOGLE_ADS = [
'<div id="ads">',
    '<script type="text/javascript">',
        'google_ad_client = "ca-pub-2098920123613671";',
        'google_ad_slot = "8411873545";',
        'google_ad_width = 728;',
        'google_ad_height = 90;',
    '</script>',
    '<!-- Main ads -->',
    '<script type="text/javascript" src="//pagead2.googlesyndication.com/pagead/show_ads.js"></script>',
'</div>',
]

function injectGoogleAnalytics(){
    const bodyDOM = document.querySelector('body');

    const tmpElement = document.createElement('div');
    tmpElement.innerHTML = GOOGLE_ANALYTICS.join('\n');
    bodyDOM.appendChild(tmpElement.firstChild);
}

function injectGoogleAds() {
    const footerDOM = document.getElementById('page-footer');

    const tmpElement = document.createElement('div');
    tmpElement.innerHTML = GOOGLE_ADS.join('\n');

    footerDOM.appendChild(tmpElement.firstChild);
}

(() =>{
    const bodyDOM = document.querySelector('body');

    if(typeof Cookies.get('xoner-org-cookies-consent') === 'undefined'){
        console.log("Oh! snap we must annoy the user with the EUROPEAN COOKIE BANNER");

        // Creates a pseudo div node to be able to inject html code 
        // and create the cookies message to add it to the body of the page.
        const tmpElement = document.createElement('div');
        tmpElement.innerHTML = COOKIE_HTML.join('');
        bodyDOM.appendChild(tmpElement.firstChild);

        const btnAcceptCookies = document.getElementById('btn-accept-cookies');
        const btnRejectCookies = document.getElementById('btn-reject-cookies');
        const cookieLawContainer = document.getElementById('cookie-law-container')

        // disable page schroll
        bodyDOM.style.overflow = "hidden";

        btnAcceptCookies.addEventListener('click', (event) =>{
            event.preventDefault();
            Cookies.set('xoner-org-cookies-consent', 'true', { expires: 30});

            // Re-enable page schroll
            bodyDOM.style.overflow = "";
            // Delete the cookie law message.
            cookieLawContainer.parentNode.removeChild(cookieLawContainer);
            injectGoogleAnalytics();
            injectGoogleAds();

            return false;
        });

        btnRejectCookies.addEventListener('click', (event) => {
            event.preventDefault();

            // The user doesn't want cookies remove the banner and do not
            // inject analytics and ads
            cookieLawContainer.parentNode.removeChild(cookieLawContainer);

            // Re-enable page schroll
            bodyDOM.style.overflow = "";

            return false;
        });

        

    }
    else{
        // User has previously accepted the cookies, do not annoy them and let 
        // google analytics do their magic.
        injectGoogleAnalytics();
        injectGoogleAds();
    }
})();