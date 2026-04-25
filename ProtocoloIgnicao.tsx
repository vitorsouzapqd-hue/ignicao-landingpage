import { useEffect, useRef, useState } from "react";
import {
  Flame,
  Check,
  X,
  ShieldCheck,
  ChevronDown,
  Target,
  Map as MapIcon,
  FlaskConical,
  Lock,
  Clock,
  Gauge,
  Zap,
  PackageOpen,
  Sun,
  Moon,
} from "lucide-react";
import painelProvaVideo from "@/assets/painel-prova.mp4";
import { useTheme } from "@/contexts/ThemeContext";

/* ============================================================
 * PROTOCOLO IGNIÇÃO — LANDING /protocolo-ignicao
 * Estética: High-Performance Athletic + Precision Clinical
 * Tokens: usa exclusivamente var(--color-*), var(--font-display),
 *         var(--radius-*) e gradientes do ignicao-tokens.css.
 * ============================================================ */

const HERO_GRADIENT = "linear-gradient(to right, #D43B27 0%, #C01A1A 100%)";
const BRAND_GRADIENT = "linear-gradient(90deg, #C01A1A 0%, #E8442A 30%, #FF734A 50%, #D88CEE 100%)";

const CTA_LABEL = "QUERO PARAR DE IMPROVISAR";
const CHECKOUT_URL =
  "https://api.whatsapp.com/send/?phone=5592991118886&text=Quero+montar+a+minha+estrat%C3%A9gia+de+prova+com+voc%C3%AA&type=phone_number&app_absent=0";

/* ===================== Floating Card (inline styles) ===================== */
function FloatingCard({
  label,
  value,
  className,
  style,
}: {
  label: string;
  value: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={className}
      style={{
        background: "rgba(15, 15, 15, 0.4)",
        backgroundColor: "rgba(15, 15, 15, 0.4)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        borderRadius: "12px",
        padding: "10px 14px",
        width: 118,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 4,
        boxShadow: "none",
        ...style,
      }}
    >
      <span
        style={{
          color: "#FFFFFF",
          fontSize: "0.6rem",
          letterSpacing: "1px",
          textTransform: "uppercase",
          fontWeight: 700,
          opacity: 0.8,
          fontFamily: "var(--font-display)",
          lineHeight: 1.1,
        }}
      >
        {label}
      </span>
      <strong
        style={{
          color: "#FFFFFF",
          fontSize: "1.5rem",
          fontWeight: 800,
          fontFamily: "var(--font-display)",
          lineHeight: 1,
        }}
      >
        {value}
      </strong>
    </div>
  );
}

/* ===================== Hooks ===================== */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.opacity = "1";
            (e.target as HTMLElement).style.transform = "translateY(0)";
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function Reveal({
  children,
  as: As = "div" as any,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  as?: any;
  className?: string;
  delay?: number;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <As
      ref={ref as any}
      className={className}
      style={{
        opacity: 0,
        transform: "translateY(18px)",
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      }}
    >
      {children}
    </As>
  );
}

/* ===================== Atoms ===================== */
function Eyebrow({ children, icon: Icon }: { children: React.ReactNode; icon?: any }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 14px",
        border: "1px solid rgba(192,26,26,0.32)",
        background: "rgba(192,26,26,0.06)",
        borderRadius: "var(--radius-pill)",
        fontFamily: "var(--font-display)",
        fontSize: "0.72rem",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "var(--color-text-primary)",
        fontWeight: 700,
      }}
    >
      {Icon ? <Icon size={14} color="var(--color-action-primary)" aria-hidden /> : null}
      {children}
    </span>
  );
}

function SecLabel({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "0.7rem",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: color ?? "var(--color-action-primary)",
        marginBottom: 14,
        fontWeight: 700,
      }}
    >
      {children}
    </div>
  );
}

function H2({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <h2
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: "clamp(1.75rem, 4.4vw, 2.6rem)",
        letterSpacing: "-0.02em",
        lineHeight: 1.1,
        color: "var(--color-text-primary)",
        margin: 0,
        textWrap: "balance" as any,
        ...style,
      }}
    >
      {children}
    </h2>
  );
}

function CTA({ fullWidth, small, style }: { fullWidth?: boolean; small?: boolean; style?: React.CSSProperties }) {
  return (
    <a
      href={CHECKOUT_URL}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        backgroundImage: HERO_GRADIENT,
        color: "#FFFFFF",
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: small ? "0.9rem" : "1rem",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        textAlign: "center",
        lineHeight: 1.2,
        padding: small ? "14px 28px" : "18px 28px",
        borderRadius: "var(--radius-element)",
        border: "none",
        textDecoration: "none",
        cursor: "pointer",
        width: "100%",
        maxWidth: fullWidth ? undefined : 360,
        boxShadow: "0 2px 12px rgba(192,26,26,0.22), 0 0 0 1px rgba(255,115,74,0.25), 0 0 32px rgba(255,115,74,0.18)",
        transition: "transform 0.2s ease, filter 0.2s ease, box-shadow 0.2s ease",
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.filter = "brightness(1.08)";
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow =
          "0 10px 28px rgba(255,120,81,0.32), 0 0 0 1px rgba(255,115,74,0.4), 0 0 48px rgba(255,115,74,0.28)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.filter = "brightness(1)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 2px 12px rgba(192,26,26,0.22), 0 0 0 1px rgba(255,115,74,0.25), 0 0 32px rgba(255,115,74,0.18)";
      }}
    >
      {CTA_LABEL}
    </a>
  );
}

