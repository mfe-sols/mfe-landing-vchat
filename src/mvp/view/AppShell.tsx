import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { createModel } from "../model";
import { createPresenter, type LandingViewModel } from "../presenter";
import { HeroCanvas } from "./HeroCanvas";
import { ArchCanvas } from "./ArchCanvas";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* ══════════════════════════════════════════════════════════
   GSAP Motion Orchestrator — Pro Animation System
   ──────────────────────────────────────────────────────────
   Techniques applied from Animation Dictionary:
   • Stagger orchestration — cards, rows, metrics
   • ScrollTrigger reveals — section entrance with clip-path
   • Parallax layers — hero depth illusion
   • Spring physics easing — back.out for organic feel
   • Sequence timeline — hero cascade choreography
   • Scrub-linked progress — connector line draw
   • Attention-seeking — metric scale pulse
   • Shimmer gradient — module card hover
   • Reduced-motion a11y — respects prefers-reduced-motion
   ══════════════════════════════════════════════════════════ */
function useGsapMotion() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cleanups: (() => void)[] = [];
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(root.querySelectorAll(".lv-gsap"), { clearProps: "all" });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* ── Hero sequence timeline ────────────────── */
        const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
        heroTl
          .from(".lv-hero__eyebrow", {
            opacity: 0, y: 24, duration: 0.7,
          })
          .from(".lv-hero__title", {
            opacity: 0, y: 30, duration: 0.85,
            /* clip-path wipe reveal */
            clipPath: "inset(0 0 100% 0)",
            clearProps: "clipPath",
          }, "-=0.45")
          .from(".lv-hero__sub", {
            opacity: 0, y: 20, duration: 0.7,
          }, "-=0.4")
          .from(".lv-hero__ctas", {
            opacity: 0, y: 18, scale: 0.95, duration: 0.6,
          }, "-=0.35")
          .from(".lv-stat", {
            opacity: 0, y: 22, scale: 0.9, duration: 0.5,
            stagger: 0.06, ease: "back.out(1.7)",
          }, "-=0.3")
          .addLabel("statsIn");

        /* ── Stat count-up — numbers climb from zero ── */
        root.querySelectorAll<HTMLElement>(".lv-stat__value").forEach((el) => {
          const raw = (el.textContent || "").replace(/,/g, "");
          const target = parseInt(raw, 10);
          if (isNaN(target)) return;
          el.textContent = "0";
          const obj = { val: 0 };
          heroTl.to(obj, {
            val: target,
            duration: 1.6,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = Math.round(obj.val).toLocaleString();
            },
          }, "statsIn-=0.3");
        });

        /* ── Parallax hero glow layer ──────────────── */
        gsap.to(".lv-hero::before", {
          scrollTrigger: {
            trigger: ".lv-hero",
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
          y: 80,
          scale: 1.15,
          opacity: 0.3,
        });

        /* ── Section reveals — clip-path + translate ── */
        root.querySelectorAll<HTMLElement>(".lv-gsap").forEach((el) => {
          /* Skip sections with batch-animated cards — they handle own reveal */
          if (el.querySelector(".lv-gsap-batch")) return;

          gsap.from(el, {
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              end: "top 55%",
              toggleActions: "play none none none",
            },
            opacity: 0,
            y: 36,
            duration: 0.75,
            ease: "power2.out",
          });
        });

        /* ── Stagger batch: module + arch + security cards ── */
        root.querySelectorAll<HTMLElement>(".lv-gsap-batch").forEach((grid) => {
          const cards = grid.querySelectorAll<HTMLElement>(".lv-gsap-card");
          if (!cards.length) return;

          const section = grid.closest(".lv-section");

          /* Set initial state immediately to prevent flash */
          gsap.set(cards, { opacity: 0, y: 28 });

          /* Reveal header + cards in a single coordinated timeline */
          if (section) {
            const header = section.querySelectorAll<HTMLElement>(
              ".lv-eyebrow, .lv-section-title",
            );
            if (header.length) {
              gsap.set(Array.from(header), { opacity: 0, y: 18 });
            }

            ScrollTrigger.create({
              trigger: section,
              start: "top 82%",
              once: true,
              onEnter: () => {
                const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

                if (header.length) {
                  tl.to(Array.from(header), {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.08,
                  });
                }

                tl.to(cards, {
                  opacity: 1,
                  y: 0,
                  duration: 0.55,
                  stagger: 0.07,
                }, header.length ? "-=0.25" : 0);
              },
            });
          }
        });

        /* ── Metric count-up feel — spring physics ──── */
        root.querySelectorAll<HTMLElement>(".lv-metric").forEach((el) => {
          gsap.from(el, {
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
            opacity: 0,
            scale: 0.8,
            duration: 0.55,
            ease: "back.out(1.5)",
          });
        });

        /* ── Connector line draw — scrub-linked ─────── */
        root.querySelectorAll<HTMLElement>(".lv-connector__line").forEach((line) => {
          gsap.from(line, {
            scrollTrigger: {
              trigger: line,
              start: "top 92%",
              end: "bottom 80%",
              scrub: 0.5,
            },
            scaleY: 0,
            transformOrigin: "top center",
          });
        });

        /* ── Table row reveal — stagger slide ──────── */
        root.querySelectorAll<HTMLElement>(".lv-table tbody").forEach((tbody) => {
          const rows = tbody.querySelectorAll("tr");
          ScrollTrigger.batch(rows, {
            start: "top 92%",
            onEnter: (batch) =>
              gsap.from(batch, {
                opacity: 0,
                x: -20,
                duration: 0.4,
                stagger: 0.04,
                ease: "power2.out",
              }),
            once: true,
          });
        });

        /* ── One-liner slide-in — sequence with delay ── */
        root.querySelectorAll<HTMLElement>(".lv-oneliner").forEach((el, i) => {
          gsap.from(el, {
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
            opacity: 0,
            x: -28,
            duration: 0.55,
            delay: i * 0.08,
            ease: "power2.out",
          });
        });

        /* ── Deploy model rows — alternating stagger ── */
        root.querySelectorAll<HTMLElement>(".lv-deploy-model__row").forEach((row, i) => {
          gsap.from(row, {
            scrollTrigger: {
              trigger: row,
              start: "top 92%",
              toggleActions: "play none none none",
            },
            opacity: 0,
            x: i % 2 === 0 ? -16 : 16,
            duration: 0.45,
            ease: "power2.out",
          });
        });

        /* ── Ideal-for icons — scale bounce ──────────── */
        root.querySelectorAll<HTMLElement>(".lv-ideal-card__icon").forEach((icon) => {
          gsap.from(icon, {
            scrollTrigger: {
              trigger: icon,
              start: "top 92%",
              toggleActions: "play none none none",
            },
            scale: 0,
            rotation: -20,
            duration: 0.5,
            ease: "back.out(2.5)",
          });
        });

        /* ── Section background parallax ────────────── */
        root.querySelectorAll<HTMLElement>("#overview, #security").forEach((sec) => {
          const bg = sec.querySelector<HTMLElement>("::before") ?? sec;
          gsap.to(sec, {
            scrollTrigger: {
              trigger: sec,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
            "--lv-parallax-y": "30px",
          });
        });

        /* ── Deploy model glow entrance ─────────────── */
        const deployCard = root.querySelector<HTMLElement>(".lv-deploy-model");
        if (deployCard) {
          gsap.from(deployCard, {
            scrollTrigger: {
              trigger: deployCard,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            opacity: 0,
            y: 30,
            scale: 0.98,
            duration: 0.7,
            ease: "power2.out",
          });
        }

        /* ── Compliance checkmarks — sequential enter ── */
        ScrollTrigger.batch(
          root.querySelectorAll<HTMLElement>(".lv-compliance-list li"),
          {
            start: "top 92%",
            onEnter: (batch) =>
              gsap.from(batch, {
                opacity: 0,
                x: -14,
                duration: 0.4,
                stagger: 0.06,
                ease: "power2.out",
              }),
            once: true,
          },
        );

        /* ── Card 3D tilt on hover (desktop only) ──── */
        const canHover = window.matchMedia("(hover: hover)").matches;
        if (canHover) {
          root.querySelectorAll<HTMLElement>(".lv-module-card, .lv-arch-card").forEach((card) => {
            const onMove = (e: MouseEvent) => {
              const rect = card.getBoundingClientRect();
              const x = (e.clientX - rect.left) / rect.width - 0.5;
              const y = (e.clientY - rect.top) / rect.height - 0.5;
              gsap.to(card, { rotateY: x * 6, rotateX: -y * 6, duration: 0.4, ease: "power2.out", overwrite: true });
            };
            const onLeave = () => {
              gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "elastic.out(1, 0.5)", overwrite: true });
            };
            card.addEventListener("mousemove", onMove);
            card.addEventListener("mouseleave", onLeave);
            cleanups.push(() => {
              card.removeEventListener("mousemove", onMove);
              card.removeEventListener("mouseleave", onLeave);
            });
          });

          /* ── Cursor spotlight on module grid ───────── */
          const grid = root.querySelector<HTMLElement>(".lv-modules-grid");
          if (grid) {
            const onGridMove = (e: MouseEvent) => {
              const rect = grid.getBoundingClientRect();
              grid.style.setProperty("--lv-spotlight-x", `${e.clientX - rect.left}px`);
              grid.style.setProperty("--lv-spotlight-y", `${e.clientY - rect.top}px`);
            };
            const onGridLeave = () => {
              grid.style.setProperty("--lv-spotlight-x", "-9999px");
              grid.style.setProperty("--lv-spotlight-y", "-9999px");
            };
            grid.addEventListener("mousemove", onGridMove, { passive: true });
            grid.addEventListener("mouseleave", onGridLeave);
            cleanups.push(() => {
              grid.removeEventListener("mousemove", onGridMove);
              grid.removeEventListener("mouseleave", onGridLeave);
            });
          }
        }
      });
    }, root);

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
      mm.revert();
    };
  }, []);

  return rootRef;
}

