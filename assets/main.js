(() => {
  "use strict";

  const content = window.SITE_CONTENT;

  if (!content) {
    console.error("未找到网站内容配置。请确认 assets/content.js 已正确加载。");
    return;
  }

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const setText = (selector, value) => {
    $$(selector).forEach((element) => {
      element.textContent = value ?? "";
    });
  };

  const person = content.person;
  const hero = content.hero;
  const work = content.works;
  const aiProjects = content.aiProjects;
  const videoCase = aiProjects.videoCase;
  const gameCase = aiProjects.gameCase;
  const skills = content.skills;

  document.title = `${person.name}｜${person.role}`;
  setText("[data-person-name]", person.name);
  setText("[data-person-english]", person.englishName);
  setText("[data-person-role]", person.role);
  setText("[data-current-year]", new Date().getFullYear());
  setText("[data-footer-tagline]", content.footer.tagline);
  setText("[data-hero-eyebrow]", hero.eyebrow);
  setText("[data-hero-intro]", hero.intro);
  setText("[data-hero-primary]", hero.primaryCta);
  setText("[data-hero-secondary]", hero.secondaryCta);
  setText("[data-about-kicker]", content.about.kicker);
  setText("[data-about-title]", content.about.title);
  setText("[data-work-kicker]", work.kicker);
  setText("[data-work-title]", work.title);
  setText("[data-work-intro]", work.intro);
  setText("[data-ai-kicker]", aiProjects.kicker);
  setText("[data-ai-title]", aiProjects.title);
  setText("[data-ai-intro]", aiProjects.intro);
  setText("[data-skills-kicker]", skills.kicker);
  setText("[data-skills-title]", skills.title);
  setText("[data-platform-title]", skills.platformTitle);
  setText("[data-contact-kicker]", content.contact.kicker);
  setText("[data-contact-title]", content.contact.title);
  setText("[data-contact-text]", content.contact.text);
  setText("[data-contact-email-label]", content.contact.emailLabel);
  setText("[data-contact-phone-label]", content.contact.phoneLabel);
  setText("[data-contact-resume-label]", content.contact.resumeLabel);
  setText("[data-contact-email]", person.email);
  setText("[data-contact-phone]", person.phone);

  const heroTitle = $("[data-hero-title]");
  if (heroTitle) {
    heroTitle.innerHTML = hero.headline.replace(
      "变成愿意看完的内容。",
      "<em>变成愿意看完的内容。</em>"
    );
  }

  $$("[data-resume-link]").forEach((link) => {
    link.href = person.resumeUrl;
  });

  const emailLink = $("[data-email-link]");
  if (emailLink) {
    emailLink.href = `mailto:${person.email}`;
  }

  const nav = $("[data-nav]");
  if (nav) {
    nav.innerHTML = content.nav
      .map((item) => `<a href="${item.href}">${item.label}</a>`)
      .join("");
  }

  const metrics = $("[data-hero-metrics]");
  if (metrics) {
    metrics.innerHTML = hero.metrics
      .map(
        (metric) => `
          <article class="metric">
            <p class="metric__value">
              <span data-count="${metric.value}">0</span><sup>${metric.suffix}</sup>
            </p>
            <h3 class="metric__label">${metric.label}</h3>
            <p class="metric__note">${metric.note}</p>
          </article>
        `
      )
      .join("");
  }

  const aboutCopy = $("[data-about-copy]");
  if (aboutCopy) {
    aboutCopy.innerHTML = content.about.paragraphs.map((text) => `<p>${text}</p>`).join("");
  }

  const principles = $("[data-about-principles]");
  if (principles) {
    principles.innerHTML = content.about.principles
      .map(
        (item) => `
          <article class="principle">
            <span class="principle__index">${item.index}</span>
            <h3>${item.title}</h3>
            <p>${item.text}</p>
          </article>
        `
      )
      .join("");
  }

  const education = content.about.education;
  const educationCard = $("[data-education-card]");
  if (educationCard) {
    educationCard.innerHTML = `
      <div>
        <p class="education-card__label">${education.label}</p>
        <h3 class="education-card__school">${education.school}</h3>
        <p class="education-card__major">${education.major}</p>
        <p class="education-card__date">${education.date}</p>
      </div>
      <p class="education-card__courses">${education.courses}</p>
      <ul class="education-card__honors">
        ${education.honors.map((honor) => `<li>${honor}</li>`).join("")}
      </ul>
    `;
  }

  const experienceList = $("[data-experience-list]");
  if (experienceList) {
    experienceList.innerHTML = content.experiences
      .map(
        (experience, index) => `
          <article class="timeline__item">
            <div class="timeline__meta">
              <span class="timeline__index">${String(index + 1).padStart(2, "0")}</span>
              <time class="timeline__date">${experience.date}</time>
              ${experience.current ? '<span class="timeline__current">进行中</span>' : ""}
            </div>
            <div class="timeline__content">
              <div>
                <h3 class="timeline__company">${experience.company}</h3>
                <p class="timeline__project">${experience.project}</p>
                <span class="timeline__role">${experience.role}</span>
              </div>
              <div>
                <p class="timeline__summary">${experience.summary}</p>
                <ul class="timeline__highlights">
                  ${experience.highlights.map((highlight) => `<li>${highlight}</li>`).join("")}
                </ul>
              </div>
            </div>
          </article>
        `
      )
      .join("");
  }

  const workGrid = $("[data-work-grid]");
  if (workGrid) {
    workGrid.innerHTML = work.items
      .map((item, index) => {
        const playIcon = `
          <span class="work-cover__play">
            <span class="work-cover__play-icon">
              <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m7 5 8 5-8 5V5Z" /></svg>
            </span>
            <span>${item.videoLabel || "播放全片"}</span>
          </span>
        `;

        const cover = item.videoUrl
          ? `
              <button class="work-card__cover work-cover ${item.coverClass} work-cover--video" type="button" data-video-open="${index}" aria-label="播放${item.title}">
                <span class="work-cover__label">${item.type}</span>
                <span class="work-cover__index">${String(index + 1).padStart(2, "0")}</span>
                ${playIcon}
              </button>
            `
          : `
              <div class="work-card__cover work-cover ${item.coverClass}">
                <span class="work-cover__label">${item.type}</span>
                <span class="work-cover__index">${String(index + 1).padStart(2, "0")}</span>
              </div>
            `;

        const videoAction = item.videoUrl
          ? `
              <button class="work-card__link" type="button" data-video-open="${index}">
                ${item.videoLabel || "站内播放"}
                <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m7 5 8 5-8 5V5Z" /></svg>
              </button>
            `
          : "";

        const externalAction = item.link
          ? `
              <a class="work-card__link" href="${item.link}" target="_blank" rel="noreferrer">
                ${item.linkLabel || "查看作品"}
                <svg viewBox="0 0 18 18" aria-hidden="true">
                  <path d="M4 14 14 4m-6 0h6v6" />
                </svg>
              </a>
            `
          : "";

        const actions = videoAction || externalAction
          ? `<div class="work-card__actions">${videoAction}${externalAction}</div>`
          : '<span class="work-card__link">项目拆解待补充</span>';

        return `
          <article class="work-card ${item.featured ? "work-card--featured" : ""}">
            ${cover}
            <div class="work-card__body">
              <p class="work-card__type">${item.type}</p>
              <h3 class="work-card__title">${item.title}</h3>
              <p class="work-card__summary">${item.summary}</p>
              <div class="work-card__tags">
                ${item.tags.map((tag) => `<span>${tag}</span>`).join("")}
              </div>
              <div class="work-card__footer">
                <strong class="work-card__result">${item.result}</strong>
                ${actions}
              </div>
            </div>
          </article>
        `;
      })
      .join("");
  }

  const videoModal = $("[data-video-modal]");
  const videoPlayer = $("[data-video-player]");
  const videoTitle = $("[data-video-title]");
  const videoMeta = $("[data-video-meta]");
  const videoExternal = $("[data-video-external]");

  const closeVideoModal = () => {
    if (!videoModal?.open) return;
    if (videoPlayer) {
      videoPlayer.pause();
      videoPlayer.removeAttribute("src");
      videoPlayer.removeAttribute("poster");
      videoPlayer.load();
    }
    videoModal.close();
    document.body.classList.remove("modal-open");
  };

  const openVideoModal = (index) => {
    const item = work.items[index];
    if (!videoModal || !videoPlayer || !item?.videoUrl) return;

    if (videoTitle) videoTitle.textContent = item.title;
    if (videoMeta) videoMeta.textContent = `${item.type} · ${item.result}`;
    if (videoExternal) {
      const hasExternal = Boolean(item.link);
      videoExternal.hidden = !hasExternal;
      if (hasExternal) {
        videoExternal.href = item.link;
        videoExternal.textContent = item.linkLabel || "查看外链";
      }
    }

    videoPlayer.pause();
    videoPlayer.src = item.videoUrl;
    videoPlayer.poster = item.posterUrl || "";
    videoPlayer.load();

    if (typeof videoModal.showModal === "function") videoModal.showModal();
    else videoModal.setAttribute("open", "");

    document.body.classList.add("modal-open");
    const playAttempt = videoPlayer.play();
    if (playAttempt?.catch) playAttempt.catch(() => {});
  };

  $$("[data-video-open]").forEach((button) => {
    button.addEventListener("click", () => openVideoModal(Number(button.dataset.videoOpen)));
  });

  $$("[data-video-close]").forEach((button) => {
    button.addEventListener("click", closeVideoModal);
  });

  videoModal?.addEventListener("click", (event) => {
    if (event.target === videoModal) closeVideoModal();
  });

  videoModal?.addEventListener("close", () => {
    document.body.classList.remove("modal-open");
    if (videoPlayer) videoPlayer.pause();
  });

  const aiGrid = $("[data-ai-projects]");
  if (aiGrid) {
    aiGrid.innerHTML = aiProjects.projects
      .map(
        (project) => `
          <article class="ai-project ai-project--${project.theme} reveal">
            <header class="ai-project__top">
              <span class="ai-project__number">${project.number}</span>
              <span class="ai-project__type">${project.type}</span>
            </header>

            <div class="ai-project__body">
              <p class="ai-project__subtitle">${project.subtitle}</p>
              <h3>${project.title}</h3>
              <p class="ai-project__description">${project.description}</p>

              <ol class="ai-project__stages">
                ${project.stages
                  .map(
                    (stage, index) => `
                      <li>
                        <span>${String(index + 1).padStart(2, "0")}</span>
                        <strong>${stage}</strong>
                      </li>
                    `
                  )
                  .join("")}
              </ol>

              <div class="ai-project__tags">
                ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
              </div>
            </div>

            <footer class="ai-project__footer">
              <span>${project.outcome}</span>
              ${
                project.caseAnchor
                  ? `<a href="${project.caseAnchor}">${project.actionLabel || "查看案例"} <span>↓</span></a>`
                  : `<span>PROJECT / ${project.number}</span>`
              }
            </footer>
          </article>
        `
      )
      .join("");
  }

  const videoCaseElement = $("[data-video-case]");
  if (videoCaseElement && videoCase) {
    videoCaseElement.innerHTML = `
      <header class="video-case__header">
        <div>
          <p class="video-case__eyebrow">${videoCase.eyebrow}</p>
          <h3>${videoCase.title}</h3>
          <p class="video-case__subtitle">${videoCase.subtitle}</p>
        </div>
        <div class="video-case__spec">
          <span>${videoCase.duration}</span>
          <span>${videoCase.format}</span>
        </div>
      </header>

      <div class="video-case__overview">
        <figure class="video-case__player">
          <video controls playsinline preload="metadata" poster="${videoCase.posterUrl}" aria-label="${videoCase.title}">
            <source src="${videoCase.videoUrl}" type="video/mp4" />
            你的浏览器不支持 HTML5 视频播放。
          </video>
          <figcaption>
            <span>AI VIDEO DEMO / 10 SEC</span>
            <span>点击播放</span>
          </figcaption>
        </figure>

        <div class="video-case__summary">
          <p>${videoCase.summary}</p>
          <div class="video-case__highlights">
            ${videoCase.promptHighlights
              .map(
                (item) => `
                  <div>
                    <span>${item.label}</span>
                    <strong>${item.value}</strong>
                  </div>
                `
              )
              .join("")}
          </div>
          <div class="video-case__keywords">
            ${videoCase.visualKeywords.map((keyword) => `<span>${keyword}</span>`).join("")}
          </div>
        </div>
      </div>

      <section class="video-breakdown">
        <div class="video-case__section-heading">
          <p>PROMPT STRUCTURE / 提示词拆解</p>
          <span>六个层级共同控制人物、场景、节奏与最终画面</span>
        </div>
        <div class="video-breakdown__grid">
          ${videoCase.creativeStructure
            .map(
              (item) => `
                <article>
                  <span>${item.number}</span>
                  <h4>${item.title}</h4>
                  <p>${item.text}</p>
                </article>
              `
            )
            .join("")}
        </div>
      </section>

      <section class="video-prompt">
        <div class="video-prompt__constraints">
          <p class="video-case__section-heading">NEGATIVE CONSTRAINTS / 排除项</p>
          <div>
            ${videoCase.negativeConstraints.map((item) => `<span>${item}</span>`).join("")}
          </div>
        </div>
        <details class="video-prompt__details">
          <summary>
            <span>查看完整提示词</span>
            <span>FULL PROMPT</span>
          </summary>
          <p>${videoCase.prompt}</p>
        </details>
      </section>
    `;
  }

  const gameCaseElement = $("[data-game-case]");
  if (gameCaseElement && gameCase) {
    gameCaseElement.innerHTML = `
      <header class="game-case__header">
        <div>
          <p class="game-case__eyebrow">${gameCase.eyebrow}</p>
          <h3>${gameCase.title}</h3>
          <p class="game-case__subtitle">${gameCase.subtitle}</p>
        </div>
        <span class="game-case__status">${gameCase.status}</span>
      </header>

      <div class="game-case__overview">
        <figure class="game-case__preview">
          <img src="${gameCase.previewImage}" alt="${gameCase.previewAlt}" loading="lazy" />
          <figcaption>
            <span>BUILD / PLAYABLE PROTOTYPE</span>
            <span>1600 × 900</span>
          </figcaption>
        </figure>

        <div class="game-case__summary">
          <p>${gameCase.summary}</p>
          <div class="game-case__stats">
            ${gameCase.stats
              .map(
                (stat) => `
                  <div>
                    <strong>${stat.value}</strong>
                    <span>${stat.label}</span>
                    <small>${stat.note}</small>
                  </div>
                `
              )
              .join("")}
          </div>
        </div>
      </div>

      <section class="game-loop">
        <p class="game-case__section-label">CORE LOOP / 核心闭环</p>
        <ol class="game-loop__steps">
          ${gameCase.loop
            .map(
              (item) => `
                <li>
                  <span>${item.step}</span>
                  <h4>${item.title}</h4>
                  <p>${item.text}</p>
                </li>
              `
            )
            .join("")}
        </ol>
      </section>

      <section class="game-roles">
        <p class="game-case__section-label">PLAYABLE CLASSES / 双职业</p>
        <div class="game-roles__grid">
          ${gameCase.roles
            .map(
              (role) => `
                <article class="game-role game-role--${role.type.toLowerCase()}">
                  <p>${role.type}</p>
                  <h4>${role.name}</h4>
                  <p class="game-role__description">${role.description}</p>
                  <div class="game-role__ultimate">
                    <span>ULTIMATE</span>
                    <strong>${role.ultimate}</strong>
                    <p>${role.ultimateDescription}</p>
                  </div>
                </article>
              `
            )
            .join("")}
        </div>
      </section>

      <section class="game-systems">
        <p class="game-case__section-label">SYSTEM BREAKDOWN / 系统拆解</p>
        <div class="game-systems__grid">
          ${gameCase.systems
            .map(
              (system) => `
                <article>
                  <span>${system.number}</span>
                  <h4>${system.title}</h4>
                  <p>${system.text}</p>
                </article>
              `
            )
            .join("")}
        </div>
      </section>

      <section class="game-case__process">
        <div>
          <p class="game-case__section-label">AI WORKFLOW / AI 参与方式</p>
          <ul class="game-process__list">
            ${gameCase.aiWorkflow.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </div>
        <div class="game-case__next">
          <p class="game-case__section-label">NEXT / 下一阶段</p>
          <div>
            ${gameCase.nextSteps.map((item) => `<span>${item}</span>`).join("")}
          </div>
        </div>
      </section>
    `;
  }

  const skillGroups = $("[data-skill-groups]");
  if (skillGroups) {
    skillGroups.innerHTML = skills.groups
      .map(
        (group) => `
          <article class="skill-card">
            <span class="skill-card__number">${group.number}</span>
            <h3>${group.title}</h3>
            <p>${group.text}</p>
            <ul>
              ${group.items.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </article>
        `
      )
      .join("");
  }

  const platformTags = $("[data-platform-tags]");
  if (platformTags) {
    platformTags.innerHTML = skills.platforms.map((platform) => `<span>${platform}</span>`).join("");
  }

  const workflow = $("[data-workflow]");
  if (workflow) {
    workflow.innerHTML = skills.workflow
      .map(
        (step) => `
          <article class="workflow__step">
            <span class="workflow__number">${step.step}</span>
            <h4>${step.title}</h4>
            <p>${step.text}</p>
          </article>
        `
      )
      .join("");
  }

  const menuToggle = $(".menu-toggle");
  const navLinks = $$(".site-nav a");

  const closeMenu = () => {
    document.body.classList.remove("nav-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  };

  menuToggle?.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  const header = $("[data-header]");
  const updateHeader = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const revealElements = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    revealElements.forEach((element, index) => {
      element.style.transitionDelay = `${Math.min(index % 3, 2) * 80}ms`;
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const counters = $$("[data-count]");

  const animateCounter = (element) => {
    if (element.dataset.counted === "true") return;
    element.dataset.counted = "true";

    const target = Number(element.dataset.count);
    if (reducedMotion || !Number.isFinite(target)) {
      element.textContent = target;
      return;
    }

    const duration = 1100;
    const start = performance.now();

    const tick = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => counterObserver.observe(counter));
  } else {
    counters.forEach(animateCounter);
  }

  const rotatingWord = $("[data-rotating-word]");
  if (rotatingWord && hero.rotatingWords.length > 1 && !reducedMotion) {
    let wordIndex = 0;
    window.setInterval(() => {
      rotatingWord.classList.add("is-changing");
      window.setTimeout(() => {
        wordIndex = (wordIndex + 1) % hero.rotatingWords.length;
        rotatingWord.textContent = hero.rotatingWords[wordIndex];
        rotatingWord.classList.remove("is-changing");
      }, 180);
    }, 2400);
  }

  const navSections = navLinks
    .map((link) => {
      const hash = link.getAttribute("href");
      return hash?.startsWith("#") ? document.querySelector(hash) : null;
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && navSections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) => {
            const isActive = link.getAttribute("href") === `#${entry.target.id}`;
            link.classList.toggle("is-active", isActive);
            if (isActive) link.setAttribute("aria-current", "page");
            else link.removeAttribute("aria-current");
          });
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );

    navSections.forEach((section) => sectionObserver.observe(section));
  }
})();
