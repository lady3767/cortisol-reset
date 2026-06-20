import { useState, useEffect, useRef } from "react";

// ─── Paleta de colores ───────────────────────────────────────────────────────
const C = {
  bg: "#FAF7F2",
  bgCard: "#FFFFFF",
  primary: "#C26B4F",
  primaryLight: "#E8A48A",
  primaryDark: "#9E4F35",
  secondary: "#4A7C6F",
  secondaryLight: "#7AB5A5",
  accent: "#F2C46D",
  text: "#2C2C2C",
  textMuted: "#7A7A7A",
  textLight: "#FFFFFF",
  border: "#EDE8E0",
  success: "#4CAF76",
  warning: "#F2A83E",
  danger: "#E05C5C",
  gradStart: "#C26B4F",
  gradEnd: "#9E4F35",
};

// ─── Iconos SVG inline ────────────────────────────────────────────────────────
const Icon = ({ name, size = 24, color = C.text }) => {
  const icons = {
    home: (
      <path d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1V10" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    ),
    plan: (
      <><rect x="3" y="4" width="18" height="18" rx="2" fill="none" stroke={color} strokeWidth="2" /><line x1="16" y1="2" x2="16" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" /><line x1="8" y1="2" x2="8" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" /><line x1="3" y1="10" x2="21" y2="10" stroke={color} strokeWidth="2" /></>
    ),
    exercise: (
      <><circle cx="12" cy="12" r="9" fill="none" stroke={color} strokeWidth="2" /><path d="M8 12h8M12 8v8" stroke={color} strokeWidth="2" strokeLinecap="round" /></>
    ),
    progress: (
      <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></>
    ),
    challenges: (
      <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></>
    ),
    heart: (
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" fill={color} stroke={color} strokeWidth="1.5" />
    ),
    water: (
      <path d="M12 2C6.48 2 2 8.5 2 13a10 10 0 0020 0C22 8.5 17.52 2 12 2z" fill="none" stroke={color} strokeWidth="2" />
    ),
    steps: (
      <><path d="M13 5c0 2-2 4-2 4s-2-2-2-4a2 2 0 014 0z" fill={color} /><path d="M19 11c0 2-2 4-2 4s-2-2-2-4a2 2 0 014 0z" fill={color} /><path d="M7 15c0 2-2 4-2 4s-2-2-2-4a2 2 0 014 0z" fill={color} /></>
    ),
    weight: (
      <><rect x="3" y="8" width="18" height="12" rx="2" fill="none" stroke={color} strokeWidth="2" /><path d="M8 8V6a4 4 0 018 0v2" fill="none" stroke={color} strokeWidth="2" /></>
    ),
    play: (
      <><circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="2" /><polygon points="10 8 16 12 10 16 10 8" fill={color} /></>
    ),
    check: (
      <polyline points="20 6 9 17 4 12" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    ),
    arrow: (
      <polyline points="9 18 15 12 9 6" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    ),
    star: (
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill={color} />
    ),
    moon: (
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="none" stroke={color} strokeWidth="2" />
    ),
    meditation: (
      <><circle cx="12" cy="7" r="4" fill="none" stroke={color} strokeWidth="2" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" /></>
    ),
    fire: (
      <path d="M12 2C8 7 6 10 6 14a6 6 0 0012 0c0-4-2-7-6-12z" fill="none" stroke={color} strokeWidth="2" />
    ),
    lock: (
      <><rect x="5" y="11" width="14" height="11" rx="2" fill="none" stroke={color} strokeWidth="2" /><path d="M8 11V7a4 4 0 018 0v4" fill="none" stroke={color} strokeWidth="2" /></>
    ),
    info: (
      <><circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="2" /><line x1="12" y1="8" x2="12" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" /><circle cx="12" cy="16" r="0.5" fill={color} stroke={color} strokeWidth="2" /></>
    ),
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {icons[name] || null}
    </svg>
  );
};

// ─── Datos de quiz ────────────────────────────────────────────────────────────
const quizQuestions = [
  {
    id: 1,
    question: "¿Cuál es tu objetivo principal?",
    options: [
      { id: "a", text: "Perder peso", icon: "🏃" },
      { id: "b", text: "Reducir el estrés", icon: "🧘" },
      { id: "c", text: "Mejorar el sueño", icon: "🌙" },
      { id: "d", text: "Tonificar el cuerpo", icon: "💪" },
    ],
  },
  {
    id: 2,
    question: "¿Cuánto tiempo llevas con problemas de estrés crónico?",
    options: [
      { id: "a", text: "Menos de 6 meses", icon: "📅" },
      { id: "b", text: "6 meses a 1 año", icon: "📆" },
      { id: "c", text: "1 a 3 años", icon: "⏳" },
      { id: "d", text: "Más de 3 años", icon: "🕰️" },
    ],
  },
  {
    id: 3,
    question: "¿Cómo describirías tu nivel de actividad física actual?",
    options: [
      { id: "a", text: "Sedentario (casi nada)", icon: "🛋️" },
      { id: "b", text: "Ligero (camino a veces)", icon: "🚶" },
      { id: "c", text: "Moderado (1-3 días/semana)", icon: "🏊" },
      { id: "d", text: "Activo (4+ días/semana)", icon: "🏋️" },
    ],
  },
  {
    id: 4,
    question: "¿Cómo son tus hábitos de sueño?",
    options: [
      { id: "a", text: "Duermo muy poco (< 5h)", icon: "😴" },
      { id: "b", text: "Irregular (5-6h)", icon: "😪" },
      { id: "c", text: "Regular pero no descansada (6-7h)", icon: "😶" },
      { id: "d", text: "Bien (7-8h)", icon: "😊" },
    ],
  },
  {
    id: 5,
    question: "¿Cuántos kilos te gustaría perder?",
    options: [
      { id: "a", text: "1 - 5 kg", icon: "📉" },
      { id: "b", text: "5 - 10 kg", icon: "⚖️" },
      { id: "c", text: "10 - 20 kg", icon: "🎯" },
      { id: "d", text: "Más de 20 kg", icon: "🌟" },
    ],
  },
];

// ─── Datos del plan de comidas ─────────────────────────────────────────────────
const mealPlan = {
  lunes: {
    desayuno: { name: "Avena antiinflamatoria", desc: "Con cúrcuma, jengibre y frutas del bosque", cal: 320, time: "10 min", tag: "Anti-cortisol" },
    almuerzo: { name: "Ensalada de salmón", desc: "Salmón a la plancha, espinacas, aguacate y limón", cal: 480, time: "15 min", tag: "Omega-3" },
    cena: { name: "Caldo de huesos con verduras", desc: "Rico en colágeno y minerales relajantes", cal: 280, time: "20 min", tag: "Relajante" },
    snack: { name: "Nueces y chocolate 70%", desc: "Magnesio para reducir cortisol", cal: 180, time: "0 min", tag: "Snack" },
  },
  martes: {
    desayuno: { name: "Smoothie verde detox", desc: "Espinacas, pepino, jengibre y manzana verde", cal: 210, time: "5 min", tag: "Detox" },
    almuerzo: { name: "Pollo al horno con quinoa", desc: "Con brócoli asado y salsa de limón", cal: 520, time: "30 min", tag: "Proteína" },
    cena: { name: "Crema de calabaza", desc: "Con semillas de calabaza y aceite de oliva", cal: 260, time: "25 min", tag: "Reconfortante" },
    snack: { name: "Yogur griego con miel", desc: "Probióticos para el intestino-cerebro", cal: 150, time: "0 min", tag: "Probiótico" },
  },
  miercoles: {
    desayuno: { name: "Tostadas de centeno", desc: "Con aguacate, huevo pochado y semillas de chía", cal: 380, time: "12 min", tag: "Energía sostenida" },
    almuerzo: { name: "Estofado de lentejas", desc: "Con verduras de temporada y especias", cal: 460, time: "35 min", tag: "Fibra" },
    cena: { name: "Pescado al vapor", desc: "Merluza con espárragos y hierbas frescas", cal: 290, time: "18 min", tag: "Ligero" },
    snack: { name: "Manzana con mantequilla de almendras", desc: "Estabiliza el azúcar en sangre", cal: 200, time: "0 min", tag: "Equilibrante" },
  },
};

// ─── Datos de ejercicios ───────────────────────────────────────────────────────
const exercises = [
  { id: 1, name: "Yoga matutino suave", duration: "20 min", level: "Principiante", type: "Yoga", cal: 80, desc: "Secuencia de posturas para despertar el cuerpo y calmar la mente", icon: "🧘", color: "#7AB5A5" },
  { id: 2, name: "Caminata consciente", duration: "30 min", level: "Principiante", type: "Cardio", cal: 120, desc: "Caminata al aire libre con técnicas de respiración profunda", icon: "🚶", color: "#C26B4F" },
  { id: 3, name: "Pilates anti-estrés", duration: "25 min", level: "Intermedio", type: "Fuerza", cal: 110, desc: "Ejercicios de core y flexibilidad para liberar tensión", icon: "💪", color: "#4A7C6F" },
  { id: 4, name: "Respiración 4-7-8", duration: "10 min", level: "Todos", type: "Meditación", cal: 20, desc: "Técnica comprobada para reducir cortisol en minutos", icon: "🌬️", color: "#F2C46D" },
  { id: 5, name: "Natación suave", duration: "40 min", level: "Intermedio", type: "Cardio", cal: 200, desc: "Cardio de bajo impacto, ideal para articulaciones y estrés", icon: "🏊", color: "#C26B4F" },
  { id: 6, name: "Estiramiento nocturno", duration: "15 min", level: "Principiante", type: "Flexibilidad", cal: 40, desc: "Secuencia para preparar el cuerpo al descanso profundo", icon: "🌙", color: "#7AB5A5" },
];

// ─── Datos de desafíos ─────────────────────────────────────────────────────────
const challenges = [
  { id: 1, title: "7 días sin azúcar añadida", desc: "Elimina el azúcar refinada por 7 días y observa el cambio en tu energía", days: 7, completed: 3, icon: "🍬", reward: "Medalla Dulce Detox", color: "#E05C5C" },
  { id: 2, title: "30 minutos de naturaleza diarios", desc: "Sal al exterior 30 minutos cada día. La naturaleza reduce el cortisol un 21%", days: 14, completed: 14, icon: "🌿", reward: "Medalla Naturaleza Zen", color: "#4CAF76" },
  { id: 3, title: "Hidratación consciente", desc: "Bebe 2.5 litros de agua al día durante 10 días seguidos", days: 10, completed: 6, icon: "💧", reward: "Medalla Oceánica", color: "#4A7C6F" },
  { id: 4, title: "Meditación de madrugada", desc: "Medita 5 minutos antes de revisar el teléfono cada mañana por 21 días", days: 21, completed: 0, icon: "🧘", reward: "Medalla Mente Clara", color: "#7AB5A5" },
  { id: 5, title: "Diario de gratitud", desc: "Escribe 3 cosas por las que estás agradecida cada noche durante 14 días", days: 14, completed: 8, icon: "📓", reward: "Medalla Corazón Abierto", color: "#C26B4F" },
];

// ─── Utilidades ───────────────────────────────────────────────────────────────
const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });
  const setStoredValue = (val) => {
    setValue(val);
    window.localStorage.setItem(key, JSON.stringify(val));
  };
  return [value, setStoredValue];
};

