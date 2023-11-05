function removeActiveClass(element) {
  let tabs = element.querySelectorAll("li");
  Array.from(tabs)
    .filter((el) => el.classList.contains("browser__tab_active"))[0]
    .classList.remove("browser__tab_active");
}

function changeContent(target) {
  let input = document.querySelector(".browser__url");
  if (target.textContent.trim() == "Сократика") {
    box.querySelector(".header").hidden = false;
    box.querySelector(".start-content").hidden = true;
    input.value = "сократика.рф";
  } else {
    box.querySelector(".header").hidden = true;
    box.querySelector(".start-content").hidden = false;
    input.value = "сократика.рф/начинаем";
  }
}

function closeBrowser() {
  Array.from(document.body.children).map((el) => el.remove());
  return;
}

window.addEventListener("load", function () {
  /* Закрывает псевдобраузер */
  let closeBtn = document.querySelector("#close-btn");
  closeBtn.onclick = closeBrowser;

  /* Обрабатывает переключение и закрытие вкладок */
  let tabs = document.querySelector("#tabs");
  tabs.addEventListener("click", function (event) {
    let target = event.target;

    /* Обрабатывает клик на кнопку закрытия вкладки */

    if (target.classList.contains("browser__mini-close-btn")) {
      let sibling = target.parentNode.previousElementSibling;
      let nextSibling = target.parentNode.nextElementSibling;

      if (!!sibling) {
        if (target.parentNode.classList.contains("browser__tab_active")) {
          sibling.classList.add("browser__tab_active");
          changeContent(sibling);
        }
        target.parentNode.remove();
      } else if (!!nextSibling) {
        if (target.parentNode.classList.contains("browser__tab_active")) {
          nextSibling.classList.add("browser__tab_active");
          changeContent(sibling);
        }
        target.parentNode.remove();
      } else if (!sibling && !nextSibling) {
        closeBrowser();
      }
    }

    /* Обрабатывает переключение контента во вкладках */

    if (target.tagName == "LI") {
      removeActiveClass(this);
      changeContent(target);
      target.classList.add("browser__tab_active");
    } else if (target.classList.contains("browser__tab-name")) {
      removeActiveClass(this);
      changeContent(target);
      target.parentNode.classList.add("browser__tab_active");
    }
  });

  /* Создает новую вкладку по кнопке Начать */

  let startBtn = document.querySelector("#start-btn");
  startBtn.addEventListener("click", function () {
    let newTab = document.createElement("li");
    newTab.innerHTML = `
      <span class="browser__tab-name">Начинаем</span>
      <span class="browser__mini-close-btn"></span>
    `;
    newTab.classList.add("browser__tab", "browser__tab_active");
    newTab.setAttribute("role", "button");
    removeActiveClass(tabs);
    tabs.append(newTab);

    box.querySelector(".header").hidden = true;

    if (!box.querySelector(".start-content")) {
      document.querySelector(".browser__url").value = "сократика.рф/начинаем";
      box.append(tmpl.content.cloneNode(true));
    } else {
      document.querySelector(".browser__url").value = "сократика.рф/начинаем";
      box.querySelector(".start-content").hidden = false;
    }
  });
});
