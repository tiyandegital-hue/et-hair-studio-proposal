/* ET Hair Studio — concept proposal site
   One swappable business constant drives the re-brandable template. */
(function () {
  "use strict";

  /* ---------------- Business constant ---------------- */
  const SITE = {
    name: "ET Hair Studio",
    tagline: "Fernie's full-service hair studio",
    phone: "+1 250-423-4813",
    phoneHref: "tel:+12504234813",
    address: "462 2 St, Fernie BC V0B 1M0",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=ET+Hair+Studio+462+2+St+Fernie+BC",
    schedulicity: "https://www.schedulicity.com/scheduling/[SCHEDULICITY-ID]",
    demoUrl: "https://et-hair-studio-proposal.vercel.app",
    rating: "4.8",
    reviewCount: "41",
    reviewSource: "Birdeye listing, November 2026"
  };

  /* Re-brand: swap every [data-site-name] span from the constant */
  function applySiteName() {
    var els = document.querySelectorAll("[data-site-name]");
    for (var i = 0; i < els.length; i++) els[i].textContent = SITE.name;
  }

  /* ---------------- Sample menu (ALL sample — confirmed in person) ---------------- */
  const SAMPLE_MENU = [
    { cat: "cut", name: "One-length trim", price: "from $45", upkeep: "low",
      occasion: ["everyday"],
      blurb: "Sample: a clean, even trim that keeps length healthy between bigger appointments." },
    { cat: "cut", name: "Precision cut + style", price: "from $65", upkeep: "medium",
      occasion: ["everyday", "transformation"],
      blurb: "Sample: shaped cut finished with a blowout, tailored to how your hair actually falls." },
    { cat: "cut", name: "Face-framing reshape", price: "from $70", upkeep: "low",
      occasion: ["transformation"],
      blurb: "Sample: soft layers around the face — a visible change with easy at-home upkeep." },
    { cat: "cut", name: "Kid's cut (under 12)", price: "from $35", upkeep: "low",
      occasion: ["everyday"],
      blurb: "Sample: patient, quick cuts for young clients." },
    { cat: "colour", name: "Root touch-up", price: "from $75", upkeep: "medium",
      occasion: ["everyday"],
      blurb: "Sample: seamless regrowth blend, back to fresh in one sitting." },
    { cat: "colour", name: "Full colour", price: "from $110", upkeep: "medium",
      occasion: ["everyday", "transformation"],
      blurb: "Sample: rich, even colour from roots to ends." },
    { cat: "colour", name: "Partial balayage", price: "from $140", upkeep: "medium",
      occasion: ["transformation"],
      blurb: "Sample: hand-painted lightness through the mid-lengths and ends." },
    { cat: "colour", name: "Full balayage + reshape", price: "from $185", upkeep: "high",
      occasion: ["transformation"],
      blurb: "Sample: the full transformation — dimensional colour with a fresh shape." },
    { cat: "colour", name: "Gloss + toner refresh", price: "from $60", upkeep: "low",
      occasion: ["everyday"],
      blurb: "Sample: shine and tone revival between colour appointments." },
    { cat: "style", name: "Signature blowout", price: "from $45", upkeep: "low",
      occasion: ["everyday", "wedding"],
      blurb: "Sample: smooth, bouncy finish that lasts for days." },
    { cat: "style", name: "Event styling + trial", price: "from $85", upkeep: "low",
      occasion: ["wedding"],
      blurb: "Sample: a trial run plus day-of styling, so the big day holds no surprises." },
    { cat: "style", name: "Updo", price: "from $95", upkeep: "low",
      occasion: ["wedding"],
      blurb: "Sample: pinned, polished, and built to last through the last dance." },
    { cat: "style", name: "Braids + texture", price: "from $55", upkeep: "medium",
      occasion: ["wedding", "everyday"],
      blurb: "Sample: lived-in braids and texture for events or the everyday." },
    { cat: "treatments", name: "Deep conditioning ritual", price: "from $40", upkeep: "low",
      occasion: ["everyday", "transformation"],
      blurb: "Sample: intensive moisture reset for dry or stressed hair." },
    { cat: "treatments", name: "Scalp reset treatment", price: "from $50", upkeep: "low",
      occasion: ["everyday"],
      blurb: "Sample: exfoliating scalp care — healthy hair starts at the root." },
    { cat: "treatments", name: "Keratin smoothing", price: "consultation", upkeep: "high",
      occasion: ["transformation"],
      blurb: "Sample: frizz-taming smoothing — book a consultation to talk through options." }
  ];

  /* ---------------- Mobile nav (keyboard-friendly) ---------------- */
  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var links = document.querySelector(".nav-links");
    if (!toggle || !links) return;
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && links.classList.contains("open")) {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------------- Hero entrance (plays once, to completion) ---------------- */
  function initEntrance() {
    var els = document.querySelectorAll(".hero [data-entrance]");
    if (!els.length) return;
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        for (var i = 0; i < els.length; i++) els[i].classList.add("played");
      });
    });
  }

  /* ---------------- Reveal on scroll ---------------- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!els.length || !("IntersectionObserver" in window)) {
      for (var i = 0; i < els.length; i++) els[i].classList.add("in");
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------------- "Find your service" picker ----------------
     Step 1: occasion → Step 2: upkeep → Step 3: recommendation.
     Real logic over the sample menu; result deep-links to booking. */
  function initPicker() {
    var root = document.getElementById("finder");
    if (!root) return;
    var stepsEl = root.querySelector(".finder-steps");
    var qEl = root.querySelector(".finder-q");
    var optsEl = root.querySelector(".finder-opts");
    var backBtn = root.querySelector(".finder-back");
    if (!stepsEl || !qEl || !optsEl) return;

    var state = { occasion: null, upkeep: null, step: 1 };
    var OCCASIONS = [
      { id: "wedding", label: "Wedding or event", hint: "The big day, done right" },
      { id: "everyday", label: "Everyday wear", hint: "Low-fuss, always ready" },
      { id: "transformation", label: "Big transformation", hint: "A brand-new look" }
    ];
    var UPKEEPS = [
      { id: "low", label: "Low upkeep", hint: "Wash, go, done" },
      { id: "medium", label: "Some upkeep", hint: "A little styling love" },
      { id: "high", label: "I love upkeep", hint: "High-maintenance, happily" }
    ];

    function paintSteps() {
      var bars = stepsEl.querySelectorAll(".finder-step");
      bars.forEach(function (bar, i) {
        bar.classList.toggle("done", i < state.step);
      });
    }

    function renderOptions(items) {
      optsEl.innerHTML = "";
      items.forEach(function (item) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "finder-opt";
        b.innerHTML = "";
        var label = document.createElement("span");
        label.textContent = item.label;
        var hint = document.createElement("small");
        hint.textContent = item.hint;
        b.appendChild(label);
        b.appendChild(hint);
        b.addEventListener("click", function () { item.onPick(); });
        optsEl.appendChild(b);
      });
    }

    function renderResult(rec, alt) {
      paintSteps();
      qEl.textContent = "Your match";
      optsEl.innerHTML = "";
      var card = document.createElement("div");
      card.className = "finder-result";
      card.setAttribute("role", "status");
      card.setAttribute("aria-live", "polite");

      var tag = document.createElement("span");
      tag.className = "tag-sample";
      tag.textContent = "sample";
      var name = document.createElement("div");
      name.className = "rec-name";
      name.textContent = rec.name;
      name.prepend(tag);
      var price = document.createElement("div");
      price.className = "rec-price";
      price.textContent = rec.price + " · " + rec.cat;
      var blurb = document.createElement("div");
      blurb.className = "rec-blurb";
      blurb.textContent = rec.blurb + " (Sample service and price — confirmed in person.)";
      var cta = document.createElement("a");
      cta.className = "btn";
      cta.href = "booking.html?service=" + encodeURIComponent(rec.name);
      cta.textContent = "Request this service";
      card.appendChild(name);
      card.appendChild(price);
      card.appendChild(blurb);
      card.appendChild(cta);

      if (alt && alt.name !== rec.name) {
        var altWrap = document.createElement("div");
        altWrap.className = "finder-alt";
        altWrap.appendChild(document.createTextNode("Also worth a look: "));
        var altLink = document.createElement("a");
        altLink.href = "booking.html?service=" + encodeURIComponent(alt.name);
        altLink.textContent = alt.name + " (" + alt.price + ", sample)";
        altWrap.appendChild(altLink);
        card.appendChild(altWrap);
      }
      optsEl.appendChild(card);
      backBtn.hidden = false;
      backBtn.textContent = "Start over";
      backBtn.onclick = reset;
    }

    function pick() {
      /* Score: must match occasion; prefer matching upkeep; stable order otherwise */
      var pool = SAMPLE_MENU.filter(function (s) { return s.occasion.indexOf(state.occasion) !== -1; });
      if (!pool.length) pool = SAMPLE_MENU.slice();
      var ranked = pool.slice().sort(function (a, b) {
        var sa = a.upkeep === state.upkeep ? 0 : 1;
        var sb = b.upkeep === state.upkeep ? 0 : 1;
        return sa - sb;
      });
      renderResult(ranked[0], ranked[1]);
    }

    function renderStep() {
      paintSteps();
      backBtn.hidden = state.step === 1;
      if (state.step === 1) {
        qEl.textContent = "What's the occasion?";
        backBtn.textContent = "Back";
        backBtn.onclick = null;
        renderOptions(OCCASIONS.map(function (o) {
          return { label: o.label, hint: o.hint, onPick: function () { state.occasion = o.id; state.step = 2; renderStep(); } };
        }));
      } else if (state.step === 2) {
        qEl.textContent = "How much upkeep do you want?";
        backBtn.textContent = "Back";
        backBtn.onclick = function () { state.step = 1; renderStep(); };
        renderOptions(UPKEEPS.map(function (u) {
          return { label: u.label, hint: u.hint, onPick: function () { state.upkeep = u.id; state.step = 3; pick(); } };
        }));
      }
    }

    function reset() { state = { occasion: null, upkeep: null, step: 1 }; renderStep(); }

    renderStep();
  }

  /* ---------------- Lightbox (keyboard-dismissable) ---------------- */
  function initLightbox() {
    var lb = document.getElementById("lightbox");
    if (!lb) return;
    var lbImg = lb.querySelector("img");
    var lbCap = lb.querySelector(".lb-cap");
    var closeBtn = lb.querySelector(".lightbox-close");
    var lastFocus = null;

    function open(src, alt, cap) {
      lastFocus = document.activeElement;
      lbImg.src = src;
      lbImg.alt = alt || "";
      lbCap.textContent = cap || alt || "";
      lb.hidden = false;
      document.body.style.overflow = "hidden";
      closeBtn.focus();
    }
    function close() {
      lb.hidden = true;
      document.body.style.overflow = "";
      lbImg.removeAttribute("src");
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    document.querySelectorAll("[data-lightbox]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var img = btn.querySelector("img");
        open(img.getAttribute("src"), img.getAttribute("alt"), btn.getAttribute("data-caption") || "");
      });
    });
    closeBtn.addEventListener("click", close);
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !lb.hidden) close();
    });
  }

  /* ---------------- Demo forms: validation + consent gate ---------------- */
  function setFieldError(field, message) {
    field.classList.toggle("invalid", !!message);
    var msg = field.querySelector(".error-msg");
    if (msg) msg.textContent = message || "";
    var input = field.querySelector("input, select, textarea");
    if (input) {
      if (message) input.setAttribute("aria-invalid", "true");
      else input.removeAttribute("aria-invalid");
    }
  }

  function validateDemoForm(form) {
    var ok = true;
    var firstBad = null;
    form.querySelectorAll("[data-validate]").forEach(function (input) {
      var field = input.closest(".field");
      if (!field) return;
      var val = (input.value || "").trim();
      var msg = "";
      if (input.hasAttribute("required") && !val) {
        msg = "This field is required.";
      } else if (input.type === "tel" && val && !/^[+\d][\d\s().-]{6,}$/.test(val)) {
        msg = "Please enter a valid phone number.";
      }
      setFieldError(field, msg);
      if (msg) { ok = false; if (!firstBad) firstBad = input; }
    });
    var consent = form.querySelector('input[name="consent"]');
    if (consent && !consent.checked) {
      ok = false;
      var box = consent.closest(".consent");
      if (box) {
        box.style.borderColor = "var(--error)";
        if (!firstBad) firstBad = consent;
      }
    } else if (consent) {
      consent.closest(".consent").style.borderColor = "";
    }
    if (firstBad) firstBad.focus();
    return ok;
  }

  function initDemoForms() {
    document.querySelectorAll("form[data-demo-form]").forEach(function (form) {
      var success = form.parentElement.querySelector(".form-success");
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!validateDemoForm(form)) return;
        /* Demo: nothing is sent anywhere. Show the honest state. */
        if (success) {
          success.classList.add("show");
          success.setAttribute("tabindex", "-1");
          success.focus();
        }
        form.reset();
        form.querySelectorAll(".field.invalid").forEach(function (f) { f.classList.remove("invalid"); });
      });
      /* Live-clear errors as the visitor fixes fields */
      form.querySelectorAll("[data-validate]").forEach(function (input) {
        input.addEventListener("input", function () {
          var field = input.closest(".field");
          if (field && field.classList.contains("invalid") && input.value.trim()) {
            setFieldError(field, "");
          }
        });
      });
    });
  }

  /* ---------------- Booking: preselect service from picker deep-link ---------------- */
  function initBookingPrefill() {
    var select = document.getElementById("booking-service");
    if (!select) return;
    var params = new URLSearchParams(window.location.search || "");
    var wanted = params.get("service");
    if (!wanted) return;
    var needle = wanted.toLowerCase();
    for (var i = 0; i < select.options.length; i++) {
      if (select.options[i].text.toLowerCase().indexOf(needle) !== -1 ||
          select.options[i].value.toLowerCase() === needle) {
        select.selectedIndex = i;
        break;
      }
    }
    var note = document.getElementById("booking-prefill-note");
    if (note) note.hidden = false;
  }

  /* ---------------- Boot ---------------- */
  document.addEventListener("DOMContentLoaded", function () {
    applySiteName();
    initNav();
    initEntrance();
    initReveal();
    initPicker();
    initLightbox();
    initDemoForms();
    initBookingPrefill();
    var year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());
  });
})();
