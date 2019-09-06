$(document).ready(function () {


    setAdCookies(); // Установка рекламных Cookies

    $("[data-form='call_me']").on('click', () => {
        $("#call_me.form").slideDown();
        $(".over").fadeIn();
    });
    $("[data-form='calc_1']").on('click', () => {
        $("#calc_1.form").slideDown();
        $(".over").fadeIn();
    });
    $("[data-form='calc_2']").on('click', () => {
        $("#calc_2.form").slideDown();
        $(".over").fadeIn();
    });
    $("[data-form='calc_3']").on('click', () => {
        $("#calc_3.form").slideDown();
        $(".over").fadeIn();
    });
    $(".close").on('click', () => {
        $(".form").slideUp();
        $(".over").fadeOut();
    });
    $(".over").on('click', () => {
        $(".form").slideUp();
        $(".over").fadeOut();
    });
});

$(document).on('submit', (event) => {
    event.preventDefault();

    let form = $(event.target);

    let formData = {
        'form': {
            'id': form.find("input[name='form_id']").val(),
            'page': getCurrentPage(),
        },
        'utm': {
            'utm_source': getCookie('utm_source'),
            'utm_medium': getCookie('utm_medium'),
            'utm_campaign': getCookie('utm_campaign'),
            'utm_content': getCookie('utm_content'),
            'utm_term': getCookie('utm_term'),
            'referrer': getCookie('referrer'),
        },
        'contact': {
            'name': form.find("input[name='name']").val(),
            'email': form.find("input[name='email']").val(),
            'phone': form.find("input[name='phone']").val()
        },
        "fields": {
            "height": form.find("input[name='height']").val(),
            "width": form.find("input[name='width']").val(),
            "profile": form.find("[name='profile']").val(),
            "number": form.find("[name='number']").val(),
            "mechanism": form.find("[name='mechanism']").val()
        }
    };

    $.ajax({
        type: "POST",
        url: 'https://webhook.site/02590f01-aa21-41b2-84fa-9e442ffcfb3d',
        data: formData
    });
});



//Чтение Cookie клиента
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : null;
}


// Получение текущей страницы без query параметров

function getCurrentPage() {
    return location.protocol + '//' + location.host + location.pathname;
}

// Получение GET параметров
function getUrlParams() {
    let vars = {};
    let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

// Получить GET параметр из url
function getUrlParam(name) {
    return getUrlParams()[name] ? getUrlParams()[name] : null;
}

// Запись Cookie клиенту
function setCookie(name, value, options = {}) {

    options = {
        path: '/',
        ...options
    };

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}

function setAdCookies() {


    let cookieOptions = {'max-age': 3600 * 3 }; // 3 часа

    let getParams = getUrlParams();

    if (getCookie('ad')) {
        // Рекламные куки заданы
        return;
    }

    setCookie('ad', true, cookieOptions);
    setCookie('utm_source', getUrlParam('utm_source'), cookieOptions);
    setCookie('utm_medium', getUrlParam('utm_medium'), cookieOptions);
    setCookie('utm_content', getUrlParam('utm_content'), cookieOptions);
    setCookie('utm_campaign', getUrlParam('utm_campaign'), cookieOptions);
    setCookie('utm_term', getUrlParam('utm_term'), cookieOptions);
    setCookie('referrer', document.referrer, cookieOptions);
}