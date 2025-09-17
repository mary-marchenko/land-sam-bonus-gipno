(function () {
    var url = new URL(window.location.href);
    var params = ['l', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'param1', 'param2', 'param3', 'param4', 'creative_type', 'creative_id'];
    var linkParams = ['affid', 'cpaid']; // ищем в url redirectUrl в url:

    if (url.searchParams.has('redirectUrl')) {
        var redirectUrl = new URL(url.searchParams.get('redirectUrl'));

        if (redirectUrl.href.match(/\//g).length === 4 && redirectUrl.searchParams.get('l')) {
            //если ссылка в ссылка redirectUrl корректная
            localStorage.setItem('redirectUrl', redirectUrl.href); // указываем точкой входа домен с протоколом из redirectUrl
        }
    }

    params.forEach(function (param) {
        if (url.searchParams.has(param)) localStorage.setItem(param, url.searchParams.get(param));
    });

    linkParams.forEach(function (linkParam) {
        if (url.searchParams.has(linkParam)) localStorage.setItem(linkParam, url.searchParams.get(linkParam));
    });

    window.addEventListener('click', function (e) {
        var link,
            parent = e.target.closest('a');

        if (parent.getAttribute('href') !== 'https://tds.favbet.partners') {
            return;
        }

        if (parent) {
            e.preventDefault();
            var affid = localStorage.getItem('affid');
            var cpaid = localStorage.getItem('cpaid');

            if (localStorage.getItem("redirectUrl")) {
                link = new URL(localStorage.getItem("redirectUrl"));
            } else {
                link = new URL(parent.href);
                if (affid && cpaid) {
                    link.pathname = '/' + affid + '/' + cpaid;
                }
            }

            params.forEach(function (param) {
                if (url.searchParams.has(param)) {
                    link.searchParams.set(param, localStorage.getItem(param));
                }
            });

            document.location.href = link;
        }
    });
})();

// // padding no-ios
// document.addEventListener("DOMContentLoaded", function() {
//     let pageBtn = document.querySelector('.fav-page__btn');
//
//     if (!/iPad|iPhone|iPod|Mac/.test(navigator.userAgent) || !/iPad|iPhone|iPod|Mac/.test(navigator.platform)) {
//         pageBtn.classList.add('noios-padding');
//     }
// });

// // for animation
//
// for (let i = 1; i <= 4; i++) {
//     const el = document.querySelector(`.fav-page__decor-chip-${i}`);
//     if (el) {
//         el.addEventListener('animationend', e => {
//             if (e.animationName === 'fadeIn') {
//                 el.classList.add('start-sway');
//             }
//         });
//     }
// }
//
// for (let i = 1; i <= 4; i++) {
//     const el = document.querySelector(`.fav-page__decor-coin-${i}`);
//     if (el) {
//         el.addEventListener('animationend', e => {
//             if (e.animationName === 'fadeIn') {
//                 el.classList.add('start-sway2');
//             }
//         });
//     }
// }
//
// const sam = document.querySelector('.fav-page__sam');
//
// sam.addEventListener('animationend', (e) => {
//     if (e.animationName === 'appear') {
//         sam.classList.add('start-wiggle');
//     }
// });