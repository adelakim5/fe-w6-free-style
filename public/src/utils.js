const _ = {
  search: (target = location) => target.search,
  local: "http://localhost:3000/result?type=ESFJ&scores=90909090", // for test
  $: (selector, target = document) => target.querySelector(selector),
  $$: (selector, target = document) => target.querySelectorAll(selector),
};

const state = {
  totalWidth: (width, length) => width * (length + 2),
  currIndex: 0,
  currSlide: null,
  speed: 300,
  initSpeed: 0,
  startNum: 0,
};

export { _, state };
