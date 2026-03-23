const STORAGE_KEY = "profile_theme";

const data = {
  person: {
    name: "[Tên của bạn]",
    title: "Frontend / Full-stack (Junior)",
    location: "[TP.HCM/Hà Nội/Remote]",
    email: "tiennv1293@gmail.com",
    github: "https://github.com/tienhoanganh",
    linkedin: "https://linkedin.com/in/tienhoanganh",
    website: "https://portfolio-tienhoanganh.vercel.app/",
  },
  skills: [
    { name: "HTML/CSS", level: "Strong", desc: "Responsive layout, UI systems, accessibility cơ bản." },
    { name: "JavaScript", level: "Strong", desc: "DOM, async, fetch, patterns, tối ưu tương tác." },
    { name: "React", level: "Good", desc: "Component design, hooks, state, forms, routing." },
    { name: "Node.js", level: "Good", desc: "REST API, auth cơ bản, xử lý file, background jobs." },
    { name: "MongoDB", level: "Strong", desc: "Thiết kế bảng, join, index cơ bản, truy vấn tối ưu." },
    { name: "Git", level: "Good", desc: "Workflow branch/PR, resolve conflicts, code review." },
  ],
  projects: [
    {
      title: "Orit Running",
      type: "Web - APP", 
      desc: "Web, APP chạy bộ, đăng nhập, phân quyền cho nhân viên sử dụng. Ngoài ra có thể mở trên Safari, nhấn 3 chấm chia sẻ link, add to Home screen. Sử dụng như một app thực tế mà không cần cài đặt từ App Store.",
      tags: ["React", "Node.js", "MongoDB", "JWT", "Tailwind CSS", "Typescript"],
      demo: "https://orit-running-z2.vercel.app/",
      source: "#",
      role: "Full-stack",
    },
    {
      title: "ShopTi - Ecommerce Web Application",
      type: "Web - APP",
      desc: "Web bán hàng có giỏ hàng, admin quản lý sản phẩm, đăng nhập, phân quyền.",
      tags: ["React", "Node.js", "MongoDB", "JWT", "HTML5", "CSS3", "JavaScript", "Fetch API", "hash routing"],
      demo: "https://shopti-tho.vercel.app/",
      source: "#",
      role: "Full-stack",
    },
    {
      title: "Wukong: The Lost Power",
      type: "fullstack",
      desc: "Trang giới thiệu đồ án tốt nghiệp (Action RPG) “Wukong: The Lost Power” - Unity, combat + puzzle, hệ thống AI/Clone và trình bày gameplay core loop.",
      tags: ["Unity", "C#", "HDRP", "Cinemachine", "AI", "Game Design"],
      demo: "https://wukong-the-lost-power-graduation-project.onrender.com/",
      source: "#",
      role: "Project presenter / Developer",
    },
    {
      title: "Quán Ăn Quê",
      type: "fullstack",
      desc: "Hệ thống trực tuyến cho nhà hàng/quán ăn: kiểm tra tình trạng bàn trống, đặt chỗ và đặt trước món ăn — giúp việc tổ chức buổi tụ họp với bạn bè và gia đình trở nên dễ dàng.",
      tags: ["Booking", "Table availability", "Pre-order", "Web App"],
      demo: "https://quananque.vercel.app/",
      source: "#",
      role: "Full-stack",
    },
  ],
  services: [
    { icon: "⚡", title: "Làm landing/website", desc: "Thiết kế UI + code chuẩn responsive, tốc độ tốt, dễ sửa." },
    { icon: "🧩", title: "Xây UI React", desc: "Component hoá, forms, routing, state, integration API." },
    { icon: "🔧", title: "Tích hợp API", desc: "Đăng nhập, CRUD, upload, search/filter, pagination." },
    { icon: "🧠", title: "Tối ưu & sửa lỗi", desc: "Fix UI, tối ưu render, cải thiện DX, dọn code." },
    { icon: "🔒", title: "Auth cơ bản", desc: "JWT/session, role-based access, bảo vệ routes." },
    { icon: "📦", title: "Deploy", desc: "Triển khai lên Vercel/Netlify/Render, cấu hình domain." },
  ],
};

function $(sel, root = document) {
  return root.querySelector(sel);
}
function $all(sel, root = document) {
  return Array.from(root.querySelectorAll(sel));
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(STORAGE_KEY, theme);

  const btn = $("#themeToggle");
  if (!btn) return;
  const isLight = theme === "light";
  btn.setAttribute("aria-pressed", String(isLight));
  btn.querySelector(".btn__text").textContent = isLight ? "Light" : "Dark";
}

function initTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark") {
    setTheme(saved);
    return;
  }

  const prefersLight = window.matchMedia?.("(prefers-color-scheme: light)")?.matches;
  setTheme(prefersLight ? "light" : "dark");
}

