// =====================================================
// CONFIG — edit these to personalize
// =====================================================
const GITHUB_USERNAME = "octocat"; // ← replace with your real GitHub username

// safe storage wrapper (falls back to memory if localStorage is unavailable)
const memoryStore = {};
const storage = {
  get(key){ try{ return localStorage.getItem(key); }catch(e){ return memoryStore[key] ?? null; } },
  set(key,val){ try{ localStorage.setItem(key,val); }catch(e){ memoryStore[key]=val; } }
};

document.addEventListener("DOMContentLoaded", () => {

  // ---------------- PARTICLE BACKGROUND ----------------
  const canvas = document.getElementById("particles");
  if(canvas && !matchMedia("(prefers-reduced-motion: reduce)").matches){
    const ctx = canvas.getContext("2d");
    let particles = [];
    function resize(){
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    function seed(){
      const count = Math.min(90, Math.round(window.innerWidth / 14));
      particles = Array.from({length:count}, () => ({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        size: Math.random()*2 + 0.6,
        dx: (Math.random()-0.5)*0.35,
        dy: (Math.random()-0.5)*0.35
      }));
    }
    resize(); seed();
    window.addEventListener("resize", () => { resize(); seed(); });

    function isDark(){ return document.documentElement.getAttribute("data-theme") === "dark"; }

    function animateParticles(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      const dotColor = "220,38,38";
      particles.forEach(p => {
        p.x += p.dx; p.y += p.dy;
        if(p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if(p.y < 0 || p.y > canvas.height) p.dy *= -1;
        ctx.fillStyle = `rgba(${dotColor},${isDark() ? 0.7 : 0.55})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
        ctx.fill();
      });
      // connecting lines between nearby particles
      for(let i=0;i<particles.length;i++){
        for(let j=i+1;j<particles.length;j++){
          const a = particles[i], b = particles[j];
          const dist = Math.hypot(a.x-b.x, a.y-b.y);
          if(dist < 110){
            ctx.strokeStyle = `rgba(${dotColor},${(1-dist/110)*0.18})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // ---------------- BACKGROUND MUSIC ----------------
  const music = document.getElementById("bg-music");
  const musicToggle = document.getElementById("music-toggle");
  if(music && musicToggle){
    musicToggle.addEventListener("click", () => {
      if(music.paused){
        music.volume = 0.5;
        music.play().catch(() => {});
        musicToggle.classList.add("playing");
        musicToggle.setAttribute("aria-pressed","true");
        musicToggle.setAttribute("aria-label","Pause background music");
      } else {
        music.pause();
        musicToggle.classList.remove("playing");
        musicToggle.setAttribute("aria-pressed","false");
        musicToggle.setAttribute("aria-label","Play background music");
      }
    });
  }

  // ---------------- YEAR ----------------
  const yearEl = document.getElementById("year");
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------------- LOADER ----------------
  window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    setTimeout(() => loader && loader.classList.add("done"), 400);
  });

  // ---------------- SCROLL PROGRESS + HEADER STATE ----------------
  const progress = document.getElementById("scroll-progress");
  const header = document.getElementById("site-header");
  const backToTop = document.getElementById("back-to-top");

  function onScroll(){
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    if(progress) progress.style.width = scrolled + "%";
    if(header) header.classList.toggle("scrolled", h.scrollTop > 10);
    if(backToTop) backToTop.classList.toggle("show", h.scrollTop > 600);
  }
  document.addEventListener("scroll", onScroll, { passive:true });
  onScroll();

  backToTop && backToTop.addEventListener("click", () => window.scrollTo({top:0,behavior:"smooth"}));

  // ---------------- CUSTOM CURSOR ----------------
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  if(dot && ring && matchMedia("(hover:hover)").matches){
    let rx=0, ry=0, mx=0, my=0;
    window.addEventListener("mousemove", e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx+"px"; dot.style.top = my+"px";
    });
    (function loop(){
      rx += (mx-rx)*0.18; ry += (my-ry)*0.18;
      ring.style.left = rx+"px"; ring.style.top = ry+"px";
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll("a,button,.project-card,.cert-card,input,textarea").forEach(el => {
      el.addEventListener("mouseenter", () => ring.classList.add("active"));
      el.addEventListener("mouseleave", () => ring.classList.remove("active"));
    });
  }

  // ---------------- MOBILE NAV ----------------
  const navToggle = document.getElementById("nav-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  navToggle && navToggle.addEventListener("click", () => mobileNav.classList.toggle("open"));
  mobileNav && mobileNav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => mobileNav.classList.remove("open")));

  // ---------------- THEME TOGGLE ----------------
  const themeToggle = document.getElementById("theme-toggle");
  const root = document.documentElement;
  const savedTheme = storage.get("theme");
  if(savedTheme) root.setAttribute("data-theme", savedTheme);
  themeToggle && themeToggle.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    storage.set("theme", next);
  });

  // ---------------- TERMINAL TYPING ----------------
  const codeLines = [
    { t: "kw", text: ">>> " },
    { t: "", text: "developer = Developer(\n" },
    { t: "", text: "    " },{ t:"", text:"name" },{ t:"", text:"=" },{ t:"str", text:'"Bhuvanagiri D"' },{ t:"", text:",\n" },
    { t: "", text: "    " },{ t:"", text:"role" },{ t:"", text:"=" },{ t:"str", text:'"Full Stack Python Developer"' },{ t:"", text:",\n" },
    { t: "", text: "    " },{ t:"", text:"stack" },{ t:"", text:"=" },{ t:"str", text:'["Python","React","Django","AI/ML"]' },{ t:"", text:",\n" },
    { t: "", text: "    " },{ t:"", text:"status" },{ t:"", text:"=" },{ t:"str", text:'"Available for opportunities"' },{ t:"", text:"\n" },
    { t: "", text: ")" },
    { t: "cm", text: "\n\n# building intelligent software," },
    { t: "cm", text: "\n# one commit at a time." }
  ];
  const fullText = codeLines.map(l => l.text).join("");
  const termEl = document.getElementById("terminal-code");
  if(termEl){
    let i = 0;
    function typeNext(){
      if(i <= fullText.length){
        termEl.textContent = fullText.slice(0,i);
        i += 2;
        setTimeout(typeNext, 12);
      }
    }
    setTimeout(typeNext, 900);
  }

  // ---------------- REVEAL ON SCROLL ----------------
  const revealEls = document.querySelectorAll("[data-reveal]");
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("in");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  // ---------------- ANIMATED COUNTERS ----------------
  const counters = document.querySelectorAll(".stat-num");
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        let cur = 0;
        const step = Math.max(1, Math.round(target/40));
        const tick = () => {
          cur += step;
          if(cur >= target){ el.textContent = target; return; }
          el.textContent = cur;
          requestAnimationFrame(tick);
        };
        tick();
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach(el => counterObserver.observe(el));

  // ---------------- SKILL TABS + BARS ----------------
  const tabs = document.querySelectorAll(".skill-tab");
  const panels = document.querySelectorAll(".skill-panel");
  function animateBars(panel){
    panel.querySelectorAll(".skill-bar").forEach(bar => {
      const level = bar.dataset.level;
      const i = bar.querySelector(".bar i");
      requestAnimationFrame(() => { i.style.width = level + "%"; });
    });
  }
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      panels.forEach(p => p.classList.remove("active"));
      tab.classList.add("active");
      const panel = document.querySelector(`.skill-panel[data-panel="${tab.dataset.tab}"]`);
      panel.classList.add("active");
      animateBars(panel);
    });
  });
  const skillsSection = document.getElementById("skills");
  if(skillsSection){
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          animateBars(document.querySelector(".skill-panel.active"));
          skillsObserver.disconnect();
        }
      });
    }, { threshold: 0.3 });
    skillsObserver.observe(skillsSection);
  }

  // ---------------- PROJECT FILTERS ----------------
  const chips = document.querySelectorAll(".filter-chip");
  const cards = document.querySelectorAll(".project-card");
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      const f = chip.dataset.filter;
      cards.forEach(card => {
        card.classList.toggle("hide", f !== "all" && card.dataset.cat !== f);
      });
    });
  });

  // ---------------- MAGNETIC / RIPPLE BUTTONS ----------------
  document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", function(e){
      const rect = this.getBoundingClientRect();
      const span = document.createElement("span");
      span.className = "ripple-fx";
      const size = Math.max(rect.width, rect.height);
      span.style.cssText = `position:absolute;width:${size}px;height:${size}px;left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px;border-radius:50%;background:rgba(255,255,255,.5);transform:scale(0);animation:ripple .6s linear;pointer-events:none;`;
      this.style.position = "relative";
      this.style.overflow = "hidden";
      this.appendChild(span);
      setTimeout(() => span.remove(), 600);
    });
  });

  // ---------------- COMMAND PALETTE ----------------
  const cmdkOverlay = document.getElementById("cmdk-overlay");
  const cmdkTrigger = document.getElementById("cmdk-trigger");
  const cmdkInput = document.getElementById("cmdk-input");
  const cmdkResults = document.getElementById("cmdk-results");

  const commands = [
    { label: "About", hint: "#about", href: "#about" },
    { label: "Skills", hint: "#skills", href: "#skills" },
    { label: "Experience & Education", hint: "#work", href: "#work" },
    { label: "Certifications", hint: "#certifications", href: "#certifications" },
    { label: "Projects", hint: "#projects", href: "#projects" },
    { label: "Services", hint: "#services", href: "#services" },
    { label: "Achievements", hint: "#achievements", href: "#achievements" },
    { label: "Blog", hint: "#blog", href: "#blog" },
    { label: "Contact", hint: "#contact", href: "#contact" },
    { label: "Toggle theme", hint: "action", href: null, action: () => themeToggle.click() },
    { label: "Play/pause music", hint: "action", href: null, action: () => musicToggle && musicToggle.click() },
    { label: "Download resume", hint: "resume.pdf", href: "resume.pdf" },
    { label: "Open GitHub", hint: "external", href: `https://github.com/${GITHUB_USERNAME}` },
  ];

  function renderResults(query=""){
    const q = query.toLowerCase();
    const filtered = commands.filter(c => c.label.toLowerCase().includes(q));
    cmdkResults.innerHTML = filtered.map((c,i) =>
      `<li data-idx="${i}" class="${i===0?'active':''}"><span>${c.label}</span><span>${c.hint}</span></li>`
    ).join("") || `<li><span>No results</span></li>`;
    cmdkResults._filtered = filtered;
  }

  function openCmdk(){
    cmdkOverlay.classList.add("open");
    cmdkInput.value = "";
    renderResults();
    setTimeout(() => cmdkInput.focus(), 50);
  }
  function closeCmdk(){ cmdkOverlay.classList.remove("open"); }

  cmdkTrigger && cmdkTrigger.addEventListener("click", openCmdk);
  cmdkOverlay && cmdkOverlay.addEventListener("click", e => { if(e.target === cmdkOverlay) closeCmdk(); });
  cmdkInput && cmdkInput.addEventListener("input", e => renderResults(e.target.value));

  cmdkResults && cmdkResults.addEventListener("click", e => {
    const li = e.target.closest("li");
    if(!li || li.dataset.idx === undefined) return;
    const cmd = cmdkResults._filtered[+li.dataset.idx];
    runCommand(cmd);
  });

  function runCommand(cmd){
    if(!cmd) return;
    if(cmd.action){ cmd.action(); }
    else if(cmd.href){
      if(cmd.href.startsWith("http")) window.open(cmd.href, "_blank");
      else document.querySelector(cmd.href)?.scrollIntoView({ behavior:"smooth" });
    }
    closeCmdk();
  }

  document.addEventListener("keydown", e => {
    if((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k"){
      e.preventDefault();
      cmdkOverlay.classList.contains("open") ? closeCmdk() : openCmdk();
    }
    if(e.key === "Escape") closeCmdk();
    if(cmdkOverlay.classList.contains("open")){
      const items = [...cmdkResults.querySelectorAll("li")];
      const activeIdx = items.findIndex(li => li.classList.contains("active"));
      if(e.key === "ArrowDown" || e.key === "ArrowUp"){
        e.preventDefault();
        if(!items.length) return;
        items[activeIdx]?.classList.remove("active");
        let next = e.key === "ArrowDown" ? activeIdx+1 : activeIdx-1;
        next = (next + items.length) % items.length;
        items[next].classList.add("active");
      }
      if(e.key === "Enter"){
        const active = items.find(li => li.classList.contains("active"));
        if(active) runCommand(cmdkResults._filtered[+active.dataset.idx]);
      }
    }
  });

  // ---------------- CONTACT FORM ----------------
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  form && form.addEventListener("submit", e => {
    e.preventDefault();
    status.textContent = "Sending…";
    setTimeout(() => {
      status.textContent = "Thanks — your message has been noted. I'll reply by email shortly. (Connect EmailJS or a backend to send this for real.)";
      form.reset();
    }, 700);
  });

  // ---------------- GITHUB STATS ----------------
  const ghStats = document.getElementById("gh-stats");
  if(ghStats && GITHUB_USERNAME){
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => {
        const nums = ghStats.querySelectorAll(".gh-num");
        if(nums[0]) nums[0].textContent = data.public_repos ?? "—";
        if(nums[1]) nums[1].textContent = data.followers ?? "—";
        if(nums[2]) nums[2].textContent = data.following ?? "—";
      })
      .catch(() => { /* silently keep placeholders if offline or rate-limited */ });
  }

});
