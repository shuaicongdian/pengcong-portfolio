(() => {
  "use strict";

  const content = window.SITE_CONTENT;
  if (!content) return;

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const setText = (selector, value) => {
    $$(selector).forEach((element) => {
      element.textContent = value ?? "";
    });
  };

  const { person, hero, works, mulan, aiProjects, skills, contact, footer } = content;

  setText("[data-person-name]", person.name);
  setText("[data-person-role]", person.role);
  setText("[data-current-year]", new Date().getFullYear());
  setText("[data-footer-tagline]", footer.tagline);
  setText("[data-hero-eyebrow]", hero.eyebrow);
  setText("[data-hero-intro]", hero.intro);
  setText("[data-about-kicker]", content.about.kicker);
  setText("[data-about-title]", content.about.title);
  setText("[data-work-kicker]", works.kicker);
  setText("[data-work-title]", works.title);
  setText("[data-work-intro]", works.intro);
  setText("[data-mulan-kicker]", mulan.kicker);
  setText("[data-mulan-title]", mulan.title);
  setText("[data-mulan-subtitle]", mulan.subtitle);
  setText("[data-ai-kicker]", aiProjects.kicker);
  setText("[data-ai-title]", aiProjects.title);
  setText("[data-ai-intro]", aiProjects.intro);
  setText("[data-skills-kicker]", skills.kicker);
  setText("[data-skills-title]", skills.title);
  setText("[data-contact-kicker]", contact.kicker);
  setText("[data-contact-title]", contact.title);
  setText("[data-contact-text]", contact.text);
  setText("[data-email-text]", person.email);
  setText("[data-phone-text]", person.phone);

  const title = $("[data-style-b-title]");
  if (title) {
    title.innerHTML = "编导，<em>也是 AI 创作者。</em>";
  }

  $$("[data-resume-link]").forEach((link) => {
    link.href = person.resumeUrl;
  });
  $$("[data-email-link]").forEach((link) => {
    link.href = `mailto:${person.email}`;
  });

  const navMarkup = content.nav.map((item) => `<a href="${item.href}">${item.label}</a>`).join("");
  const railNav = $("[data-nav]");
  const mobileNav = $("[data-mobile-nav]");
  if (railNav) railNav.innerHTML = navMarkup;
  if (mobileNav) mobileNav.innerHTML = navMarkup;

  const metrics = $("[data-metrics]");
  if (metrics) {
    metrics.innerHTML = hero.metrics
      .map(
        (metric) => `
          <article class="fact">
            <strong>${metric.value}<sup>${metric.suffix}</sup></strong>
            <span>${metric.label}</span>
            <small>${metric.note}</small>
          </article>
        `
      )
      .join("");
  }

  const aboutCopy = $("[data-about-copy]");
  if (aboutCopy) aboutCopy.innerHTML = content.about.paragraphs.map((text) => `<p>${text}</p>`).join("");

  const principles = $("[data-principles]");
  if (principles) {
    principles.innerHTML = content.about.principles
      .map(
        (item) => `
          <article class="principle">
            <span class="principle__index">${item.index}</span>
            <div>
              <h3>${item.title}</h3>
              <p>${item.text}</p>
            </div>
          </article>
        `
      )
      .join("");
  }

  const education = content.about.education;
  const educationElement = $("[data-education]");
  if (educationElement) {
    educationElement.innerHTML = `
      <div>
        <p class="education__label">${education.label}</p>
        <h3>${education.school}</h3>
      </div>
      <div class="education__details">
        <p>${education.major}</p>
        <p>${education.date}</p>
        <p>${education.courses}</p>
      </div>
      <ul class="education__honors">
        ${education.honors.map((honor) => `<li>${honor}</li>`).join("")}
      </ul>
    `;
  }

  const experience = $("[data-experience]");
  if (experience) {
    experience.innerHTML = content.experiences
      .map(
        (item) => `
          <article class="experience-item">
            <time class="experience-item__date">${item.date}</time>
            <div class="experience-item__company">
              <h3>${item.company}</h3>
              <p>${item.project} · ${item.role}</p>
            </div>
            <div class="experience-item__content">
              <p>${item.summary}</p>
              <ul>${item.highlights.map((highlight) => `<li>${highlight}</li>`).join("")}</ul>
            </div>
          </article>
        `
      )
      .join("");
  }

  const workList = $("[data-works]");
  if (workList) {
    workList.innerHTML = works.items
      .map((item, index) => {
        const image = item.image
          ? `<img src="${item.image}" alt="${item.imageAlt || item.title}" />`
          : "";
        const external = item.link
          ? `<a href="${item.link}" target="_blank" rel="noreferrer">${item.linkLabel || "查看作品"} ↗</a>`
          : `<span>内容案例</span>`;
        return `
          <article class="work-item ${index === 0 ? "work-item--large" : ""} work-item--${item.coverClass.replace("work-cover--", "")} reveal">
            <div class="work-item__visual">
              <span>${String(index + 1).padStart(2, "0")} / ${item.type}</span>
              ${image}
            </div>
            <div class="work-item__body">
              <h3>${item.title}</h3>
              <p>${item.summary}</p>
              <div class="work-item__meta">
                <strong>${item.result}</strong>
                ${external}
              </div>
            </div>
          </article>
        `;
      })
      .join("");
  }

  const mulanFeature = $("[data-mulan]");
  if (mulanFeature) {
    mulanFeature.innerHTML = `
      <div class="mulan-hero">
        <figure class="mulan-hero__image">
          <img src="${mulan.posterUrl}" alt="${mulan.title}剧照" />
          <figcaption><span>SELECTED STILL</span><span>09:23</span></figcaption>
        </figure>
        <div class="mulan-hero__copy">
          <p class="mulan-hero__label">DOCUMENTARY / 14:49</p>
          <h3>${mulan.title}</h3>
          <p>${mulan.intro}</p>
          <div class="mulan-stats">
            ${mulan.stats.map((stat) => `
              <div>
                <strong>${stat.value}</strong>
                <span>${stat.label}</span>
                <small>${stat.note}</small>
              </div>
            `).join("")}
          </div>
          <a class="mulan-link" href="${mulan.bilibili}" target="_blank" rel="noreferrer">在 Bilibili 观看全片 ↗</a>
        </div>
      </div>

      <div class="mulan-stills">
        <div class="mulan-stills__head">
          <span>FILM STILLS</span>
          <span>${String(mulan.stills.length).padStart(2, "0")} FRAMES</span>
        </div>
        <div class="mulan-stills__grid">
          ${mulan.stills.map((still, index) => `
            <a class="mulan-photo mulan-photo--${(index % 5) + 1}" href="${still.src}" target="_blank" rel="noreferrer">
              <img src="${still.src}" alt="${still.alt}" loading="lazy" />
              <span>${String(index + 1).padStart(2, "0")} / ${still.time}</span>
            </a>
          `).join("")}
        </div>
      </div>
    `;
  }

  const videoCase = aiProjects.videoCase;
  const videoFeature = $("[data-ai-video]");
  if (videoFeature) {
    videoFeature.innerHTML = `
      <div class="ai-feature__video">
        <video controls playsinline preload="metadata" poster="${videoCase.posterUrl}" aria-label="${videoCase.title}">
          <source src="${videoCase.videoUrl}" type="video/mp4" />
        </video>
      </div>
      <div class="ai-feature__copy">
        <p>${videoCase.eyebrow}</p>
        <h3>${videoCase.title}</h3>
        <p>${videoCase.summary}</p>
        <div class="ai-feature__words">
          ${videoCase.visualKeywords.map((word) => `<span>${word}</span>`).join("")}
        </div>
        <details class="prompt-details">
          <summary>查看完整提示词 <span>＋</span></summary>
          <p>${videoCase.prompt}</p>
        </details>
      </div>
    `;
  }

  const gameCase = aiProjects.gameCase;
  const gameFeature = $("[data-ai-game]");
  if (gameFeature) {
    gameFeature.innerHTML = `
      <div class="ai-game__image">
        <img src="${gameCase.previewImage}" alt="${gameCase.previewAlt}" loading="lazy" />
      </div>
      <div class="ai-game__copy">
        <p>${gameCase.eyebrow}</p>
        <h3>${gameCase.title}</h3>
        <p>${gameCase.summary}</p>
        <div class="ai-game__facts">
          ${gameCase.stats
            .map((stat) => `<div><strong>${stat.value}</strong><span>${stat.label} · ${stat.note}</span></div>`)
            .join("")}
        </div>
        <div class="ai-game__tags">
          ${gameCase.roles.map((role) => `<span>${role.name}</span>`).join("")}
          ${gameCase.nextSteps.map((step) => `<span>${step}</span>`).join("")}
        </div>
      </div>
    `;
  }

  const skillList = $("[data-skills]");
  if (skillList) {
    skillList.innerHTML = skills.groups
      .map(
        (group) => `
          <article class="skill-row">
            <span class="skill-row__number">${group.number}</span>
            <h3>${group.title}</h3>
            <div class="skill-row__items">${group.items.map((item) => `<span>${item}</span>`).join("")}</div>
          </article>
        `
      )
      .join("");
  }

  const platforms = $("[data-platforms]");
  if (platforms) {
    platforms.innerHTML = skills.platforms.map((item) => `<span>${item}</span>`).join("");
  }

  const menuToggle = $(".menu-toggle");
  const closeMenu = () => {
    document.body.classList.remove("menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  };
  menuToggle?.addEventListener("click", () => {
    const open = document.body.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });
  $$(".mobile-nav a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  const reveals = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, instance) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          instance.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((element) => observer.observe(element));
  } else {
    reveals.forEach((element) => element.classList.add("is-visible"));
  }

  const navLinks = $$(".rail-nav a");
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) => {
            const active = link.getAttribute("href") === `#${entry.target.id}`;
            link.classList.toggle("is-active", active);
          });
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    sections.forEach((section) => sectionObserver.observe(section));
  }
})();
