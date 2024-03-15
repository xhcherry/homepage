console.log('%cCopyright © 2021 xherry.com');
console.log('%c 1', 'color: #8B4513; font-size: 20px;');
document.addEventListener('contextmenu', function (event) {
    event.preventDefault(); // 阻止默认的上下文菜单行为
});

function toggleClass(selector, className) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(function (element) {
        element.classList.toggle(className);
    });
}

function wx(imageURL) {
    const tcMainElement = document.querySelector(".tc-img");
    if (imageURL) {
        tcMainElement.src = imageURL;
    }
    toggleClass(".tc-main", "active");
    toggleClass(".tc", "active");
}

function left() {
    toggleClass(".left-main", "left-main-open");
    toggleClass(".left", "left-open");
}

document.addEventListener('DOMContentLoaded', function () {
    let themeState = getCookie("themeState") || "Blue";
    const htmlTag = document.querySelector('html');
    const svgItems = document.getElementsByTagName("svg");
    const tanChiShe = document.getElementById("tanChiShe");

    function changeSvg(color) {
        for (let i = 0; i < svgItems.length; i++) {
            const paths = svgItems[i].getElementsByTagName("path");
            for (let j = 0; j < paths.length; j++) {
                paths[j].setAttribute("fill", color);
            }
        }
    }

    function changeTheme(theme) {
        if (theme === "Dark") {
            themeState = "Dark";
            changeSvg("#ffffff");
            tanChiShe.src = "static/svg/snake.svg";
            htmlTag.dataset.theme = 'dark';
        } else if (theme === "Blue") {
            themeState = "Blue";
            changeSvg("#000000");
            tanChiShe.src = "static/svg/snake.svg";
            htmlTag.dataset.theme = '';
        }
        setCookie("themeState", theme, 365);
    }

    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1, cookie.length);
            }
            if (cookie.indexOf(nameEQ) === 0) {
                return cookie.substring(nameEQ.length, cookie.length);
            }
        }
        return null;
    }

    const switchCheckbox = document.getElementById('myonoffswitch');
    /*夜间自动打开暗色主题*/
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    if (currentHour >= 20 || currentHour < 6) {
        switchCheckbox.checked = false;
        changeTheme('Dark');
    }
    switchCheckbox.addEventListener('change', function () {
        if (themeState === "Dark") {
            changeTheme("Blue");
        } else if (themeState === "Blue") {
            changeTheme("Dark");
        }
    });
    if (themeState === "Dark") {
        switchCheckbox.checked = false;
    }
    changeTheme(themeState);
    /*淡入效果*/
    const projectItems = document.querySelectorAll(".projectItem");

    function checkProjectItems() {
        for (let i = 0; i < projectItems.length; i++) {
            const projectItem = projectItems[i];
            const projectItemTop = projectItem.getBoundingClientRect().top;

            if (projectItemTop < window.innerHeight * 1.2) {
                projectItem.classList.add("fade-in-visible");
            }
        }
    }

    window.addEventListener("scroll", checkProjectItems);
    window.addEventListener("resize", checkProjectItems);
    /*加载效果*/
    const pageLoading = document.querySelector("#PageLoading");
    const center = document.getElementById("PageLoading-zyyo-center");
    setTimeout(function () {
        checkProjectItems();
        pageLoading.style.opacity = '0';
        center.style.height = "500px";
        center.style.width = "500px";
        center.style.opacity = "0";
        pageLoading.style.backgroundSize = "200%";
    }, 300);
});