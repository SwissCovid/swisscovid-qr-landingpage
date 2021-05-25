var ready = (fn) => {
    if (document.readyState != "loading") {
        fn();
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
};

ready(() => {
    if (navigator.userAgent.toLowerCase().indexOf("android") > -1) {
        window.location.href = window.currentLanguage.playStoreLink;
    }
    if (navigator.userAgent.toLowerCase().indexOf("iphone") > -1) {
        window.location.href = window.currentLanguage.appStoreLink;
    }
});