function GlassCard({
  children,
  style,
  accent,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  accent?: "warm" | "cold";
}) {
  const borderColor =
    accent === "cold"
      ? "rgba(216,140,238,0.22)"
      : accent === "warm"
        ? "rgba(255,115,74,0.22)"
        : "var(--color-border-subtle)";
  return (
    <div
      style={{
        background: "color-mix(in srgb, var(--color-surface-mid) 60%, transparent)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: `1px solid ${borderColor}`,
        borderRadius: "var(--radius-container)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ===================== HERO ===================== */
function Hero() {
  return (
    <section
      style={{
        position: "relative",
        padding: "clamp(80px, 11vw, 132px) 24px clamp(64px, 8vw, 96px)",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      <div
        aria-hidden
        className="ig-hero-glow ig-hero-glow-a"
        style={{
          position: "absolute",
          top: -180,
          right: "-12%",
          width: 560,
          height: 560,
          background: "radial-gradient(circle, rgba(216,140,238,0.16) 0%, rgba(216,140,238,0) 65%)",
          pointerEvents: "none",
          filter: "blur(8px)",
        }}
      />
      <div
        aria-hidden
        className="ig-hero-glow ig-hero-glow-b"
        style={{
          position: "absolute",
          bottom: -180,
          left: "-12%",
          width: 520,
          height: 520,
          background: "radial-gradient(circle, rgba(192,26,26,0.18) 0%, rgba(192,26,26,0) 65%)",
          pointerEvents: "none",
          filter: "blur(8px)",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: BRAND_GRADIENT,
          opacity: 0.7,
        }}
      />

      <div style={{ maxWidth: 820, margin: "0 auto", position: "relative" }}>
        <Reveal>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 14px",
              border: "1px solid rgba(192,26,26,0.32)",
              background: "rgba(192,26,26,0.06)",
              borderRadius: "var(--radius-pill)",
              fontFamily: "var(--font-display)",
              fontSize: "0.72rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--color-text-primary)",
              fontWeight: 700,
            }}
          >
            <span
              aria-hidden
              className="ig-hero-flame"
              style={{
                display: "inline-flex",
                color: "var(--color-action-primary)",
                transformOrigin: "center bottom",
              }}
            >
              <Flame size={14} fill="currentColor" strokeWidth={1.6} />
            </span>
            Protocolo Ignição — Nutrição de Prova
          </span>
        </Reveal>

        <Reveal delay={60}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(2.1rem, 6vw, 3.6rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "var(--color-text-primary)",
              margin: "28px 0 0",
              textWrap: "balance" as any,
            }}
          >
            Não jogue meses de treino fora por{" "}
            <span
              style={{
                backgroundImage: BRAND_GRADIENT,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              um erro bobo de nutrição
            </span>{" "}
            na prova
          </h1>
        </Reveal>

        <Reveal delay={120}>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(1rem, 2.4vw, 1.18rem)",
              color: "var(--ig-text-readable, #C9C5BD)",
              maxWidth: 600,
              margin: "22px auto 0",
              lineHeight: 1.55,
            }}
          >
            Tenha um protocolo de prova personalizado para eliminar o improviso e saber exatamente o que comer antes e
            durante a prova.
          </p>
        </Reveal>

        <Reveal delay={180}>
          <div style={{ marginTop: 40, display: "flex", justifyContent: "center" }}>
            <CTA />
          </div>
        </Reveal>

        <Reveal delay={220}>
          <p
            style={{
              marginTop: 18,
              color: "var(--ig-text-readable, #C9C5BD)",
              fontSize: "0.82rem",
            }}
          >
            Não vou mexer na sua dieta. Não vou te dar um protocolo pronto. Apenas estratégia de prova validada no seu
            corpo.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ===================== SISTEMA / MOCKUP ===================== */
function SystemSection() {
  return (
    <section
      style={{
        position: "relative",
        background: "var(--color-surface-low)",
        borderTop: "1px solid var(--color-border-subtle)",
        borderBottom: "1px solid var(--color-border-subtle)",
        padding: "clamp(72px, 9vw, 108px) 24px",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -120,
          right: -80,
          width: 380,
          height: 380,
          background: "radial-gradient(circle, rgba(255,115,74,0.10), transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          position: "relative",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr)",
          gap: 56,
          alignItems: "center",
        }}
        className="ig-mockup-grid"
      >
        <Reveal>
          <div>
            <SecLabel>Painel de Prova</SecLabel>
            <H2>
              Sua estratégia nutricional definida{" "}
              <span
                style={{
                  backgroundImage: BRAND_GRADIENT,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                do início ao fim
              </span>
              .
            </H2>
            <p
              style={{
                marginTop: 18,
                fontSize: "0.95rem",
                color: "var(--ig-text-readable, #C9C5BD)",
                lineHeight: 1.65,
                maxWidth: 480,
              }}
            >
              O Painel de Prova organiza tudo o que você precisa fazer do dia anterior até a chegada. Nada de PDF
              perdido, print no WhatsApp ou tentativa de lembrar o que foi combinado.
            </p>

            <div
              style={{
                marginTop: 28,
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: 12,
              }}
              className="ig-system-cards"
            >
              {[
                { icon: PackageOpen, t: "O QUE", d: "consumir" },
                { icon: Clock, t: "EM QUE MOMENTO", d: "da prova" },
                { icon: Gauge, t: "EM QUAL", d: "quantidade" },
              ].map(({ icon: Icon, t, d }) => (
                <GlassCard key={t} style={{ padding: "16px 18px", display: "flex", gap: 14, alignItems: "center" }}>
                  <span
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: "var(--radius-element)",
                      background: "rgba(192,26,26,0.10)",
                      border: "1px solid rgba(192,26,26,0.25)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={18} color="var(--color-action-primary)" aria-hidden />
                  </span>
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: "0.78rem",
                        letterSpacing: "0.1em",
                        color: "var(--color-text-primary)",
                      }}
                    >
                      {t}
                    </div>
                    <div
                      style={{
                        fontSize: "0.85rem",
                        color: "var(--ig-text-readable, #C9C5BD)",
                      }}
                    >
                      {d}
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>

            <div
              style={{
                marginTop: 28,
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              {["Zero Improviso", "Foco no Pace", "O RP Vem!"].map((p) => (
                <span
                  key={p}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "var(--radius-pill)",
                    border: "1px solid var(--color-border-subtle)",
                    background: "var(--color-surface-mid)",
                    fontFamily: "var(--font-display)",
                    fontSize: "0.72rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--color-text-primary)",
                    fontWeight: 600,
                  }}
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Mockup */}
        <Reveal delay={120}>
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 480,
            }}
          >
            {/* Floating Card A — Kcal totais */}
            <FloatingCard
              label="kcal totais do protocolo"
              value="560 kcal"
              className="ig-float-card ig-float-card-a"
              style={{
                position: "absolute",
                top: "4%",
                left: "-6%",
                transform: "rotate(-5deg)",
                zIndex: 4,
              }}
            />

            {/* Floating Card B — Carbo / hora */}
            <FloatingCard
              label="Carbo / hora"
              value="72g"
              className="ig-float-card ig-float-card-b"
              style={{
                position: "absolute",
                top: "12%",
                right: "-8%",
                transform: "rotate(6deg)",
                zIndex: 4,
              }}
            />

            {/* Floating Card C — Pace alvo */}
            <FloatingCard
              label="Pace alvo"
              value="5'12&quot;"
              className="ig-float-card ig-float-card-c"
              style={{
                position: "absolute",
                bottom: "10%",
                left: "-8%",
                transform: "rotate(4deg)",
                zIndex: 4,
              }}
            />

            {/* Floating Card D — Próximo gel */}
            <FloatingCard
              label="Próximo gel"
              value="km 18"
              className="ig-float-card ig-float-card-d"
              style={{
                position: "absolute",
                bottom: "4%",
                right: "-6%",
                transform: "rotate(-4deg)",
                zIndex: 4,
              }}
            />

            {/* Screen container — sem mockup externo */}
            <div
              className="ig-screen-frame"
              style={{
                position: "relative",
                width: "100%",
                maxWidth: 260,
                aspectRatio: "9 / 16",
                background: "#000",
                borderRadius: 32,
                border: "1px solid rgba(255,255,255,0.1)",
                overflow: "hidden",
                zIndex: 2,
                boxShadow: "0 30px 60px -20px rgba(0,0,0,0.55), 0 0 60px rgba(255,115,74,0.08)",
              }}
            >
              <video
                src={painelProvaVideo}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  background: "#000",
                  display: "block",
                }}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ===================== PROBLEMA ===================== */
function ProblemSection() {
  const quotes = [
    {
      text: "Ganhei um gel novo no kit da prova e acabei passando super mal nos km.",
      who: "Corredor amador, 10k",
    },
    {
      text: "No km 15 eu comecei a sentir as pernas muito pesadas, um cansaço absurdo. Tive que andar um bocado.",
      who: "corredora amadora, meia-maratona",
    },
    {
      text: "Quebrei no km 30 mesmo tendo treinado pra essa maratona com bastante antecedência. A meta era Sub4, mas acabei fazendo em 4h22min.",
      who: "corredor amador, maratona",
    },
  ];
  return (
    <section
      style={{
        position: "relative",
        padding: "clamp(72px, 9vw, 108px) 24px",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "30%",
          left: "-10%",
          width: 380,
          height: 380,
          background: "radial-gradient(circle, rgba(192,26,26,0.10), transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative" }}>
        <Reveal>
          <SecLabel>O que acontece sem estratégia</SecLabel>
          <H2>
            Você treina por meses.{" "}
            <span
              style={{
                backgroundImage: BRAND_GRADIENT,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Mas na prova, improvisa?
            </span>
          </H2>
        </Reveal>

        <div
          className="ig-bento"
          style={{
            marginTop: 36,
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 16,
          }}
        >
          {quotes.map((q, i) => (
            <Reveal key={q.text} delay={i * 60}>
              <figure
                style={{
                  margin: 0,
                  height: "100%",
                  background: "var(--color-surface-mid)",
                  border: "1px solid var(--color-border-subtle)",
                  borderRadius: "var(--radius-container)",
                  padding: "32px 28px 24px",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: 20,
                  overflow: "hidden",
                }}
              >
                <span
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: 8,
                    left: 18,
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontSize: "5.5rem",
                    lineHeight: 1,
                    color: "var(--color-action-primary)",
                    opacity: 0.32,
                    pointerEvents: "none",
                    userSelect: "none",
                  }}
                >
                  “
                </span>
                <blockquote
                  style={{
                    margin: 0,
                    paddingTop: 20,
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontSize: "1.15rem",
                    fontWeight: 400,
                    color: "var(--color-text-primary)",
                    lineHeight: 1.5,
                    fontStyle: "italic",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {q.text}
                </blockquote>
                <figcaption
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontFamily: "var(--font-display)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--ig-text-readable, #C9C5BD)",
                    fontWeight: 600,
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      width: 24,
                      height: 1,
                      background: "var(--color-action-primary)",
                      display: "inline-block",
                    }}
                  />
                  {q.who}
                </figcaption>
              </figure>
            </Reveal>
          ))}

          <Reveal delay={180} className="ig-bento-conclusion-wrap">
            <style>{`.ig-bento-conclusion-wrap { grid-column: 1 / -1; }`}</style>
            <figure
              className="ig-bento-conclusion"
              style={{
                gridColumn: "1 / -1",
                margin: 0,
                position: "relative",
                background: "var(--color-surface-mid)",
                border: "1px solid var(--color-border-subtle)",
                borderRadius: "var(--radius-container)",
                padding: "clamp(28px, 5vw, 44px) clamp(24px, 4vw, 56px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: 18,
                overflow: "hidden",
              }}
            >
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  padding: 1,
                  borderRadius: "var(--radius-container)",
                  background: BRAND_GRADIENT,
                  WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  pointerEvents: "none",
                  opacity: 0.7,
                }}
              />
              <span
                aria-hidden
                style={{
                  width: 48,
                  height: 1,
                  background: BRAND_GRADIENT,
                  borderRadius: 2,
                  opacity: 0.85,
                }}
              />
              <p
                style={{
                  margin: 0,
                  fontSize: "0.95rem",
                  color: "var(--ig-text-readable, #C9C5BD)",
                  lineHeight: 1.65,
                  maxWidth: 560,
                  fontStyle: "italic",
                  position: "relative",
                }}
              >
                Isso não é falta de dedicação, nem de esforço. É falta de um protocolo testado no seu corpo, no seu
                ritmo e na sua prova.
              </p>
              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                  backgroundImage: BRAND_GRADIENT,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  lineHeight: 1.25,
                  maxWidth: 620,
                  position: "relative",
                }}
              >
                Enquanto sua estratégia nutricional for improvisada, seu resultado também será.
              </p>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ===================== METODOLOGIA (timeline) ===================== */
function MethodologySection() {
  const phases = [
    {
      n: "01",
      title: "Scanner de Prova",
      headline: "Você descobre exatamente onde está errando.",
      body: "Antes de ajustar qualquer coisa, a gente desmonta seu cenário atual: o que você já fez, onde falhou e quais decisões te colocam em risco na prova.",
      icon: Target,
    },
    {
      n: "02",
      title: "Plano de Ignição",
      headline: "Você para de chutar e passa a ter um plano claro.",
      body: "Com base no diagnóstico, você recebe a primeira versão da sua estratégia de prova: quanto consumir, quando consumir e como executar.",
      icon: MapIcon,
    },
    {
      n: "03",
      title: "Teste de Estresse",
      headline: "A estratégia sai do papel e é validada no treino.",
      body: "Aqui é onde a maioria erra e onde você começa a acertar. Você aplica o protocolo nos treinos longos e vê como seu corpo responde.",
      icon: FlaskConical,
    },
    {
      n: "04",
      title: "Estratégia Blindada",
      headline: "Você chega na largada sabendo exatamente o que fazer.",
      body: "Depois dos testes, a estratégia é refinada e consolidada. Você não chega na prova ‘achando’, você chega sabendo.",
      icon: Lock,
    },
  ];

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setProgress(100);
      return;
    }
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh * 0.4;
      const passed = Math.min(Math.max(vh * 0.7 - rect.top, 0), total);
      setProgress(Math.min(100, (passed / total) * 100));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section style={{ padding: "clamp(72px, 9vw, 108px) 24px" }}>
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <Reveal>
          <SecLabel>Metodologia</SecLabel>
          <H2>O caminho das 4 fases.</H2>
          <p
            style={{
              marginTop: 16,
              color: "var(--ig-text-readable, #C9C5BD)",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              maxWidth: 600,
            }}
          >
            Cada fase tem um objetivo claro. Você não sai com "dicas" ou "conselhos". Sai com um plano testado e
            validado.
          </p>
        </Reveal>

        <div
          ref={containerRef}
          style={{
            position: "relative",
            marginTop: 48,
            paddingLeft: 56,
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              left: 19,
              top: 8,
              bottom: 8,
              width: 2,
              background: "var(--color-border-subtle)",
              borderRadius: 2,
            }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute",
              left: 19,
              top: 8,
              width: 2,
              height: `calc(${progress}% - 16px)`,
              background: BRAND_GRADIENT,
              borderRadius: 2,
              transition: "height 0.2s linear",
              boxShadow: "0 0 12px rgba(255,115,74,0.5)",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {phases.map((p, i) => {
              const Icon = p.icon;
              const reached = progress >= ((i + 0.5) / phases.length) * 100;
              return (
                <Reveal key={p.n} delay={i * 80}>
                  <article style={{ position: "relative" }}>
                    <div
                      aria-hidden
                      style={{
                        position: "absolute",
                        left: -56,
                        top: 0,
                        width: 40,
                        height: 40,
                        borderRadius: "var(--radius-pill)",
                        background: reached ? BRAND_GRADIENT : "var(--color-surface-mid)",
                        border: reached ? "2px solid transparent" : "2px solid var(--color-border)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: reached ? "0 0 24px rgba(255,115,74,0.45)" : "none",
                        transition: "all 0.4s ease",
                        zIndex: 1,
                      }}
                    >
                      <Icon size={18} color={reached ? "#fff" : "var(--ig-text-readable, #C9C5BD)"} />
                    </div>

                    <GlassCard style={{ padding: "22px 24px 24px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          gap: 10,
                          marginBottom: 8,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 700,
                            fontSize: "0.78rem",
                            letterSpacing: "0.18em",
                            color: "var(--color-action-primary)",
                          }}
                        >
                          FASE {p.n}
                        </span>
                        <span
                          style={{
                            height: 1,
                            flex: 1,
                            background: "var(--color-border-subtle)",
                          }}
                        />
                      </div>
                      <h3
                        style={{
                          margin: 0,
                          fontFamily: "var(--font-display)",
                          fontWeight: 700,
                          fontSize: "1.4rem",
                          letterSpacing: "-0.01em",
                          color: "var(--color-text-primary)",
                          textTransform: "uppercase",
                        }}
                      >
                        {p.title}
                      </h3>
                      <p
                        style={{
                          margin: "10px 0 0",
                          fontFamily: "var(--font-display)",
                          fontSize: "1.02rem",
                          fontWeight: 600,
                          color: "var(--color-text-primary)",
                          lineHeight: 1.4,
                        }}
                      >
                        {p.headline}
                      </p>
                      <p
                        style={{
                          margin: "10px 0 0",
                          fontSize: "0.9rem",
                          color: "var(--ig-text-readable, #C9C5BD)",
                          lineHeight: 1.6,
                        }}
                      >
                        {p.body}
                      </p>
                    </GlassCard>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>

        <Reveal delay={120}>
          <div
            style={{
              marginTop: 48,
              padding: "28px 24px",
              borderRadius: "var(--radius-container)",
              background: "var(--color-surface-low)",
              border: "1px solid var(--color-border-subtle)",
              textAlign: "center",
            }}
          >
            <p
              style={{
                margin: 0,
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1rem, 2.4vw, 1.2rem)",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                lineHeight: 1.45,
              }}
            >
              No fim das 6 semanas, você não depende de memória, dica ou sorte.
            </p>
            <p
              style={{
                margin: "8px 0 0",
                color: "var(--ig-text-readable, #C9C5BD)",
                fontSize: "0.95rem",
              }}
            >
              Você tem um protocolo testado, ajustado e pronto para executar.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ===================== QUALIFICAÇÃO ===================== */
function QualificationSection() {
  const yes = [
    "Treina sério e quer parar de quebrar na prova",
    "Já teve problema com energia, gel ou alimentação",
    "Quer saber exatamente o que fazer, sem improviso",
    "Está disposto a testar a estratégia nos treinos antes da prova",
  ];
  const no = [
    "Procura dieta pronta ou cardápio genérico",
    "Não segue estratégia e prefere “ver na hora”",
    "Não quer testar nada antes da prova",
    "Espera resultado sem ajustar o que está fazendo hoje",
  ];
  return (
    <section
      style={{
        background: "var(--color-surface-low)",
        borderTop: "1px solid var(--color-border-subtle)",
        borderBottom: "1px solid var(--color-border-subtle)",
        padding: "clamp(72px, 9vw, 108px) 24px",
      }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <Reveal>
          <SecLabel>Não é pra todo mundo</SecLabel>
          <H2>Quem entra e quem fica de fora.</H2>
        </Reveal>

        <div
          className="ig-qual-grid"
          style={{
            marginTop: 36,
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 16,
          }}
        >
          <Reveal>
            <GlassCard accent="cold" style={{ overflow: "hidden", height: "100%" }}>
              <div
                style={{
                  padding: "14px 20px",
                  fontFamily: "var(--font-display)",
                  fontSize: "0.76rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  borderBottom: "1px solid var(--color-border-subtle)",
                  background: "rgba(216,140,238,0.10)",
                  color: "var(--color-accent-cold)",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Check size={14} aria-hidden /> Para quem é
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: "20px",
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                {yes.map((it) => (
                  <li
                    key={it}
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "flex-start",
                      fontSize: "0.92rem",
                      color: "var(--color-text-primary)",
                      lineHeight: 1.5,
                    }}
                  >
                    <span
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: "var(--radius-pill)",
                        background: "rgba(216,140,238,0.12)",
                        border: "1px solid rgba(216,140,238,0.32)",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    >
                      <Check size={12} color="var(--color-accent-cold)" />
                    </span>
                    {it}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>

          <Reveal delay={80}>
            <GlassCard accent="warm" style={{ overflow: "hidden", height: "100%" }}>
              <div
                style={{
                  padding: "14px 20px",
                  fontFamily: "var(--font-display)",
                  fontSize: "0.76rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  borderBottom: "1px solid var(--color-border-subtle)",
                  background: "rgba(192,26,26,0.10)",
                  color: "var(--color-action-primary)",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <X size={14} aria-hidden /> Para quem não é
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: "20px",
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                {no.map((it) => (
                  <li
                    key={it}
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "flex-start",
                      fontSize: "0.92rem",
                      color: "var(--color-text-primary)",
                      lineHeight: 1.5,
                    }}
                  >
                    <span
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: "var(--radius-pill)",
                        background: "rgba(192,26,26,0.12)",
                        border: "1px solid rgba(192,26,26,0.30)",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    >
                      <X size={12} color="var(--color-action-primary)" />
                    </span>
                    {it}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <p
            style={{
              marginTop: 32,
              textAlign: "center",
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1rem, 2.4vw, 1.2rem)",
              fontWeight: 600,
              color: "var(--color-text-primary)",
              lineHeight: 1.45,
              maxWidth: 640,
              marginInline: "auto",
            }}
          >
            Se você quer correr com segurança, isso é para você.{" "}
            <span style={{ color: "var(--ig-text-readable, #C9C5BD)", fontWeight: 500 }}>
              Se prefere confiar na sorte, não é.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ===================== ENTREGÁVEIS + BÔNUS ===================== */
function DeliverablesSection() {
  const core = [
    {
      icon: Zap,
      t: "Acesso ao Painel de Prova",
      d: "O app exclusivo com todas as ferramentas que permitem que você não se preocupe com nada, apenas execute.",
    },
    {
      icon: Target,
      t: "Diagnóstico Inicial",
      d: "Mostra exatamente onde você está errando hoje e onde pode melhorar.",
    },
    {
      icon: MapIcon,
      t: "Sistema de Feedbacks",
      d: "O protocolo não é estático. Você reporta os resultados dos treinos longos e nós ajustamos a rota com base nos dados de resposta do seu corpo.",
    },
    {
      icon: Lock,
      t: "Área de Membros",
      d: "O acervo técnico do protocolo. Módulos diretos sobre estratégia, logística de véspera e uso inteligente de suplementação.",
    },
  ];
  const bonus = [
    {
      n: "Bônus 01",
      ref: "R$ 197",
      h: "Manual de Véspera para Corredores",
      d: "Evita erros clássicos que fazem atletas bem treinados quebrarem antes mesmo da prova começar.",
      bullets: [
        "Alimentação e decisões práticas em viagem (aeroporto, hotel, restaurantes)",
        "Linha do tempo detalhada das horas que antecedem a largada",
      ],
    },
    {
      n: "Bônus 02",
      ref: "R$ 97",
      h: "Checklist de Prova",
      d: "Remove a ansiedade do “esqueci alguma coisa?” e libera sua mente para focar no desempenho.",
      bullets: ["Checklist interativo dentro da plataforma", "Verificação de equipamentos e logística de prova"],
    },
  ];

  return (
    <section style={{ padding: "clamp(72px, 9vw, 108px) 24px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <Reveal>
          <SecLabel>O que você recebe</SecLabel>
          <H2>Núcleo do Protocolo</H2>
        </Reveal>

        <div
          className="ig-core-grid"
          style={{
            marginTop: 36,
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 14,
          }}
        >
          {core.map(({ icon: Icon, t, d }, i) => (
            <Reveal key={t} delay={i * 60}>
              <GlassCard style={{ padding: "24px", height: "100%" }}>
                <span
                  style={{
                    display: "inline-flex",
                    width: 44,
                    height: 44,
                    borderRadius: "var(--radius-element)",
                    background: "rgba(192,26,26,0.10)",
                    border: "1px solid rgba(192,26,26,0.28)",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 14,
                  }}
                >
                  <Icon size={20} color="var(--color-action-primary)" aria-hidden />
                </span>
                <h3
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    color: "var(--color-text-primary)",
                  }}
                >
                  {t}
                </h3>
                <p
                  style={{
                    margin: "8px 0 0",
                    fontSize: "0.88rem",
                    color: "var(--ig-text-readable, #C9C5BD)",
                    lineHeight: 1.55,
                  }}
                >
                  {d}
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={160}>
          <div style={{ marginTop: 48 }}>
            <SecLabel color="var(--color-accent-cold)">Bônus estratégicos</SecLabel>
            <H2>+ 2 bônus para blindar a sua prova.</H2>
          </div>
        </Reveal>

        <div
          className="ig-bonus-grid"
          style={{
            marginTop: 28,
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 16,
          }}
        >
          {bonus.map((b, i) => (
            <Reveal key={b.n} delay={i * 80}>
              <GlassCard
                accent="cold"
                style={{
                  padding: 28,
                  height: "100%",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: -60,
                    right: -60,
                    width: 200,
                    height: 200,
                    background: "radial-gradient(circle, rgba(216,140,238,0.18), transparent 70%)",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 14,
                    position: "relative",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      fontFamily: "var(--font-display)",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--color-accent-cold)",
                      background: "rgba(216,140,238,0.10)",
                      padding: "4px 12px",
                      borderRadius: "var(--radius-element)",
                      border: "1px solid rgba(216,140,238,0.28)",
                    }}
                  >
                    {b.n}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "0.78rem",
                      color: "var(--ig-text-readable, #C9C5BD)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    Valor:{" "}
                    <span
                      style={{
                        color: "var(--color-text-primary)",
                        fontWeight: 700,
                      }}
                    >
                      {b.ref}
                    </span>
                  </span>
                </div>
                <h3
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1.2rem",
                    color: "var(--color-text-primary)",
                    position: "relative",
                  }}
                >
                  {b.h}
                </h3>
                <p
                  style={{
                    margin: "10px 0 16px",
                    fontSize: "0.92rem",
                    color: "var(--ig-text-readable, #C9C5BD)",
                    lineHeight: 1.6,
                    position: "relative",
                  }}
                >
                  {b.d}
                </p>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    position: "relative",
                  }}
                >
                  {b.bullets.map((bl) => (
                    <li
                      key={bl}
                      style={{
                        display: "flex",
                        gap: 10,
                        alignItems: "flex-start",
                        fontSize: "0.88rem",
                        color: "var(--ig-text-readable, #C9C5BD)",
                        lineHeight: 1.55,
                      }}
                    >
                      <Check size={14} color="var(--color-accent-cold)" style={{ flexShrink: 0, marginTop: 4 }} />
                      {bl}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== OFERTA / PREÇO ===================== */
function PriceSection() {
  const tower = [
    { label: "Protocolo: Ignição", value: "R$ 697" },
    { label: "Bônus 01 — Manual de Véspera", value: "R$ 197" },
    { label: "Bônus 02 — Checklist de Prova", value: "R$ 97" },
  ];
  return (
    <section
      id="oferta"
      style={{
        position: "relative",
        padding: "clamp(80px, 10vw, 120px) 24px",
        borderTop: "1px solid var(--color-border-subtle)",
        borderBottom: "1px solid var(--color-border-subtle)",
        background: "var(--color-bg)",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -120,
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(192,26,26,0.18), transparent 65%)",
          pointerEvents: "none",
          filter: "blur(8px)",
        }}
      />
      <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center", position: "relative" }}>
        <Reveal>
          <SecLabel>Investimento</SecLabel>
          <H2>
            Uma prova importante passa de R$ 1.000 entre inscrição e viagem.{" "}
            <span
              style={{
                backgroundImage: BRAND_GRADIENT,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Não jogue isso fora.
            </span>
          </H2>
        </Reveal>

        <Reveal delay={100}>
          <div
            style={{
              maxWidth: 440,
              margin: "36px auto 0",
              padding: 1,
              borderRadius: "var(--radius-container)",
              background: BRAND_GRADIENT,
              boxShadow: "0 24px 60px -24px rgba(192,26,26,0.55), 0 0 0 1px rgba(255,115,74,0.12)",
            }}
          >
            <div
              style={{
                background: "var(--color-surface-mid)",
                borderRadius: "calc(var(--radius-container) - 1px)",
                overflow: "hidden",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  padding: "20px 24px 18px",
                  borderBottom: "1px solid var(--color-border-subtle)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--color-action-primary)",
                    fontWeight: 700,
                    marginBottom: 4,
                  }}
                >
                  Oferta única
                </div>
                <h3
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1.15rem",
                    color: "var(--color-text-primary)",
                    lineHeight: 1.2,
                  }}
                >
                  Protocolo Ignição — Ciclo Completo
                </h3>
                <p
                  style={{
                    margin: "6px 0 0",
                    fontSize: "0.82rem",
                    color: "var(--ig-text-readable, #C9C5BD)",
                    lineHeight: 1.45,
                  }}
                >
                  6 semanas · 100% online · foco em estratégia de prova
                </p>
              </div>

              <div style={{ padding: "20px 24px 24px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {tower.map((t) => (
                    <div
                      key={t.label}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "8px 0",
                        borderBottom: "1px dashed var(--color-border-subtle)",
                        fontSize: "0.85rem",
                        color: "var(--ig-text-readable, #C9C5BD)",
                        gap: 12,
                      }}
                    >
                      <span>{t.label}</span>
                      <span
                        style={{
                          textDecoration: "line-through",
                          color: "var(--color-text-disabled)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {t.value}
                      </span>
                    </div>
                  ))}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px 0 4px",
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "0.92rem",
                      color: "var(--color-text-primary)",
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                    }}
                  >
                    <span>Total</span>
                    <span style={{ textDecoration: "line-through", color: "var(--color-text-disabled)" }}>R$ 991</span>
                  </div>
                </div>

                <div
                  style={{
                    height: 1,
                    background: BRAND_GRADIENT,
                    margin: "18px 0 18px",
                    borderRadius: 2,
                    opacity: 0.8,
                  }}
                />

                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      color: "var(--ig-text-readable, #C9C5BD)",
                      fontSize: "0.78rem",
                      marginBottom: 2,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    Hoje, 12x de
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "clamp(2.6rem, 7vw, 3.6rem)",
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                      backgroundImage: BRAND_GRADIENT,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    R$ 29,70
                  </div>
                  <div
                    style={{
                      marginTop: 6,
                      fontSize: "0.88rem",
                      color: "var(--color-text-primary)",
                      fontWeight: 600,
                    }}
                  >
                    ou <span style={{ color: "var(--color-action-primary)" }}>R$ 297</span> à vista
                  </div>
                </div>

                <div style={{ marginTop: 22, display: "flex", justifyContent: "center" }}>
                  <CTA fullWidth />
                </div>
                <p
                  style={{
                    textAlign: "center",
                    color: "var(--ig-text-readable, #C9C5BD)",
                    fontSize: "0.76rem",
                    marginTop: 10,
                    lineHeight: 1.5,
                  }}
                >
                  Acesso imediato após confirmação · Valor promocional de lançamento para os 10 primeiros.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ===================== GARANTIA ===================== */
function GuaranteeSection() {
  return (
    <section style={{ padding: "clamp(64px, 8vw, 96px) 24px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <Reveal>
          <div
            style={{
              background: "var(--color-surface-mid)",
              border: "1px solid var(--color-border-subtle)",
              borderRadius: "var(--radius-container)",
              padding: "40px 32px",
              display: "flex",
              flexDirection: "column",
              gap: 18,
              alignItems: "center",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: -120,
                left: "50%",
                transform: "translateX(-50%)",
                width: 320,
                height: 320,
                background: "radial-gradient(circle, rgba(255,115,74,0.10), transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "var(--radius-pill)",
                background: "var(--color-bg)",
                border: "1px solid var(--color-border)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                boxShadow: "0 0 32px rgba(255,115,74,0.18)",
              }}
            >
              <ShieldCheck size={36} color="var(--color-action-primary)" />
            </div>
            <SecLabel>O RISCO É TODO MEU!</SecLabel>
            <h3
              style={{
                margin: 0,
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(1.4rem, 3.5vw, 1.8rem)",
                letterSpacing: "-0.01em",
                color: "var(--color-text-primary)",
                textTransform: "uppercase",
              }}
            >
              Prova sem improviso
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: "1rem",
                color: "var(--ig-text-readable, #C9C5BD)",
                lineHeight: 1.65,
                maxWidth: 540,
              }}
            >
              Se você seguir o protocolo, aplicar nos treinos e chegar na prova sem clareza do que fazer em cada
              momento,{" "}
              <span style={{ color: "var(--color-text-primary)", fontWeight: 600 }}>eu devolvo seu dinheiro.</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ===================== FAQ ===================== */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid var(--color-border-subtle)" }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{
          width: "100%",
          background: "transparent",
          border: "none",
          padding: "20px 4px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          cursor: "pointer",
          textAlign: "left",
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "1rem",
          color: "var(--color-text-primary)",
          letterSpacing: "-0.005em",
        }}
      >
        <span>{q}</span>
        <ChevronDown
          size={18}
          color="var(--ig-text-readable, #C9C5BD)"
          style={{
            flexShrink: 0,
            transform: open ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 0.25s ease",
          }}
          aria-hidden
        />
      </button>
      <div
        style={{
          maxHeight: open ? 500 : 0,
          overflow: "hidden",
          transition: "max-height 0.35s ease, opacity 0.25s ease",
          opacity: open ? 1 : 0,
        }}
      >
        <p
          style={{
            margin: 0,
            padding: "0 4px 22px",
            fontSize: "0.92rem",
            color: "var(--ig-text-readable, #C9C5BD)",
            lineHeight: 1.65,
          }}
        >
          {a}
        </p>
      </div>
    </div>
  );
}

function FaqSection() {
  const faq = [
    {
      q: "Minha prova é em 3 semanas. Dá tempo?",
      a: "Sim. Com 3 semanas, a gente acelera o processo: diagnóstico e primeira versão do protocolo na semana 1, teste nos treinos longos disponíveis na semana 2, refinamento e prova na semana 3. Depois da prova, se ainda restarem semanas no ciclo, usamos para analisar o que aconteceu e consolidar aprendizado.",
    },
    {
      q: "Isso serve para 5k ou apenas para provas longas?",
      a: "Serve para qualquer distância. Principalmente 10k, meia maratona ou maratona. A estratégia muda conforme a distância e o ritmo pretendido. O mapeamento inicial leva isso em conta desde o início.",
    },
    {
      q: "Você monta dieta do dia a dia também?",
      a: "Não. O Protocolo Ignição tem escopo exclusivo em estratégia de prova: o que você come antes, durante e após a prova. Não é dieta completa. Eu tenho outro tipo de acompanhamento que disponibiliza isso. Esse foco deliberado é o que permite resultados precisos em 6 semanas.",
    },
    {
      q: "E se eu tiver duas provas no ciclo?",
      a: "O Protocolo é desenhado para uma prova-alvo por vez — distância, ritmo e estratégia mudam muito entre provas diferentes. Se quiser preparar uma segunda prova, você vai precisar de ajustes.",
    },
    {
      q: "Preciso ter experiência com géis e suplementação antes de entrar?",
      a: "Não. O mapeamento inicial parte do zero: o que você já usa ou já testou, e o que nunca experimentou. A estratégia é construída a partir da sua realidade, não de um protocolo padrão que pressupõe experiência.",
    },
    {
      q: "Como é o suporte durante as 6 semanas?",
      a: "WhatsApp para dúvidas relacionadas ao protocolo de prova. Resposta em até 24 horas úteis. Você não fica largado com um PDF na mão. Cada ciclo de teste tem análise e retorno documentado.",
    },
    {
      q: "Como funciona a garantia?",
      a: "É condicional: você aplica os testes nos treinos, executa o protocolo na prova e, mesmo assim, sente que não saiu do improviso, eu devolvo o valor. Sem drama. Além disso, toda compra online tem garantia legal de 7 dias por lei.",
    },
  ];

  return (
    <section
      style={{
        background: "var(--color-surface-low)",
        borderTop: "1px solid var(--color-border-subtle)",
        padding: "clamp(72px, 9vw, 108px) 24px",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <Reveal>
          <SecLabel>Perguntas frequentes</SecLabel>
          <H2>O que costumam me perguntar antes.</H2>
        </Reveal>

        <Reveal delay={100}>
          <div style={{ marginTop: 36 }}>
            {faq.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ===================== STICKY CTA MOBILE ===================== */
function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const isMobile = window.innerWidth < 720;
      if (!isMobile) {
        setVisible(false);
        return;
      }
      const oferta = document.getElementById("oferta");
      if (oferta) {
        const rect = oferta.getBoundingClientRect();
        const inView = rect.top < window.innerHeight * 0.85 && rect.bottom > 0;
        setVisible(window.scrollY > 360 && !inView);
      } else {
        setVisible(window.scrollY > 360);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        padding: "12px 16px calc(12px + env(safe-area-inset-bottom))",
        background: "color-mix(in srgb, var(--color-bg) 92%, transparent)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderTop: "1px solid var(--color-border-subtle)",
        zIndex: 50,
        transform: visible ? "translateY(0)" : "translateY(110%)",
        transition: "transform 0.3s ease",
        display: "flex",
        justifyContent: "center",
      }}
      className="ig-sticky-cta"
    >
      <CTA small fullWidth />
    </div>
  );
}

/* ===================== FOOTER ===================== */
function Footer() {
  return (
    <footer
      style={{
        padding: "32px 24px 110px",
        textAlign: "center",
        color: "var(--ig-text-readable, #C9C5BD)",
        fontSize: "0.8rem",
        background: "var(--color-bg)",
      }}
    >
      <div
        aria-hidden
        style={{
          height: 2,
          background: BRAND_GRADIENT,
          opacity: 0.4,
          maxWidth: 200,
          margin: "0 auto 24px",
          borderRadius: 2,
        }}
      />
      © {new Date().getFullYear()} Protocolo Ignição · Nutrição estratégica para corredores
    </footer>
  );
}

/* ===================== THEME TOGGLE FAB ===================== */
function ThemeToggleFab() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Mudar para tema claro" : "Mudar para tema escuro"}
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 60,
        width: 44,
        height: 44,
        borderRadius: "var(--radius-pill)",
        background: "color-mix(in srgb, var(--color-surface-high) 78%, transparent)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid var(--color-border-subtle)",
        color: "var(--color-text-primary)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "0 8px 24px -8px rgba(0,0,0,0.45)",
        transition: "transform 0.2s ease, background 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {isDark ? <Sun size={18} aria-hidden /> : <Moon size={18} aria-hidden />}
    </button>
  );
}

/* ===================== PAGE ===================== */
export default function ProtocoloIgnicao() {
  useEffect(() => {
    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap";
    document.head.appendChild(fontLink);

    const style = document.createElement("style");
    style.id = "ig-protocolo-styles";
    style.textContent = `
      :root, [data-theme="dark"] {
        --ig-text-readable: #C9C5BD;
      }
      [data-theme="light"] {
        --ig-text-readable: #4A4845;
      }
      @keyframes ig-breath {
        0%, 100% { opacity: 0.55; transform: scale(1); }
        50% { opacity: 0.85; transform: scale(1.06); }
      }
      .ig-hero-glow { animation: ig-breath 9s ease-in-out infinite; }
      .ig-hero-glow-b { animation-delay: -4s; }

      @keyframes ig-flame-flicker {
        0%, 100% { transform: scale(1) rotate(-1deg); filter: drop-shadow(0 0 0 rgba(255,115,74,0)); }
        25%      { transform: scale(1.08) rotate(1.5deg); filter: drop-shadow(0 0 6px rgba(255,115,74,0.55)); }
        50%      { transform: scale(0.96) rotate(-1.5deg); filter: drop-shadow(0 0 3px rgba(255,115,74,0.35)); }
        75%      { transform: scale(1.06) rotate(1deg); filter: drop-shadow(0 0 8px rgba(255,115,74,0.6)); }
      }
      .ig-hero-flame { animation: ig-flame-flicker 1.8s ease-in-out infinite; }

      @keyframes ig-shimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
      .ig-phone-shimmer { animation: ig-shimmer 6s linear infinite; }

      @keyframes ig-float-a {
        0%   { transform: translate(0, 0) rotate(-5deg); }
        25%  { transform: translate(-4px, -7px) rotate(-6.5deg); }
        50%  { transform: translate(3px, -11px) rotate(-3.5deg); }
        75%  { transform: translate(-2px, -5px) rotate(-5.8deg); }
        100% { transform: translate(0, 0) rotate(-5deg); }
      }
      @keyframes ig-float-b {
        0%   { transform: translate(0, 0) rotate(6deg); }
        25%  { transform: translate(5px, -6px) rotate(7.8deg); }
        50%  { transform: translate(-3px, -12px) rotate(4.8deg); }
        75%  { transform: translate(4px, -4px) rotate(6.6deg); }
        100% { transform: translate(0, 0) rotate(6deg); }
      }
      @keyframes ig-float-c {
        0%   { transform: translate(0, 0) rotate(4deg); }
        25%  { transform: translate(3px, -8px) rotate(2.6deg); }
        50%  { transform: translate(-4px, -10px) rotate(5.4deg); }
        75%  { transform: translate(2px, -3px) rotate(3.2deg); }
        100% { transform: translate(0, 0) rotate(4deg); }
      }
      @keyframes ig-float-d {
        0%   { transform: translate(0, 0) rotate(-4deg); }
        25%  { transform: translate(-5px, -5px) rotate(-2.4deg); }
        50%  { transform: translate(4px, -11px) rotate(-5.6deg); }
        75%  { transform: translate(-3px, -7px) rotate(-3.2deg); }
        100% { transform: translate(0, 0) rotate(-4deg); }
      }
      .ig-float-card { will-change: transform; }
      .ig-float-card-a { animation: ig-float-a 7.3s ease-in-out infinite; }
      .ig-float-card-b { animation: ig-float-b 8.6s ease-in-out infinite; animation-delay: -1.8s; }
      .ig-float-card-c { animation: ig-float-c 9.1s ease-in-out infinite; animation-delay: -3.2s; }
      .ig-float-card-d { animation: ig-float-d 7.9s ease-in-out infinite; animation-delay: -4.5s; }

      /* floating-card styles removidos — agora 100% inline no componente FloatingCard */
      @media (min-width: 720px) {
        .ig-float-card { width: 138px !important; }
      }

      @media (min-width: 720px) {
        .ig-mockup-grid { grid-template-columns: 1.05fr 0.95fr !important; }
        .ig-system-cards { grid-template-columns: 1fr !important; max-width: 360px; }
        .ig-bento { grid-template-columns: repeat(3, 1fr) !important; }
        .ig-qual-grid { grid-template-columns: 1fr 1fr !important; }
        .ig-core-grid { grid-template-columns: repeat(2, 1fr) !important; }
        .ig-bonus-grid { grid-template-columns: 1fr 1fr !important; }
        .ig-sticky-cta { display: none !important; }
      }
      @media (min-width: 1000px) {
        .ig-core-grid { grid-template-columns: repeat(4, 1fr) !important; }
      }

      @media (prefers-reduced-motion: reduce) {
        .ig-hero-glow, .ig-phone-shimmer, .ig-hero-flame, .ig-float-card { animation: none !important; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.getElementById("ig-protocolo-styles")?.remove();
      fontLink.remove();
    };
  }, []);

  return (
    <main
      style={{
        background: "var(--color-bg)",
        color: "var(--color-text-primary)",
        minHeight: "100vh",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <Hero />
      <SystemSection />
      <ProblemSection />
      <MethodologySection />
      <QualificationSection />
      <DeliverablesSection />
      <PriceSection />
      <GuaranteeSection />
      <FaqSection />
      <Footer />
      <StickyMobileCTA />
      <ThemeToggleFab />
    </main>
  );
}