/* ── Topology connector ───────────────────────────────── */
const Connector = () => (
  <div className="lv-connector" aria-hidden="true">
    <div className="lv-connector__line" />
  </div>
);

/* ── Chapter divider — storytelling section separator ── */
const ChapterDivider = ({
  num,
  eyebrow,
  title,
  sub,
}: {
  num: number;
  eyebrow: string;
  title: string;
  sub: string;
}) => (
  <div className="lv-chapter lv-gsap" aria-hidden="true">
    <span className="lv-chapter__num">{`0${num}`}</span>
    <p className="lv-chapter__eyebrow">{eyebrow}</p>
    <h2 className="lv-chapter__title">{title}</h2>
    <p className="lv-chapter__sub">{sub}</p>
    <div className="lv-chapter__line" />
  </div>
);

const INTRO_VIDEO_SRC = "/intro.mp4";

function VideoModal({
  isOpen,
  onClose,
  title,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen || typeof window === "undefined") return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isOpen) {
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => undefined);
      }
      return;
    }

    video.pause();
    video.currentTime = 0;
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="lv-video-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lv-video-modal-title"
      onClick={onClose}
    >
      <div
        className="lv-video-modal__dialog"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="lv-video-modal__header">
          <div>
            <p className="lv-video-modal__eyebrow">Live product walkthrough</p>
            <h3 id="lv-video-modal-title" className="lv-video-modal__title">
              {title}
            </h3>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="lv-video-modal__close"
            aria-label="Close demo video"
            onClick={onClose}
          >
            <span className="lv-video-modal__close-icon" aria-hidden="true">
              <span className="lv-video-modal__close-line lv-video-modal__close-line--a" />
              <span className="lv-video-modal__close-line lv-video-modal__close-line--b" />
            </span>
          </button>
        </div>

        <div className="lv-video-modal__frame">
          <video
            ref={videoRef}
            className="lv-video-modal__video"
            src={INTRO_VIDEO_SRC}
            controls
            autoPlay
            playsInline
            preload="metadata"
          />
        </div>
      </div>
    </div>
  );
}

