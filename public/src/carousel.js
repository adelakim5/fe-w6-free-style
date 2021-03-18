const clone = (peopleList) => {
  const firstChild = peopleList.firstElementChild;
  const lastChild = peopleList.lastElementChild;
  const clonedFirst = firstChild.cloneNode(true);
  const clonedLast = lastChild.cloneNode(true);
  return { clonedFirst, clonedLast };
};

const go2NextPeople = (state, selectors, width, length) => {
  const { peopleList, peopleCards } = selectors;
  if (state.currIndex <= length - 1) {
    peopleList.style.transition = `${state.speed}ms`;
    peopleList.style.transform = `translateX(-${width * (state.currIndex + 2)}px)`;
  }
  if (state.currIndex === length - 1) {
    setTimeout(() => {
      peopleList.style.transition = `${state.initSpeed}ms`;
      peopleList.style.transform = `translateX(-${width}px)`;
    }, state.speed);
    state.currIndex = -1;
  }
  state.currSlide.classList.remove("active");
  state.currSlide = peopleCards[++state.currIndex];
  state.currSlide.classList.add("active");
};

const go2PrevPeople = (state, selectors, width, length) => {
  const { peopleList, peopleCards } = selectors;
  if (state.currIndex >= 0) {
    peopleList.style.transition = `${state.speed}ms`;
    peopleList.style.transform = `translateX(-${width * state.currIndex}px)`;
  }
  if (state.currIndex === 0) {
    setTimeout(() => {
      peopleList.style.transition = `${state.initSpeed}ms`;
      peopleList.style.transform = `translateX(-${width * length}px)`;
    }, state.speed);
    state.currIndex = length;
  }
  state.currSlide.classList.remove("active");
  state.currSlide = peopleCards[--state.currIndex];
  state.currSlide.classList.add("active");
};

const carouselInit = (selectors, state) => {
  const { button, peopleList, peopleCards } = selectors;
  const width = peopleCards[0].lastElementChild.width;
  const length = peopleCards.length;
  peopleList.style.width = `${state.totalWidth(width, length)}`;

  const { clonedFirst, clonedLast } = clone(peopleList);

  peopleList.appendChild(clonedFirst);
  peopleList.insertBefore(clonedLast, peopleList.firstElementChild);

  peopleList.style.transform = `translateX(-${width * (state.startNum + 1)}px)`;
  state.currSlide = peopleCards[state.currIndex];
  state.currSlide.classList.add("active");

  peopleList.style.transform = `translateX(-${width * (state.startNum + 1)}px)`;
  state.currSlide = peopleCards[state.currIndex];
  state.currSlide.classList.add("active");

  button.addEventListener("click", ({ target }) => {
    if (target.classList.contains("btn__next")) go2NextPeople(state, selectors, width, length);
    if (target.classList.contains("btn__prev")) go2PrevPeople(state, selectors, width, length);
  });
};

export { carouselInit };
