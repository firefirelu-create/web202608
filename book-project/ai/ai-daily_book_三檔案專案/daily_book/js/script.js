// daily.book 書籍資料與簡單互動
// 初學者版本：使用陣列、function、addEventListener

const books = [
    {
        title: "昨日世界：一個歐洲人的回憶",
        category: "人生哲學",
        description: "用盡生命最後的氣力，寫給世界的遺書。",
        image: "images/book-01.jpg"
    },
    {
        title: "撒哈拉的故事",
        category: "旅行文學",
        description: "流浪文學的起點，我們愛上三毛的原點。",
        image: "images/book-02.jpg"
    },
    {
        title: "哲學的慰藉",
        category: "哲學思考",
        description: "從哲學家的智慧中，尋找面對生活的力量。",
        image: "images/book-03.jpg"
    },
    {
        title: "彼岸之嫁",
        category: "奇幻小說",
        description: "穿越生死界線，展開一段奇幻旅程。",
        image: "images/book-04.jpg"
    },
    {
        title: "漁港好日",
        category: "生活散文",
        description: "在海港日常裡，感受土地與人情的溫度。",
        image: "images/book-05.jpg"
    },
    {
        title: "在黑暗中相遇",
        category: "小說",
        description: "在未知與黑暗之中，看見理解與陪伴。",
        image: "images/book-06.jpg"
    },
    {
        title: "生命清單",
        category: "人生故事",
        description: "重新整理人生的願望，找回生活的方向。",
        image: "images/book-07.jpg"
    },
    {
        title: "金剛經",
        category: "經典智慧",
        description: "從經典文字中，體會放下與自在。",
        image: "images/book-08.jpg"
    }
];

// 取得 HTML 裡面的書籍區域
const bookList = document.getElementById("bookList");
const bookSearch = document.getElementById("bookSearch");
const searchHint = document.getElementById("searchHint");
const noResult = document.getElementById("noResult");

// 顯示書籍卡片
function showBooks(bookData) {
    bookList.innerHTML = "";

    bookData.forEach(function (book) {
        const bookHTML = `
            <div class="col-6 col-lg-3">
                <article class="book-card">
                    <div class="book-cover">
                        <img src="${book.image}" alt="${book.title}封面" loading="lazy"
                            onerror="this.style.display='none'; this.nextElementSibling.classList.remove('d-none');">
                        <div class="cover-placeholder d-none">
                            <i class="bi bi-book-half"></i>
                            <strong>${book.title}</strong>
                            <small>DAILY BOOK</small>
                        </div>
                    </div>
                    <div class="book-info">
                        <span class="book-category">${book.category}</span>
                        <h3><i class="bi bi-journal-bookmark book-icon"></i>${book.title}</h3>
                        <p>${book.description}</p>
                    </div>
                </article>
            </div>
        `;

        bookList.innerHTML += bookHTML;
    });

    searchHint.textContent = "目前顯示 " + bookData.length + " 本選書";

    if (bookData.length === 0) {
        noResult.classList.remove("d-none");
    } else {
        noResult.classList.add("d-none");
    }
}

// 搜尋書籍
bookSearch.addEventListener("input", function () {
    const keyword = this.value.trim().toLowerCase();

    const result = books.filter(function (book) {
        return book.title.toLowerCase().includes(keyword) ||
            book.category.toLowerCase().includes(keyword);
    });

    showBooks(result);
});

// 第一次進入網頁時顯示全部書籍
showBooks(books);

// 加入讀書會表單驗證
const registerForm = document.getElementById("registerForm");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const rePassword = document.getElementById("re_password");
const registerMessage = document.getElementById("registerMessage");

function checkPassword() {
    if (password.value.length >= 6 && password.value.length <= 12) {
        password.classList.add("is-valid");
        password.classList.remove("is-invalid");
    } else {
        password.classList.add("is-invalid");
        password.classList.remove("is-valid");
    }

    checkRePassword();
}

function checkRePassword() {
    if (rePassword.value !== "" && rePassword.value === password.value) {
        rePassword.classList.add("is-valid");
        rePassword.classList.remove("is-invalid");
    } else {
        rePassword.classList.add("is-invalid");
        rePassword.classList.remove("is-valid");
    }
}

password.addEventListener("input", checkPassword);
rePassword.addEventListener("input", checkRePassword);

registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const nameOK = username.value.trim().length >= 1 && username.value.trim().length <= 12;
    const emailOK = email.checkValidity();
    const passwordOK = password.value.length >= 6 && password.value.length <= 12;
    const rePasswordOK = rePassword.value === password.value && rePassword.value !== "";

    username.classList.toggle("is-valid", nameOK);
    username.classList.toggle("is-invalid", !nameOK);
    email.classList.toggle("is-valid", emailOK);
    email.classList.toggle("is-invalid", !emailOK);
    password.classList.toggle("is-valid", passwordOK);
    password.classList.toggle("is-invalid", !passwordOK);
    rePassword.classList.toggle("is-valid", rePasswordOK);
    rePassword.classList.toggle("is-invalid", !rePasswordOK);

    if (nameOK && emailOK && passwordOK && rePasswordOK) {
        const newsText = document.getElementById("newsSwitch").checked ? "願意" : "不願意";
        registerMessage.textContent = "歡迎 " + username.value + "！資料格式正確，通知選擇：" + newsText + "。目前尚未連接資料庫。";
        registerMessage.classList.remove("d-none");
    } else {
        registerMessage.textContent = "資料尚未填寫完整或格式不正確，請檢查紅色欄位。";
        registerMessage.classList.remove("d-none");
        registerMessage.classList.remove("alert-success");
        registerMessage.classList.add("alert-danger");
    }
});

// 表單重設
registerForm.addEventListener("reset", function () {
    registerMessage.classList.add("d-none");
    const fields = [username, email, password, rePassword];

    fields.forEach(function (field) {
        field.classList.remove("is-valid", "is-invalid");
    });
});

// 登入表單：目前只做前端欄位示範
const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (loginForm.checkValidity()) {
        loginMessage.textContent = "欄位填寫完成。正式登入功能需要再連接 PHP 或其他後端資料庫。";
        loginMessage.classList.remove("d-none");
    } else {
        loginForm.reportValidity();
    }
});