/* ── Side navigation items ────────────────────────────── */
const NAV_ITEMS: { id: string; label: string; chapter?: number }[] = [
  { id: "hero", label: "Trang đầu" },
  { id: "overview", label: "Vì sao", chapter: 1 },
  { id: "modules", label: "Tính năng", chapter: 2 },
  { id: "architecture", label: "Kiến trúc", chapter: 3 },
  { id: "security", label: "Bảo mật" },
  { id: "compliance", label: "Tuân thủ" },
  { id: "deployment", label: "Triển khai", chapter: 4 },
  { id: "competitive", label: "So sánh" },
  { id: "platforms", label: "Nền tảng" },
  { id: "ideal", label: "Dành cho", chapter: 5 },
  { id: "cta", label: "Liên hệ" },
];

/* ── Scroll-spy hook — tracks active section via ScrollTrigger ── */
function useScrollSpy() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    NAV_ITEMS.forEach(({ id }) => {
      const el =
        id === "hero"
          ? document.querySelector<HTMLElement>(".lv-hero")
          : id === "cta"
            ? document.querySelector<HTMLElement>(".lv-cta")
            : document.getElementById(id);
      if (!el) return;

      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: "top 50%",
          end: "bottom 50%",
          onToggle: (self) => {
            if (self.isActive) setActive(id);
          },
        }),
      );
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return active;
}