function renderSkills() {
  const root = $("#skillsGrid");
  if (!root) return;

  root.innerHTML = data.skills
    .map(
      (s) => `
      <article class="skill">
        <div class="skill__top">
          <h3 class="skill__name">${escapeHtml(s.name)}</h3>
          <span class="skill__level">${escapeHtml(s.level)}</span>
        </div>
        <p class="skill__desc">${escapeHtml(s.desc)}</p>
      </article>
    `,
    )
    .join("");
}

function projectCard(p) {
  const tags = (p.tags || []).map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("");
  const demo = p.demo && p.demo !== "#" ? `<a class="btn btn--ghost" href="${escapeHtml(p.demo)}" target="_blank" rel="noreferrer">Xem demo</a>` : "";
  const source =
    p.source && p.source !== "#"
      ? `<a class="btn btn--ghost" href="${escapeHtml(p.source)}" target="_blank" rel="noreferrer">Source</a>`
      : "";

  return `
    <article class="project" data-type="${escapeHtml(p.type)}">
      <div class="project__cover" aria-hidden="true"></div>
      <div class="project__body">
        <h3 class="project__title">${escapeHtml(p.title)}</h3>
        <p class="project__desc">${escapeHtml(p.desc)}</p>
        <div class="tags" aria-label="Tech stack">${tags}</div>
        <div class="project__footer" aria-label="Liên kết">
          <span class="tag" title="Vai trò">${escapeHtml(p.role || "Role")}</span>
          ${demo}
          ${source}
        </div>
      </div>
    </article>
  `;
}

function renderProjects(filter = "all") {
  const root = $("#projectsGrid");
  if (!root) return;

  const items = data.projects.filter((p) => (filter === "all" ? true : p.type === filter));
  root.innerHTML = items.map(projectCard).join("");
}

function renderServices() {
  const root = $("#servicesGrid");
  if (!root) return;

  root.innerHTML = data.services
    .map(
      (s) => `
      <article class="service">
        <div class="service__icon" aria-hidden="true">${escapeHtml(s.icon)}</div>
        <h3 class="service__title">${escapeHtml(s.title)}</h3>
        <p class="service__desc">${escapeHtml(s.desc)}</p>
      </article>
    `,
    )
    .join("");
}

function renderContacts() {
  const root = $("#contactList");
  if (!root) return;

  const items = [
    { k: "Email", v: data.person.email, href: `mailto:${data.person.email}` },
    { k: "GitHub", v: data.person.github.replace(/^https?:\/\//, ""), href: data.person.github },
    { k: "LinkedIn", v: data.person.linkedin.replace(/^https?:\/\//, ""), href: data.person.linkedin },
    { k: "Website", v: data.person.website.replace(/^https?:\/\//, ""), href: data.person.website },
  ].filter((x) => x.v && !x.v.includes("yourname") && !x.v.includes("yourdomain") && !x.v.includes("#"));

  if (items.length === 0) {
    root.innerHTML = `<p style="margin:0;color:var(--muted)">Bạn cập nhật link/email trong <code>script.js</code> để hiện ở đây.</p>`;
    return;
  }

  root.innerHTML = items
    .map(
      (x) => `
      <div class="contactItem">
        <span class="contactItem__k">${escapeHtml(x.k)}</span>
        <a class="contactItem__v link" href="${escapeHtml(x.href)}" target="_blank" rel="noreferrer">${escapeHtml(x.v)}</a>
      </div>
    `,
    )
    .join("");
}

function initNav() {
  const btn = $(".nav__toggle");
  const menu = $("#navMenu");
  if (!btn || !menu) return;

  function close() {
    menu.classList.remove("is-open");
    btn.setAttribute("aria-expanded", "false");
  }

  btn.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", String(open));
  });

  $all('a[href^="#"]', menu).forEach((a) => a.addEventListener("click", close));
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
  window.addEventListener("click", (e) => {
    if (!menu.classList.contains("is-open")) return;
    if (menu.contains(e.target) || btn.contains(e.target)) return;
    close();
  });
}

function initFilters() {
  const btns = $all("[data-filter]");
  if (btns.length === 0) return;

  btns.forEach((b) =>
    b.addEventListener("click", () => {
      btns.forEach((x) => x.classList.remove("is-active"));
      b.classList.add("is-active");
      renderProjects(b.dataset.filter || "all");
    }),
  );
}

function initContactForm() {
  const form = $("#contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const message = String(fd.get("message") || "").trim();

    const to = data.person.email || "tiennv1293@gmail.com";
    const subject = encodeURIComponent(`Liên hệ từ ${name || "khách"} (${email || "không có email"})`);
    const body = encodeURIComponent(message);
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  });
}

function initThemeToggle() {
  const btn = $("#themeToggle");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    setTheme(current === "light" ? "dark" : "light");
  });
}

function initYear() {
  const el = $("#year");
  if (el) el.textContent = String(new Date().getFullYear());
}

initTheme();
initYear();
initNav();
initThemeToggle();
renderSkills();
renderProjects("all");
renderServices();
renderContacts();
initFilters();
initContactForm();

