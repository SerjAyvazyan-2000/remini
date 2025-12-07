document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const fadeAnimations = [
    { selector: ".fade-left", from: { x: -60 } },
    { selector: ".fade-right", from: { x: 60 } },
    { selector: ".fade-top", from: { y: -60 } },
    { selector: ".fade-bottom", from: { y: 60 } },
  ];

  fadeAnimations.forEach(({ selector, from }) => {
    gsap.utils.toArray(selector).forEach((el) => {
      gsap.fromTo(
        el,
        { ...from, opacity: 0, visibility: "visible" },
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            end: "bottom 10%",
            once: true,
          },
        }
      );
    });
  });
});

jQuery.event.special.touchstart = {
  setup: function(_, ns, handle){
    this.addEventListener("touchstart", handle, { passive: false });
  }
};
jQuery.event.special.touchmove = {
  setup: function(_, ns, handle){
    this.addEventListener("touchmove", handle, { passive: false });
  }
};

$(window).on("load", function () {
  $(".twentytwenty-picture").twentytwenty({
    orientation: "horizontal",
  });
});

let macy;

function initMacy() {
  if (macy) macy.recalculate(true);

  macy = Macy({
    container: ".c-users-items",
    margin: window.innerWidth <= 768 ? 10 : 19.5,
    columns: 3,
    breakAt: {
      1100: 2,
      768: 1,
    },
  });
}

initMacy();

window.addEventListener("resize", () => {
  initMacy();
});



document.addEventListener("DOMContentLoaded", function () {
  const idSwitches = document.querySelectorAll(".c-demonstration-media-swiitch");
  const valSwitches = document.querySelectorAll(".c-demonstration-swiitch");
  const wrappers = document.querySelectorAll(".c-demonstration-twentytwenty-wrapper");

  const disabledById = {
    "1": ["4"],        
    "2": ["1", "2"],   
    "3": ["3"]            
  };

  let activeId = idSwitches.length ? idSwitches[0].dataset.id : null;

  valSwitches.forEach(sw => {
    sw.classList.remove("disabled");
    sw.classList.add("active");
    sw.style.pointerEvents = "auto";
  });

  if (idSwitches[0]) {
    idSwitches[0].classList.add("active");
  }

  function getActiveVals() {
    return [...valSwitches]
      .filter(sw => sw.classList.contains("active") && !sw.classList.contains("disabled"))
      .map(sw => sw.dataset.val)
      .sort();
  }

  function hasWrapper(id, val) {
    return [...wrappers].some(w => w.dataset.id === id && w.dataset.val === val);
  }

  function updateDisabledById() {
    const toDisable = disabledById[activeId] || [];

    valSwitches.forEach(sw => {
      const val = sw.dataset.val;

      if (toDisable.includes(val)) {
        sw.classList.add("disabled");
        sw.classList.remove("active");
        sw.style.pointerEvents = "none";
      } else {
        sw.classList.remove("disabled");
        sw.style.pointerEvents = "auto";
      }
    });
  }

  function applyFilter() {
    if (!activeId) return;

    updateDisabledById();

    const available = [...valSwitches].filter(sw => !sw.classList.contains("disabled"));
    const totalAvailable = available.length;

    const activeVals = getActiveVals();
    let finalVal = null;

    if (activeVals.length === 0) {
      if (hasWrapper(activeId, "disabled")) {
        finalVal = "disabled";
      } else if (hasWrapper(activeId, "all")) {
        finalVal = "all";
      }
    } else {
      if (activeVals.length === totalAvailable && hasWrapper(activeId, "all")) {
        finalVal = "all";
      }
      else if (activeVals.length === 1) {
        const single = activeVals[0];
        if (hasWrapper(activeId, single)) {
          finalVal = single;
        } else if (hasWrapper(activeId, "all")) {
          finalVal = "all";
        }
      }
      else {
        const combo = activeVals.join("+");
        if (hasWrapper(activeId, combo)) {
          finalVal = combo;
        } else if (hasWrapper(activeId, "all")) {
          finalVal = "all";
        }
      }
    }

    wrappers.forEach(w => {
      const sameId = w.dataset.id === activeId;
      const sameVal = finalVal !== null && w.dataset.val === finalVal;
      w.style.display = sameId && sameVal ? "block" : "none";
    });

    setTimeout(() => window.dispatchEvent(new Event("resize")), 30);
    setTimeout(() => window.dispatchEvent(new Event("resize")), 120);
  }

  idSwitches.forEach(sw => {
    sw.addEventListener("click", () => {
      idSwitches.forEach(s => s.classList.remove("active"));
      sw.classList.add("active");
      activeId = sw.dataset.id;
      applyFilter();
    });
  });

  valSwitches.forEach(sw => {
    sw.addEventListener("click", () => {
      if (sw.classList.contains("disabled")) return;
      sw.classList.toggle("active");
      applyFilter();
    });
  });

  applyFilter();
});