/* ── SideNav — vertical dot navigation ─────────────────── */
function SideNav() {
  const active = useScrollSpy();
  const [visible, setVisible] = useState(false);

  /* Show after scrolling past hero */
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: ".lv-hero",
      start: "bottom 80%",
      onEnterBack: () => setVisible(false),
      onLeave: () => setVisible(true),
    });
    return () => trigger.kill();
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el =
      id === "hero"
        ? document.querySelector<HTMLElement>(".lv-hero")
        : id === "cta"
          ? document.querySelector<HTMLElement>(".lv-cta")
          : document.getElementById(id);
    if (el) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: el, offsetY: 40 },
        ease: "power3.inOut",
      });
    }
  }, []);

  return (
    <nav
      className={`lv-sidenav ${visible ? "lv-sidenav--visible" : ""}`}
      aria-label="Section navigation"
    >
      <div className="lv-sidenav__track" aria-hidden="true" />
      {NAV_ITEMS.map(({ id, label, chapter }) => (
        <button
          key={id}
          className={`lv-sidenav__item ${active === id ? "lv-sidenav__item--active" : ""}`}
          onClick={() => scrollTo(id)}
          aria-label={label}
          aria-current={active === id ? "true" : undefined}
          type="button"
        >
          <span className="lv-sidenav__dot">
            {chapter != null && (
              <span className="lv-sidenav__chapter">{chapter}</span>
            )}
          </span>
          <span className="lv-sidenav__label">{label}</span>
        </button>
      ))}
    </nav>
  );
}

/* ── Section helper ───────────────────────────────────── */
const Section = ({
  id,
  eyebrow,
  title,
  children,
  className = "",
  gsapReveal = true,
  ariaLabel,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
  gsapReveal?: boolean;
  ariaLabel?: string;
}) => (
  <section
    id={id}
    className={`lv-section ${gsapReveal ? "lv-gsap" : ""} ${className}`.trim()}
    aria-label={ariaLabel ?? title}
  >
    {eyebrow && <p className="lv-eyebrow">{eyebrow}</p>}
    {title && <h2 className="lv-section-title">{title}</h2>}
    {children}
  </section>
);

/* ══════════════════════════════════════════════════════════
   AppShell — VChat Landing Page
   Pro animations: parallax, stagger, clip-path, spring,
   scrub-linked connectors, alternating reveals, bounce icons
   ══════════════════════════════════════════════════════════ */