// ─── Componente: ProgressRing ─────────────────────────────────────────────────
const ProgressRing = ({ value, max, size = 80, color = C.primary, label, unit }) => {
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(value / max, 1);
  const dash = circ * pct;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={C.border} strokeWidth={8} />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={color} strokeWidth={8}
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 0.8s ease" }}
        />
      </svg>
      <div style={{ position: "relative", marginTop: -size / 2 - 8 }}>
        <div style={{ textAlign: "center", lineHeight: 1.1 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: C.text }}>{value}</div>
          <div style={{ fontSize: 10, color: C.textMuted }}>{unit}</div>
        </div>
      </div>
      <div style={{ marginTop: size / 2 - 4, fontSize: 11, color: C.textMuted, fontWeight: 600, textAlign: "center" }}>{label}</div>
    </div>
  );
};

// ─── Pantalla: Quiz de bienvenida ─────────────────────────────────────────────
const QuizScreen = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [intro, setIntro] = useState(true);

  const q = quizQuestions[step];
  const total = quizQuestions.length;

  const handleSelect = (optId) => {
    setSelected(optId);
    setTimeout(() => {
      setAnswers({ ...answers, [q.id]: optId });
      setSelected(null);
      if (step < total - 1) setStep(step + 1);
      else onComplete({ answers: { ...answers, [q.id]: optId }, name, age });
    }, 400);
  };

  if (intro) {
    return (
      <div style={{ minHeight: "100vh", background: `linear-gradient(160deg, ${C.gradStart}, ${C.gradEnd})`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 20px" }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🌿</div>
        <h1 style={{ color: "#FFF", fontSize: 28, fontWeight: 800, textAlign: "center", marginBottom: 8, lineHeight: 1.2 }}>
          Cortisol Reset
        </h1>
        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 14, textAlign: "center", marginBottom: 32, lineHeight: 1.6 }}>
          Un programa personalizado de la<br />
          <strong>Dra. Camila Restrepo, Nutricionista</strong><br />
          para reducir el estrés y transformar tu cuerpo
        </p>

        <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 16, padding: "20px", marginBottom: 28, width: "100%", maxWidth: 340 }}>
          {[
            { icon: "🥗", text: "Plan de comidas personalizado" },
            { icon: "🏃", text: "Ejercicios de bajo impacto" },
            { icon: "📊", text: "Seguimiento de progreso" },
            { icon: "🏆", text: "Desafíos motivadores" },
          ].map((f, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: i < 3 ? 12 : 0 }}>
              <span style={{ fontSize: 20 }}>{f.icon}</span>
              <span style={{ color: "#FFF", fontSize: 14 }}>{f.text}</span>
            </div>
          ))}
        </div>

        <div style={{ width: "100%", maxWidth: 340, marginBottom: 16 }}>
          <input
            type="text"
            placeholder="Tu nombre"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ width: "100%", padding: "14px 16px", borderRadius: 12, border: "none", fontSize: 15, background: "rgba(255,255,255,0.95)", color: C.text, boxSizing: "border-box", marginBottom: 10 }}
          />
          <input
            type="number"
            placeholder="Tu edad"
            value={age}
            onChange={e => setAge(e.target.value)}
            style={{ width: "100%", padding: "14px 16px", borderRadius: 12, border: "none", fontSize: 15, background: "rgba(255,255,255,0.95)", color: C.text, boxSizing: "border-box" }}
          />
        </div>

        <button
          onClick={() => { if (name.trim()) setIntro(false); }}
          style={{
            width: "100%", maxWidth: 340, padding: "16px", borderRadius: 14, border: "none",
            background: name.trim() ? "#FFF" : "rgba(255,255,255,0.4)",
            color: name.trim() ? C.primary : "rgba(255,255,255,0.6)",
            fontSize: 16, fontWeight: 700, cursor: name.trim() ? "pointer" : "default",
            transition: "all 0.2s",
          }}
        >
          Comenzar mi quiz personalizado →
        </button>

        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, marginTop: 16, textAlign: "center" }}>
          Gratis • Sin tarjeta de crédito • Solo 2 minutos
        </p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${C.gradStart}, ${C.gradEnd})`, padding: "20px 20px 28px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 13 }}>Pregunta {step + 1} de {total}</span>
          <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 13 }}>{Math.round(((step) / total) * 100)}%</span>
        </div>
        <div style={{ background: "rgba(255,255,255,0.3)", borderRadius: 8, height: 6, overflow: "hidden" }}>
          <div style={{ background: "#FFF", height: "100%", width: `${((step) / total) * 100}%`, borderRadius: 8, transition: "width 0.4s ease" }} />
        </div>
      </div>

      <div style={{ padding: "28px 20px", flex: 1 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 28, lineHeight: 1.3 }}>
          {q.question}
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {q.options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              style={{
                display: "flex", alignItems: "center", gap: 16,
                padding: "16px 18px", borderRadius: 14,
                border: `2px solid ${selected === opt.id ? C.primary : C.border}`,
                background: selected === opt.id ? `${C.primary}15` : C.bgCard,
                cursor: "pointer", textAlign: "left",
                transform: selected === opt.id ? "scale(0.98)" : "scale(1)",
                transition: "all 0.2s",
              }}
            >
              <span style={{ fontSize: 28 }}>{opt.icon}</span>
              <span style={{ fontSize: 15, fontWeight: 500, color: C.text }}>{opt.text}</span>
              {selected === opt.id && (
                <div style={{ marginLeft: "auto" }}>
                  <Icon name="check" size={20} color={C.primary} />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Pantalla: Resultado del quiz ─────────────────────────────────────────────
const ResultScreen = ({ userData, onStart }) => {
  const [showing, setShowing] = useState(false);
  useEffect(() => { setTimeout(() => setShowing(true), 100); }, []);

  const goalMap = { a: "Pérdida de Peso", b: "Reducción de Estrés", c: "Mejora del Sueño", d: "Tonificación Corporal" };
  const goal = goalMap[userData?.answers?.[1]] || "Bienestar General";

  return (
    <div style={{ minHeight: "100vh", background: C.bg, paddingBottom: 40 }}>
      {/* Hero */}
      <div style={{ background: `linear-gradient(160deg, ${C.gradStart}, ${C.gradEnd})`, padding: "40px 20px 60px", textAlign: "center" }}>
        <div style={{ fontSize: 56, marginBottom: 12, animation: "bounce 1s ease" }}>🎉</div>
        <h1 style={{ color: "#FFF", fontSize: 26, fontWeight: 800, marginBottom: 8 }}>
          ¡Tu plan está listo, {userData?.name || "amiga"}!
        </h1>
        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 14, lineHeight: 1.6 }}>
          La Dra. Camila ha diseñado un programa<br />personalizado para tu objetivo de:
        </p>
        <div style={{ display: "inline-block", background: "rgba(255,255,255,0.2)", borderRadius: 20, padding: "8px 20px", marginTop: 12 }}>
          <span style={{ color: "#FFF", fontWeight: 700, fontSize: 15 }}>🎯 {goal}</span>
        </div>
      </div>

      {/* Stats card */}
      <div style={{ margin: "-30px 20px 20px", background: C.bgCard, borderRadius: 20, padding: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 16 }}>Tu plan incluye:</h3>
        {[
          { icon: "🥗", title: "21 comidas antiinflamatorias", desc: "Diseñadas para reducir cortisol" },
          { icon: "🏃", title: "15 rutinas de ejercicio suave", desc: "De 10 a 40 minutos, sin equipamiento" },
          { icon: "🧘", title: "7 meditaciones guiadas", desc: "Para dormir mejor y calmar la mente" },
          { icon: "📊", title: "Seguimiento personalizado", desc: "Pasos, agua, peso y ayuno" },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex", alignItems: "flex-start", gap: 14, marginBottom: i < 3 ? 16 : 0,
              opacity: showing ? 1 : 0, transform: showing ? "translateX(0)" : "translateX(20px)",
              transition: `all 0.4s ease ${i * 0.1}s`,
            }}
          >
            <span style={{ fontSize: 24, marginTop: 2 }}>{item.icon}</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{item.title}</div>
              <div style={{ fontSize: 12, color: C.textMuted }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Testimonials */}
      <div style={{ padding: "0 20px 24px" }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 16 }}>Lo que dicen otras mujeres:</h3>
        {[
          { name: "María G., 34 años", text: "Bajé 8 kilos en 2 meses sin pasar hambre. El plan es muy fácil de seguir.", stars: 5 },
          { name: "Ana L., 42 años", text: "Mi nivel de estrés bajó notablemente. Ahora duermo profundamente por primera vez en años.", stars: 5 },
        ].map((t, i) => (
          <div key={i} style={{ background: C.bgCard, borderRadius: 14, padding: "16px", marginBottom: 12, border: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
              {[...Array(t.stars)].map((_, j) => <Icon key={j} name="star" size={14} color={C.accent} />)}
            </div>
            <p style={{ fontSize: 13, color: C.text, lineHeight: 1.5, marginBottom: 8, fontStyle: "italic" }}>"{t.text}"</p>
            <p style={{ fontSize: 12, color: C.textMuted, fontWeight: 600 }}>— {t.name}</p>
          </div>
        ))}
      </div>

      <div style={{ padding: "0 20px" }}>
        <button
          onClick={onStart}
          style={{
            width: "100%", padding: "17px", borderRadius: 14, border: "none",
            background: `linear-gradient(135deg, ${C.gradStart}, ${C.gradEnd})`,
            color: "#FFF", fontSize: 17, fontWeight: 700, cursor: "pointer",
            boxShadow: `0 6px 20px ${C.primary}50`,
          }}
        >
          Comenzar mi programa 🚀
        </button>
        <p style={{ textAlign: "center", fontSize: 11, color: C.textMuted, marginTop: 12 }}>
          La Dra. Camila Restrepo • Nutricionista certificada
        </p>
      </div>
    </div>
  );
};

// ─── Pantalla: Home ───────────────────────────────────────────────────────────
const HomeScreen = ({ userData, trackerData }) => {
  const today = new Date().toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" });
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Buenos días" : hour < 18 ? "Buenas tardes" : "Buenas noches";
  const greetingEmoji = hour < 12 ? "☀️" : hour < 18 ? "🌤️" : "🌙";

  const tips = [
    "El cortisol es más alto por la mañana. Desayuna dentro de la primera hora de despertar.",
    "Una caminata de 30 minutos reduce el cortisol hasta un 27%. ¡Aprovecha el mediodía!",
    "El magnesio en nueces y chocolate negro ayuda a calmar el sistema nervioso.",
    "Respirar 4-7-8 activa el nervio vago y reduce el estrés en 5 minutos.",
  ];
  const todayTip = tips[new Date().getDay() % tips.length];

  return (
    <div style={{ padding: "24px 20px", paddingBottom: 100 }}>
      {/* Saludo */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p style={{ color: C.textMuted, fontSize: 13, marginBottom: 4 }}>{greetingEmoji} {greeting}</p>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: C.text }}>{userData?.name || "Bienvenida"} 👋</h1>
            <p style={{ fontSize: 12, color: C.textMuted, marginTop: 4, textTransform: "capitalize" }}>{today}</p>
          </div>
          <div style={{ width: 48, height: 48, borderRadius: 24, background: `linear-gradient(135deg, ${C.gradStart}, ${C.gradEnd})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 22 }}>🌿</span>
          </div>
        </div>
      </div>

      {/* Progreso del día */}
      <div style={{ background: `linear-gradient(135deg, ${C.gradStart}, ${C.gradEnd})`, borderRadius: 20, padding: "20px", marginBottom: 20 }}>
        <h3 style={{ color: "#FFF", fontSize: 14, fontWeight: 600, marginBottom: 16, opacity: 0.9 }}>Progreso de hoy</h3>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <ProgressRing value={trackerData.steps} max={8000} size={76} color="#FFF" label="Pasos" unit="/" />
          <ProgressRing value={trackerData.water} max={8} size={76} color="#FFF" label="Agua" unit="vasos" />
          <ProgressRing value={trackerData.meals} max={4} size={76} color="#FFF" label="Comidas" unit="/4" />
        </div>
      </div>

      {/* Consejo del día */}
      <div style={{ background: `${C.accent}20`, border: `1px solid ${C.accent}`, borderRadius: 16, padding: "16px", marginBottom: 20, display: "flex", gap: 12, alignItems: "flex-start" }}>
        <span style={{ fontSize: 24 }}>💡</span>
        <div>
          <p style={{ fontSize: 12, fontWeight: 700, color: C.primaryDark, marginBottom: 4 }}>Consejo de la Dra. Camila</p>
          <p style={{ fontSize: 13, color: C.text, lineHeight: 1.5 }}>{todayTip}</p>
        </div>
      </div>

      {/* Comida próxima */}
      <h2 style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 14 }}>Próxima comida 🍽️</h2>
      <div style={{ background: C.bgCard, borderRadius: 16, padding: "18px", marginBottom: 20, border: `1px solid ${C.border}`, boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div>
            <p style={{ fontSize: 16, fontWeight: 700, color: C.text }}>Almuerzo</p>
            <p style={{ fontSize: 14, color: C.primary, fontWeight: 600 }}>Ensalada de salmón</p>
          </div>
          <div style={{ background: `${C.primary}15`, borderRadius: 10, padding: "6px 12px" }}>
            <span style={{ fontSize: 12, color: C.primary, fontWeight: 600 }}>480 cal</span>
          </div>
        </div>
        <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.5 }}>Salmón a la plancha, espinacas, aguacate y limón</p>
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <span style={{ fontSize: 11, background: `${C.secondary}15`, color: C.secondary, borderRadius: 20, padding: "4px 10px", fontWeight: 600 }}>Omega-3</span>
          <span style={{ fontSize: 11, background: `${C.accent}25`, color: "#9A7A2A", borderRadius: 20, padding: "4px 10px", fontWeight: 600 }}>⏱ 15 min</span>
        </div>
      </div>

      {/* Ejercicio del día */}
      <h2 style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 14 }}>Ejercicio del día 🏃</h2>
      <div style={{ background: C.bgCard, borderRadius: 16, padding: "18px", marginBottom: 20, border: `1px solid ${C.border}`, boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: `${C.secondary}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>
            🧘
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Yoga matutino suave</p>
            <p style={{ fontSize: 12, color: C.textMuted }}>20 min • Principiante • 80 cal</p>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: 18, background: `linear-gradient(135deg, ${C.gradStart}, ${C.gradEnd})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="play" size={16} color="#FFF" />
          </div>
        </div>
      </div>

      {/* Artículo destacado */}
      <h2 style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 14 }}>Aprende más 📚</h2>
      <div style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${C.border}`, background: C.bgCard, boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
        <div style={{ background: `linear-gradient(135deg, ${C.secondary}, ${C.secondaryLight})`, padding: "20px", display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 36 }}>🧠</span>
          <div>
            <p style={{ color: "#FFF", fontSize: 15, fontWeight: 700 }}>¿Qué es el cortisol y por qué importa?</p>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 12 }}>Lectura de 5 min</p>
          </div>
        </div>
        <div style={{ padding: "16px" }}>
          <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.6 }}>
            El cortisol es la hormona del estrés. Niveles altos crónicamente pueden causar aumento de peso, insomnio y ansiedad. Descubre cómo regular tu sistema naturalmente...
          </p>
          <button style={{ marginTop: 12, background: "none", border: "none", color: C.primary, fontWeight: 700, fontSize: 13, cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 4 }}>
            Leer más <Icon name="arrow" size={16} color={C.primary} />
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Pantalla: Plan de comidas ─────────────────────────────────────────────────
const PlanScreen = () => {
  const days = ["lunes", "martes", "miercoles"];
  const dayLabels = { lunes: "Lunes", martes: "Martes", miercoles: "Miércoles" };
  const [activeDay, setActiveDay] = useState("lunes");
  const [expandedMeal, setExpandedMeal] = useState(null);

  const meals = mealPlan[activeDay];
  const mealIcons = { desayuno: "🌅", almuerzo: "☀️", cena: "🌙", snack: "🍎" };
  const mealNames = { desayuno: "Desayuno", almuerzo: "Almuerzo", cena: "Cena", snack: "Snack" };

  const totalCal = Object.values(meals).reduce((s, m) => s + m.cal, 0);

  return (
    <div style={{ padding: "24px 20px", paddingBottom: 100 }}>
      <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text, marginBottom: 4 }}>Tu Plan de Comidas 🥗</h1>
      <p style={{ fontSize: 13, color: C.textMuted, marginBottom: 20 }}>Diseñado por la Dra. Camila Restrepo</p>

      {/* Selector de días */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, overflowX: "auto", paddingBottom: 4 }}>
        {days.map(d => (
          <button
            key={d}
            onClick={() => setActiveDay(d)}
            style={{
              padding: "10px 18px", borderRadius: 12, border: "none",
              background: activeDay === d ? `linear-gradient(135deg, ${C.gradStart}, ${C.gradEnd})` : C.bgCard,
              color: activeDay === d ? "#FFF" : C.textMuted,
              fontSize: 14, fontWeight: 600, cursor: "pointer",
              border: activeDay === d ? "none" : `1px solid ${C.border}`,
              whiteSpace: "nowrap", flexShrink: 0,
              transition: "all 0.2s",
            }}
          >
            {dayLabels[d]}
          </button>
        ))}
        <button style={{ padding: "10px 18px", borderRadius: 12, border: `1px dashed ${C.border}`, background: "none", color: C.textMuted, fontSize: 14, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>
          Ver semana completa →
        </button>
      </div>

      {/* Total calorías */}
      <div style={{ background: `${C.primary}10`, borderRadius: 14, padding: "14px 16px", marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <p style={{ fontSize: 12, color: C.textMuted }}>Total del día</p>
          <p style={{ fontSize: 22, fontWeight: 800, color: C.primary }}>{totalCal} kcal</p>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          {[{ label: "Proteína", val: "35%" }, { label: "Carbos", val: "40%" }, { label: "Grasas", val: "25%" }].map((m, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{m.val}</p>
              <p style={{ fontSize: 10, color: C.textMuted }}>{m.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Comidas */}
      {Object.entries(meals).map(([type, meal]) => (
        <div
          key={type}
          onClick={() => setExpandedMeal(expandedMeal === type ? null : type)}
          style={{
            background: C.bgCard, borderRadius: 16, marginBottom: 12, border: `1px solid ${C.border}`,
            overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", cursor: "pointer",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px" }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: `${C.primary}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
              {mealIcons[type]}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 11, color: C.textMuted, fontWeight: 600, marginBottom: 2, textTransform: "uppercase", letterSpacing: 1 }}>{mealNames[type]}</p>
              <p style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{meal.name}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: C.primary }}>{meal.cal}</p>
              <p style={{ fontSize: 10, color: C.textMuted }}>kcal</p>
            </div>
          </div>

          {expandedMeal === type && (
            <div style={{ padding: "0 16px 16px", borderTop: `1px solid ${C.border}`, paddingTop: 14 }}>
              <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.6, marginBottom: 12 }}>{meal.desc}</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: 11, background: `${C.secondary}15`, color: C.secondary, borderRadius: 20, padding: "4px 10px", fontWeight: 600 }}>
                  🏷️ {meal.tag}
                </span>
                {meal.time !== "0 min" && (
                  <span style={{ fontSize: 11, background: `${C.accent}25`, color: "#9A7A2A", borderRadius: 20, padding: "4px 10px", fontWeight: 600 }}>
                    ⏱ {meal.time}
                  </span>
                )}
              </div>
              <button style={{ marginTop: 14, width: "100%", padding: "12px", borderRadius: 10, border: `1.5px solid ${C.primary}`, background: "none", color: C.primary, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                Ver receta completa
              </button>
            </div>
          )}
        </div>
      ))}

      {/* Nota */}
      <div style={{ background: `${C.secondary}10`, borderRadius: 14, padding: "14px", marginTop: 8, display: "flex", gap: 10 }}>
        <Icon name="info" size={18} color={C.secondary} />
        <p style={{ fontSize: 12, color: C.secondary, lineHeight: 1.5 }}>
          Este plan es orientativo. Siempre consulta a tu médico antes de iniciar cualquier cambio en tu dieta.
        </p>
      </div>
    </div>
  );
};

