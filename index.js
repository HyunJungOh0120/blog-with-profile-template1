const btnLikes = document.querySelectorAll(".btn-like");
const sortHeader = document.querySelector(".post__header");
const navLinks = document.querySelector(".nav__links");
const header = document.querySelector("header");
const nav = document.querySelector("nav");
const navHeight = nav.getBoundingClientRect().height;

const increaseLikeNum = function (e) {
  e.preventDefault();
  const btn = e.target;
  const likeNum = btn
    .closest(".content__like")
    .querySelector(".content__like-num");
  const newNum = +likeNum.textContent + 1;
  likeNum.textContent = newNum;
};

const clickSortHeader = function (e) {
  e.preventDefault();
  const btn = e.target;
  if (!btn.classList.contains("post__sort")) return;

  const btns = btn.parentElement.querySelectorAll(".post__sort");

  [...btns].map((el) => el.classList.toggle("post-sort-clicked"));
};

const navScrollIntoView = function (e) {
  e.preventDefault();
  const navBtn = e.target;
  if (!navBtn.classList.contains("nav__link")) return;

  const id = navBtn.getAttribute("href");

  document.querySelector(id).scrollIntoView({ behavior: "smooth" });
};

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add("sticky-nav");
  else nav.classList.remove("sticky-nav");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  rootMargin: `-${navHeight}px`,
  threshold: 0,
});

const handlerMouse = function (e) {
  if (!e.target.classList.contains("nav__link")) return;
  const link = e.target;
  const siblings = link.closest(".nav__links").querySelectorAll(".nav__link");

  siblings.forEach((el) => {
    if (el !== link) {
      el.style.opacity = this;
      console.log(el);
    }
  });
};

function init() {
  sortHeader.addEventListener("click", clickSortHeader);
  btnLikes.forEach((btn) => {
    btn.addEventListener("click", increaseLikeNum);
  });
  navLinks.addEventListener("click", navScrollIntoView);
  headerObserver.observe(header);
  nav.addEventListener("mouseover", handlerMouse.bind(0.5));
  nav.addEventListener("mouseout", handlerMouse.bind(0.9));
}

init();