export function AppShell({ locale }: { locale?: string }) {
  const vm: LandingViewModel = useMemo(
    () => createPresenter(createModel()),
    [locale],
  );
  const rootRef = useGsapMotion();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <div className="landing-vchat" ref={rootRef}>
      <SideNav />

      {/* ── HERO ────────────────────────────────────── */}
      <header className="lv-hero">        <HeroCanvas />        <p className="lv-hero__eyebrow">{vm.heroEyebrow}</p>
        <h1 className="lv-hero__title">{vm.heroTitle}</h1>
        <p className="lv-hero__sub">{vm.heroSub}</p>
        <div className="lv-hero__ctas">
          <a
            href="#modules"
            className="lv-btn lv-btn--primary lv-btn--lg"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById("modules");
              if (el) gsap.to(window, { duration: 1, scrollTo: { y: el, offsetY: 40 }, ease: "power3.inOut" });
            }}
          >
            {vm.primaryCta}
          </a>
          <a
            href="#architecture"
            className="lv-btn lv-btn--ghost lv-btn--lg"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById("architecture");
              if (el) gsap.to(window, { duration: 1, scrollTo: { y: el, offsetY: 40 }, ease: "power3.inOut" });
            }}
          >
            {vm.secondaryCta}
          </a>
        </div>
        <div className="lv-hero__stats">
          {vm.heroStats.map((s) => (
            <div key={s.label} className="lv-stat">
              <span className="lv-stat__value">{s.value}</span>
              <span className="lv-stat__label">{s.label}</span>
            </div>
          ))}
        </div>
      </header>

      {/* ═══════════════════════════════════════════════
          CHAPTER 1 — ĐÁNH THỨC NỖI ĐAU
          ═══════════════════════════════════════════════ */}
      <ChapterDivider num={1} eyebrow={vm.ch1Eyebrow} title={vm.ch1Title} sub={vm.ch1Sub} />

      <Section id="overview" title={vm.overviewTitle}>
        <p className="lv-overview__body">{vm.overviewBody}</p>
        <p className="lv-overview__target">{vm.overviewTarget}</p>
      </Section>

      <Connector />

      {/* ═══════════════════════════════════════════════
          CHAPTER 2 — GIẢI PHÁP MỘT CHẠM
          ═══════════════════════════════════════════════ */}
      <ChapterDivider num={2} eyebrow={vm.ch2Eyebrow} title={vm.ch2Title} sub={vm.ch2Sub} />

      <Section
        id="modules"
        eyebrow={vm.modulesEyebrow}
        title={vm.modulesTitle}
      >
        <div className="lv-modules-grid lv-gsap-batch">
          {vm.modules.map((mod) => (
            <article key={mod.title} className="lv-module-card lv-gsap-card">
              <div className="lv-module-card__header">
                <span className="lv-module-card__icon" data-icon={mod.icon} />
                <h3 className="lv-module-card__title">{mod.title}</h3>
              </div>
              <p className="lv-module-card__desc">{mod.desc}</p>
              <ul className="lv-module-card__list">
                {mod.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Connector />

      {/* ═══════════════════════════════════════════════
          CHAPTER 3 — TẠI SAO ĐÁNG TIN
          Architecture + Security + Compliance
          ═══════════════════════════════════════════════ */}
      <ChapterDivider num={3} eyebrow={vm.ch3Eyebrow} title={vm.ch3Title} sub={vm.ch3Sub} />

      <Section
        id="architecture"
        eyebrow={vm.archEyebrow}
        title={vm.archTitle}
      >
        <ArchCanvas />
        <div className="lv-arch-grid lv-gsap-batch">
          {vm.archBlocks.map((b) => (
            <article key={b.title} className="lv-arch-card lv-gsap-card">
              <h3 className="lv-arch-card__title">{b.title}</h3>
              <p className="lv-arch-card__desc">{b.desc}</p>
              <ul className="lv-arch-card__list">
                {b.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Connector />

      <Section id="security" eyebrow={vm.secEyebrow} title={vm.secTitle}>
        <div className="lv-sec-grid lv-gsap-batch">
          {vm.secLayers.map((layer) => (
            <article key={layer.title} className="lv-sec-card lv-gsap-card">
              <h3 className="lv-sec-card__title">{layer.title}</h3>
              <ul className="lv-sec-card__list">
                {layer.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Connector />

      <Section
        id="compliance"
        eyebrow={vm.complianceEyebrow}
        title={vm.complianceTitle}
      >
        <ul className="lv-compliance-list">
          {vm.compliance.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>

      <Connector />

      {/* ═══════════════════════════════════════════════
          CHAPTER 4 — SO SÁNH THUYẾT PHỤC
          Deploy + Competitive + Platforms
          ═══════════════════════════════════════════════ */}
      <ChapterDivider num={4} eyebrow={vm.ch4Eyebrow} title={vm.ch4Title} sub={vm.ch4Sub} />

      <Section
        id="deployment"
        eyebrow={vm.deployEyebrow}
        title={vm.deployTitle}
      >
        <div className="lv-deploy-model">
          <div className="lv-deploy-model__header">
            <span className="lv-deploy-model__col-label">
              {vm.deployColSaas}
            </span>
            <span className="lv-deploy-model__col-label lv-deploy-model__col-label--vchat">
              VChat
            </span>
          </div>
          {vm.deployModel.map((row) => (
            <div key={row.label} className="lv-deploy-model__row">
              <span className="lv-deploy-model__saas">{row.saas}</span>
              <span className="lv-deploy-model__vchat">{row.vchat}</span>
            </div>
          ))}
        </div>
        <p className="lv-deploy-model__tagline">{vm.deployTagline}</p>
      </Section>

      <Connector />

      <Section id="competitive" title={vm.compTitle}>
        <div className="lv-table-wrap">
          <table className="lv-table lv-table--comp">
            <thead>
              <tr>
                <th>{vm.compColFeature}</th>
                <th className="lv-table__highlight">VChat</th>
                <th>{vm.compColCloud}</th>
                <th>{vm.compColErp}</th>
              </tr>
            </thead>
            <tbody>
              {vm.competitive.map((r) => (
                <tr key={r.feature}>
                  <td>{r.feature}</td>
                  <td className="lv-table__highlight">{r.vchat}</td>
                  <td>{r.cloudPos}</td>
                  <td>{r.erp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Connector />

      <Section id="platforms" title={vm.platformTitle}>
        <div className="lv-table-wrap">
          <table className="lv-table">
            <thead>
              <tr>
                <th>{vm.platColPlatform}</th>
                <th>{vm.platColFormat}</th>
                <th>{vm.platColArch}</th>
              </tr>
            </thead>
            <tbody>
              {vm.platforms.map((p) => (
                <tr key={p.platform}>
                  <td>{p.platform}</td>
                  <td>{p.format}</td>
                  <td>{p.arch}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Connector />

      {/* ═══════════════════════════════════════════════
          CHAPTER 5 — HÀNH ĐỘNG
          Ideal For + CTA + Footer
          ═══════════════════════════════════════════════ */}
      <ChapterDivider num={5} eyebrow={vm.ch5Eyebrow} title={vm.ch5Title} sub={vm.ch5Sub} />

      <Section id="ideal" eyebrow={vm.idealEyebrow} title={vm.idealTitle}>
        <div className="lv-ideal-grid lv-gsap-batch">
          {vm.idealSegments.map((seg) => (
            <article key={seg.title} className="lv-ideal-card lv-gsap-card">
              <span className="lv-ideal-card__icon">{seg.icon}</span>
              <div>
                <h3 className="lv-ideal-card__title">{seg.title}</h3>
                <p className="lv-ideal-card__desc">{seg.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ── CTA — Final conversion ──────────────────── */}
      <section className="lv-cta lv-gsap" aria-label={vm.ctaTitle}>
        <div className="lv-cta__glow" aria-hidden="true" />
        <h2 className="lv-cta__title">{vm.ctaTitle}</h2>
        <p className="lv-cta__sub">{vm.ctaSub}</p>
        <div className="lv-cta__actions">
          <a href="#" className="lv-btn lv-btn--primary lv-btn--lg lv-btn--glow">
            {vm.ctaPrimary}
          </a>
          <button
            type="button"
            className="lv-btn lv-btn--ghost lv-btn--lg lv-btn--demo"
            onClick={() => setIsVideoModalOpen(true)}
          >
            {vm.ctaSecondary}
          </button>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────── */}
      <footer className="lv-footer">
        <p className="lv-footer__tagline">{vm.footerTagline}</p>
        <p className="lv-footer__tech">{vm.footerTech}</p>
        {/* Điều hướng site + pháp lý — cần cho khách LẪN reviewer (AdSense/SEO):
            apex phải dẫn được tới nội dung chính và Điều khoản/Chính sách. */}
        <nav className="lv-footer__links" aria-label="Site">
          <a href="https://app.vopenworld.com">VRtourist — Mạng xã hội du lịch 360°</a>
          <a href="https://app.vopenworld.com/auth/terms">Điều khoản dịch vụ</a>
          <a href="https://app.vopenworld.com/auth/privacy">Chính sách bảo mật</a>
        </nav>
      </footer>

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title={vm.ctaSecondary}
      />
    </div>
  );
}

export default AppShell;