// ─── Pantalla: Ejercicios ─────────────────────────────────────────────────────
const ExercisesScreen = () => {
  const [filter, setFilter] = useState("Todos");
  const types = ["Todos", "Yoga", "Cardio", "Fuerza", "Meditación", "Flexibilidad"];
  const [activeExercise, setActiveExercise] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const filtered = filter === "Todos" ? exercises : exercises.filter(e => e.type === filter);

  return (
    <div style={{ padding: "24px 20px", paddingBottom: 100 }}>
      <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text, marginBottom: 4 }}>Ejercicios 💪</h1>
      <p style={{ fontSize: 13, color: C.textMuted, marginBottom: 20 }}>Rutinas de bajo impacto para tu cuerpo</p>

      {/* Filtros */}
      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4, marginBottom: 20 }}>
        {types.map(t => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            style={{
              padding: "8px 16px", borderRadius: 20, border: "none",
              background: filter === t ? C.primary : C.bgCard,
              color: filter === t ? "#FFF" : C.textMuted,
              fontSize: 13, fontWeight: 600, cursor: "pointer",
              border: filter === t ? "none" : `1px solid ${C.border}`,
              whiteSpace: "nowrap", flexShrink: 0,
              transition: "all 0.2s",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Modal ejercicio */}
      {activeExercise && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 100, display: "flex", alignItems: "flex-end" }} onClick={() => { setActiveExercise(null); setIsPlaying(false); }}>
          <div
            onClick={e => e.stopPropagation()}
            style={{ background: C.bgCard, borderRadius: "24px 24px 0 0", padding: "28px 20px 48px", width: "100%", maxWidth: 480, margin: "0 auto" }}
          >
            <div style={{ width: 40, height: 4, background: C.border, borderRadius: 2, margin: "0 auto 20px" }} />
            <div style={{ fontSize: 48, textAlign: "center", marginBottom: 16 }}>{activeExercise.icon}</div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: C.text, textAlign: "center", marginBottom: 8 }}>{activeExercise.name}</h2>
            <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: 12, background: `${activeExercise.color}20`, color: activeExercise.color, borderRadius: 20, padding: "4px 12px", fontWeight: 600 }}>⏱ {activeExercise.duration}</span>
              <span style={{ fontSize: 12, background: `${C.primary}15`, color: C.primary, borderRadius: 20, padding: "4px 12px", fontWeight: 600 }}>🔥 {activeExercise.cal} cal</span>
              <span style={{ fontSize: 12, background: `${C.secondary}15`, color: C.secondary, borderRadius: 20, padding: "4px 12px", fontWeight: 600 }}>{activeExercise.level}</span>
            </div>
            <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.6, textAlign: "center", marginBottom: 24 }}>{activeExercise.desc}</p>

            {/* Simulador de reproductor */}
            <div style={{ background: C.bg, borderRadius: 16, padding: "20px", marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontSize: 13, color: C.textMuted }}>0:00</span>
                <span style={{ fontSize: 13, color: C.textMuted }}>{activeExercise.duration}</span>
              </div>
              <div style={{ height: 4, background: C.border, borderRadius: 4, marginBottom: 20 }}>
                {isPlaying && <div style={{ height: "100%", width: "30%", background: C.primary, borderRadius: 4 }} />}
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  style={{ width: 60, height: 60, borderRadius: 30, background: `linear-gradient(135deg, ${C.gradStart}, ${C.gradEnd})`, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <span style={{ fontSize: 24, color: "#FFF" }}>{isPlaying ? "⏸" : "▶️"}</span>
                </button>
              </div>
              {/* TODO: Integrar reproductor de video/audio real con URL de contenido */}
            </div>

            <button
              onClick={() => { setActiveExercise(null); setIsPlaying(false); }}
              style={{ width: "100%", padding: "14px", borderRadius: 12, border: `1.5px solid ${C.border}`, background: "none", color: C.textMuted, fontSize: 14, fontWeight: 600, cursor: "pointer" }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Lista de ejercicios */}
      {filtered.map(ex => (
        <div
          key={ex.id}
          onClick={() => setActiveExercise(ex)}
          style={{
            background: C.bgCard, borderRadius: 16, padding: "16px", marginBottom: 12,
            border: `1px solid ${C.border}`, cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            display: "flex", alignItems: "center", gap: 14,
            transition: "transform 0.15s",
          }}
        >
          <div style={{ width: 56, height: 56, borderRadius: 14, background: `${ex.color}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0 }}>
            {ex.icon}
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 4 }}>{ex.name}</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <span style={{ fontSize: 11, color: C.textMuted }}>⏱ {ex.duration}</span>
              <span style={{ fontSize: 11, color: C.textMuted }}>•</span>
              <span style={{ fontSize: 11, color: C.textMuted }}>🔥 {ex.cal} cal</span>
              <span style={{ fontSize: 11, color: C.textMuted }}>•</span>
              <span style={{ fontSize: 11, background: `${ex.color}15`, color: ex.color, borderRadius: 8, padding: "1px 6px", fontWeight: 600 }}>{ex.type}</span>
            </div>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: 18, background: `${C.primary}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icon name="play" size={16} color={C.primary} />
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── Pantalla: Progreso ───────────────────────────────────────────────────────
const ProgressScreen = ({ trackerData, setTrackerData }) => {
  const [weight, setWeight] = useState("");
  const [showWeightInput, setShowWeightInput] = useState(false);

  // TODO: Conectar con backend para guardar y recuperar historial de progreso del usuario

  const addTracker = (key, val, max) => {
    setTrackerData(prev => ({ ...prev, [key]: Math.min(prev[key] + val, max) }));
  };

  const weekDays = ["L", "M", "X", "J", "V", "S", "D"];
  const today = new Date().getDay();

  return (
    <div style={{ padding: "24px 20px", paddingBottom: 100 }}>
      <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text, marginBottom: 4 }}>Mi Progreso 📊</h1>
      <p style={{ fontSize: 13, color: C.textMuted, marginBottom: 24 }}>Monitorea tu camino hacia el bienestar</p>

      {/* Rastreadores */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
        {/* Pasos */}
        <div style={{ background: C.bgCard, borderRadius: 18, padding: "18px", border: `1px solid ${C.border}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: C.textMuted }}>PASOS</p>
            <Icon name="steps" size={18} color={C.primary} />
          </div>
          <p style={{ fontSize: 26, fontWeight: 800, color: C.primary }}>{trackerData.steps.toLocaleString()}</p>
          <p style={{ fontSize: 11, color: C.textMuted, marginBottom: 12 }}>Meta: 8,000</p>
          <div style={{ height: 6, background: C.border, borderRadius: 3, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${Math.min(trackerData.steps / 8000 * 100, 100)}%`, background: C.primary, borderRadius: 3, transition: "width 0.5s" }} />
          </div>
          <button onClick={() => addTracker("steps", 1000, 12000)} style={{ marginTop: 12, width: "100%", padding: "8px", borderRadius: 8, border: `1px solid ${C.primary}`, background: "none", color: C.primary, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
            + 1,000 pasos
          </button>
        </div>

        {/* Agua */}
        <div style={{ background: C.bgCard, borderRadius: 18, padding: "18px", border: `1px solid ${C.border}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: C.textMuted }}>AGUA</p>
            <Icon name="water" size={18} color="#4A7C6F" />
          </div>
          <p style={{ fontSize: 26, fontWeight: 800, color: "#4A7C6F" }}>{trackerData.water} <span style={{ fontSize: 14, fontWeight: 500 }}>vasos</span></p>
          <p style={{ fontSize: 11, color: C.textMuted, marginBottom: 12 }}>Meta: 8 vasos</p>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            {[...Array(8)].map((_, i) => (
              <div key={i} style={{ width: 20, height: 24, borderRadius: 4, background: i < trackerData.water ? "#4A7C6F" : C.border, transition: "background 0.3s" }} />
            ))}
          </div>
          <button onClick={() => addTracker("water", 1, 8)} style={{ marginTop: 12, width: "100%", padding: "8px", borderRadius: 8, border: `1px solid #4A7C6F`, background: "none", color: "#4A7C6F", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
            + 1 vaso
          </button>
        </div>

        {/* Comidas */}
        <div style={{ background: C.bgCard, borderRadius: 18, padding: "18px", border: `1px solid ${C.border}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: C.textMuted }}>COMIDAS</p>
            <span style={{ fontSize: 16 }}>🍽️</span>
          </div>
          <p style={{ fontSize: 26, fontWeight: 800, color: C.accent }}>{trackerData.meals} <span style={{ fontSize: 14, fontWeight: 500 }}>/ 4</span></p>
          <p style={{ fontSize: 11, color: C.textMuted, marginBottom: 12 }}>Del plan seguidas</p>
          <div style={{ display: "flex", gap: 6 }}>
            {["D", "A", "C", "S"].map((m, i) => (
              <div key={i} style={{ flex: 1, height: 32, borderRadius: 8, background: i < trackerData.meals ? C.accent : C.border, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: i < trackerData.meals ? "#FFF" : C.textMuted, fontWeight: 700, transition: "background 0.3s" }}>
                {m}
              </div>
            ))}
          </div>
          <button onClick={() => addTracker("meals", 1, 4)} style={{ marginTop: 12, width: "100%", padding: "8px", borderRadius: 8, border: `1px solid ${C.accent}`, background: "none", color: "#9A7A2A", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
            Marcar comida ✓
          </button>
        </div>

        {/* Peso */}
        <div style={{ background: C.bgCard, borderRadius: 18, padding: "18px", border: `1px solid ${C.border}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: C.textMuted }}>PESO</p>
            <Icon name="weight" size={18} color={C.secondary} />
          </div>
          <p style={{ fontSize: 26, fontWeight: 800, color: C.secondary }}>{trackerData.weight} <span style={{ fontSize: 14, fontWeight: 500 }}>kg</span></p>
          <p style={{ fontSize: 11, color: C.success, marginBottom: 12 }}>▼ 0.5 kg esta semana</p>
          {showWeightInput ? (
            <div style={{ display: "flex", gap: 6 }}>
              <input
                type="number"
                value={weight}
                onChange={e => setWeight(e.target.value)}
                placeholder="Ej: 65.5"
                style={{ flex: 1, padding: "8px", borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 13, color: C.text }}
              />
              <button onClick={() => { if (weight) { setTrackerData(prev => ({ ...prev, weight: parseFloat(weight) })); setShowWeightInput(false); setWeight(""); } }}
                style={{ padding: "8px 10px", borderRadius: 8, border: "none", background: C.secondary, color: "#FFF", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>
                ✓
              </button>
            </div>
          ) : (
            <button onClick={() => setShowWeightInput(true)} style={{ width: "100%", padding: "8px", borderRadius: 8, border: `1px solid ${C.secondary}`, background: "none", color: C.secondary, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
              Registrar peso
            </button>
          )}
        </div>
      </div>

      {/* Semana en vista */}
      <h2 style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 14 }}>Esta semana 📅</h2>
      <div style={{ background: C.bgCard, borderRadius: 18, padding: "20px", border: `1px solid ${C.border}`, marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {weekDays.map((d, i) => {
            const isToday = i === (today === 0 ? 6 : today - 1);
            const isCompleted = i < (today === 0 ? 6 : today - 1);
            return (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <p style={{ fontSize: 11, color: isToday ? C.primary : C.textMuted, fontWeight: isToday ? 700 : 400 }}>{d}</p>
                <div style={{
                  width: 34, height: 34, borderRadius: 17,
                  background: isToday ? `linear-gradient(135deg, ${C.gradStart}, ${C.gradEnd})` : isCompleted ? `${C.success}20` : C.border,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  border: isToday ? "none" : isCompleted ? `1px solid ${C.success}` : "none",
                }}>
                  {isCompleted ? <Icon name="check" size={16} color={C.success} /> : isToday ? <span style={{ fontSize: 14 }}>🌟</span> : null}
                </div>
                <div style={{ width: 6, height: 6, borderRadius: 3, background: isCompleted ? C.success : C.border }} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Ayuno intermitente */}
      <h2 style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 14 }}>Ayuno intermitente ⏰</h2>
      <div style={{ background: C.bgCard, borderRadius: 18, padding: "20px", border: `1px solid ${C.border}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <p style={{ fontSize: 16, fontWeight: 700, color: C.text }}>Ventana 16:8</p>
            <p style={{ fontSize: 13, color: C.textMuted }}>Última comida: 8:00 PM</p>
          </div>
          <div style={{ background: `${C.success}15`, borderRadius: 12, padding: "8px 14px" }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: C.success }}>✅ Activo</p>
          </div>
        </div>
        <div style={{ height: 8, background: C.border, borderRadius: 4, overflow: "hidden" }}>
          <div style={{ height: "100%", width: "62%", background: `linear-gradient(90deg, ${C.success}, #7DCFA0)`, borderRadius: 4 }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
          <p style={{ fontSize: 11, color: C.textMuted }}>Inicio: 8:00 PM</p>
          <p style={{ fontSize: 11, color: C.success, fontWeight: 600 }}>9h 52min restantes</p>
          <p style={{ fontSize: 11, color: C.textMuted }}>Fin: 12:00 PM</p>
        </div>
      </div>
    </div>
  );
};

// ─── Pantalla: Desafíos ───────────────────────────────────────────────────────
const ChallengesScreen = () => {
  const [completedChallenges, setCompletedChallenges] = useState([1]);

  return (
    <div style={{ padding: "24px 20px", paddingBottom: 100 }}>
      <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text, marginBottom: 4 }}>Desafíos 🏆</h1>
      <p style={{ fontSize: 13, color: C.textMuted, marginBottom: 20 }}>Pequeños cambios que generan grandes resultados</p>

      {/* Racha */}
      <div style={{ background: `linear-gradient(135deg, ${C.gradStart}, ${C.gradEnd})`, borderRadius: 20, padding: "20px", marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, marginBottom: 4 }}>Tu racha actual</p>
          <p style={{ color: "#FFF", fontSize: 32, fontWeight: 800 }}>14 días 🔥</p>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>¡Mejor racha de todas!</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, marginBottom: 4 }}>Medallas</p>
          <p style={{ fontSize: 32 }}>🥇🥈🥉</p>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>3 ganadas</p>
        </div>
      </div>

      {/* Lista de desafíos */}
      {challenges.map(ch => {
        const pct = Math.round((ch.completed / ch.days) * 100);
        const isCompleted = completedChallenges.includes(ch.id) || ch.completed === ch.days;
        return (
          <div
            key={ch.id}
            style={{
              background: C.bgCard, borderRadius: 18, padding: "18px", marginBottom: 14,
              border: `1px solid ${isCompleted ? C.success : C.border}`,
              boxShadow: isCompleted ? `0 2px 12px ${C.success}20` : "0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 14 }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: `${ch.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>
                {ch.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                  <p style={{ fontSize: 15, fontWeight: 700, color: C.text, lineHeight: 1.3, flex: 1, paddingRight: 8 }}>{ch.title}</p>
                  {isCompleted && (
                    <div style={{ width: 24, height: 24, borderRadius: 12, background: C.success, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon name="check" size={14} color="#FFF" />
                    </div>
                  )}
                </div>
                <p style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.5 }}>{ch.desc}</p>
              </div>
            </div>

            {/* Barra de progreso */}
            <div style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <p style={{ fontSize: 12, color: C.textMuted }}>{ch.completed} de {ch.days} días</p>
                <p style={{ fontSize: 12, fontWeight: 700, color: ch.color }}>{pct}%</p>
              </div>
              <div style={{ height: 8, background: C.border, borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${pct}%`, background: ch.color, borderRadius: 4, transition: "width 0.6s ease" }} />
              </div>
            </div>

            {/* Recompensa */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 14 }}>🏅</span>
                <p style={{ fontSize: 12, color: C.textMuted }}>{ch.reward}</p>
              </div>
              {!isCompleted && (
                <button
                  onClick={() => {
                    if (ch.completed >= ch.days - 1) setCompletedChallenges(prev => [...prev, ch.id]);
                  }}
                  style={{ padding: "8px 16px", borderRadius: 20, border: "none", background: ch.color, color: "#FFF", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
                >
                  Registrar día
                </button>
              )}
              {isCompleted && (
                <span style={{ fontSize: 12, color: C.success, fontWeight: 700 }}>✨ ¡Completado!</span>
              )}
            </div>
          </div>
        );
      })}

      {/* Próximos desafíos */}
      <h2 style={{ fontSize: 16, fontWeight: 700, color: C.text, margin: "8px 0 14px" }}>Próximamente 🔜</h2>
      {[
        { title: "Baño frío matutino (Wim Hof)", icon: "🧊", days: 7 },
        { title: "Sin pantallas 1 hora antes de dormir", icon: "📵", days: 30 },
      ].map((item, i) => (
        <div key={i} style={{ background: C.bgCard, borderRadius: 16, padding: "16px", marginBottom: 10, border: `1px dashed ${C.border}`, display: "flex", gap: 14, alignItems: "center", opacity: 0.7 }}>
          <span style={{ fontSize: 24 }}>{item.icon}</span>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{item.title}</p>
            <p style={{ fontSize: 12, color: C.textMuted }}>{item.days} días</p>
          </div>
          <Icon name="lock" size={20} color={C.textMuted} />
        </div>
      ))}
    </div>
  );
};

// ─── APP PRINCIPAL ────────────────────────────────────────────────────────────
export default function App() {
  const [hasOnboarded, setHasOnboarded] = useLocalStorage("cortisol_onboarded", false);
  const [userData, setUserData] = useLocalStorage("cortisol_user", null);
  const [showResult, setShowResult] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [trackerData, setTrackerData] = useLocalStorage("cortisol_tracker", {
    steps: 3200,
    water: 3,
    meals: 2,
    weight: 67.5,
  });

  const handleQuizComplete = (data) => {
    setUserData(data);
    setShowResult(true);
  };

  const handleStartApp = () => {
    setHasOnboarded(true);
    setShowResult(false);
  };

  const tabs = [
    { id: "home", label: "Inicio", icon: "home" },
    { id: "plan", label: "Plan", icon: "plan" },
    { id: "exercises", label: "Ejercicios", icon: "exercise" },
    { id: "progress", label: "Progreso", icon: "progress" },
    { id: "challenges", label: "Desafíos", icon: "challenges" },
  ];

  // Estado no onboarded
  if (!hasOnboarded) {
    if (showResult) {
      return (
        <div style={{ maxWidth: 480, margin: "0 auto", fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
          <ResultScreen userData={userData} onStart={handleStartApp} />
        </div>
      );
    }
    return (
      <div style={{ maxWidth: 480, margin: "0 auto", fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
        <QuizScreen onComplete={handleQuizComplete} />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", background: C.bg, minHeight: "100vh", position: "relative" }}>
      {/* Header fijo */}
      <div style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(250,247,242,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${C.border}`,
        padding: "12px 20px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22 }}>🌿</span>
          <div>
            <p style={{ fontSize: 14, fontWeight: 800, color: C.text, lineHeight: 1.1 }}>Cortisol Reset</p>
            <p style={{ fontSize: 10, color: C.textMuted }}>Dra. Camila Restrepo</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ background: `${C.success}15`, borderRadius: 20, padding: "4px 10px", display: "flex", alignItems: "center", gap: 4 }}>
            <Icon name="fire" size={13} color={C.success} />
            <span style={{ fontSize: 12, fontWeight: 700, color: C.success }}>14 días</span>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: 18, background: `linear-gradient(135deg, ${C.gradStart}, ${C.gradEnd})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 16 }}>👤</span>
          </div>
        </div>
      </div>

      {/* Contenido con scroll */}
      <div style={{ overflowY: "auto", height: "calc(100vh - 60px - 68px)", WebkitOverflowScrolling: "touch" }}>
        {activeTab === "home" && <HomeScreen userData={userData} trackerData={trackerData} />}
        {activeTab === "plan" && <PlanScreen />}
        {activeTab === "exercises" && <ExercisesScreen />}
        {activeTab === "progress" && <ProgressScreen trackerData={trackerData} setTrackerData={setTrackerData} />}
        {activeTab === "challenges" && <ChallengesScreen />}
      </div>

      {/* Tab bar fija */}
      <div style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: 480,
        background: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(12px)",
        borderTop: `1px solid ${C.border}`,
        padding: "8px 0 calc(8px + env(safe-area-inset-bottom))",
        display: "flex", justifyContent: "space-around",
        zIndex: 50,
      }}>
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                background: "none", border: "none", cursor: "pointer",
                padding: "4px 8px", borderRadius: 12,
                flex: 1, maxWidth: 72,
                transition: "all 0.2s",
              }}
            >
              <div style={{
                width: 36, height: 28, borderRadius: 14,
                background: isActive ? `${C.primary}15` : "none",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s",
                transform: isActive ? "scale(1.1)" : "scale(1)",
              }}>
                <Icon name={tab.icon} size={20} color={isActive ? C.primary : C.textMuted} />
              </div>
              <span style={{ fontSize: 10, fontWeight: isActive ? 700 : 400, color: isActive ? C.primary : C.textMuted, letterSpacing: 0.2 }}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}