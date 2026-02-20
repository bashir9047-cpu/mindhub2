import { useState, useEffect, useRef } from "react";
import { Wind, Play, Pause, Youtube } from "lucide-react";

const breathePhases = [
  { label: "Inhale", duration: 4000, scale: 1.15 },
  { label: "Hold", duration: 2000, scale: 1.15 },
  { label: "Exhale", duration: 6000, scale: 0.85 },
  { label: "Hold", duration: 2000, scale: 0.85 },
];

const meditations = [
  { title: "5-Minute Body Scan", duration: "5 min", emoji: "🧘", desc: "Release tension from head to toe" },
  { title: "Morning Grounding", duration: "7 min", emoji: "🌅", desc: "Start your day with intention" },
  { title: "Anxiety Relief", duration: "10 min", emoji: "💙", desc: "Calming breath for anxious moments" },
  { title: "Deep Sleep Prep", duration: "15 min", emoji: "🌙", desc: "Wind down for restful sleep" },
];

const videos = [
  {
    title: "Breathing for Anxiety",
    channel: "Headspace",
    thumb: "https://img.youtube.com/vi/odADwWzHR24/mqdefault.jpg",
    url: "https://www.youtube.com/watch?v=odADwWzHR24",
  },
  {
    title: "5-Minute Mindfulness",
    channel: "Calm",
    thumb: "https://img.youtube.com/vi/inpok4MKVLM/mqdefault.jpg",
    url: "https://www.youtube.com/watch?v=inpok4MKVLM",
  },
  {
    title: "Progressive Muscle Relaxation",
    channel: "Wellness Works",
    thumb: "https://img.youtube.com/vi/1nZEdqcGVzo/mqdefault.jpg",
    url: "https://www.youtube.com/watch?v=1nZEdqcGVzo",
  },
];

const MindfulnessHub = () => {
  const [isBreathing, setIsBreathing] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [countdown, setCountdown] = useState(4);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const phaseRef = useRef(0);
  const elapsedRef = useRef(0);

  useEffect(() => {
    if (!isBreathing) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setPhaseIndex(0);
      setCountdown(breathePhases[0].duration / 1000);
      setElapsed(0);
      phaseRef.current = 0;
      elapsedRef.current = 0;
      return;
    }

    intervalRef.current = setInterval(() => {
      elapsedRef.current += 100;
      const phase = breathePhases[phaseRef.current];
      const remaining = Math.ceil((phase.duration - elapsedRef.current) / 1000);
      setCountdown(remaining);

      if (elapsedRef.current >= phase.duration) {
        elapsedRef.current = 0;
        phaseRef.current = (phaseRef.current + 1) % breathePhases.length;
        setPhaseIndex(phaseRef.current);
        setCountdown(breathePhases[phaseRef.current].duration / 1000);
      }
    }, 100);

    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isBreathing]);

  const currentPhase = breathePhases[phaseIndex];
  const circleScale = isBreathing ? currentPhase.scale : 1;

  return (
    <div className="max-w-2xl mx-auto px-4 pt-8 pb-6 md:max-w-4xl animate-float-up">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-coral rounded-2xl flex items-center justify-center">
          <Wind className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-semibold text-navy">Mindfulness Hub</h1>
          <p className="text-xs text-navy/50">Breathe, meditate, restore</p>
        </div>
      </div>

      {/* Breathing Circle */}
      <div className="bg-white rounded-hub shadow-card p-8 mb-6 border border-sage/10 text-center">
        <h2 className="font-display text-lg font-semibold text-navy mb-6">Breathing Exercise</h2>

        {/* Circle */}
        <div className="relative flex items-center justify-center h-52 mb-6">
          {/* Outer ring */}
          <div
            className="absolute w-44 h-44 rounded-full border-2 border-sage/40 transition-transform duration-[4000ms] ease-in-out"
            style={{
              transform: `scale(${isBreathing ? circleScale * 1.15 : 1})`,
              opacity: isBreathing ? 0.5 : 0.2,
            }}
          />
          {/* Middle ring */}
          <div
            className="absolute w-36 h-36 rounded-full bg-sage/15 border border-sage/30 transition-transform duration-[4000ms] ease-in-out"
            style={{
              transform: `scale(${isBreathing ? circleScale * 1.05 : 1})`,
            }}
          />
          {/* Core */}
          <div
            className="w-28 h-28 rounded-full bg-sage flex flex-col items-center justify-center text-white transition-transform duration-[4000ms] ease-in-out shadow-card"
            style={{
              transform: `scale(${isBreathing ? circleScale : 1})`,
            }}
          >
            <span className="font-display font-semibold text-base leading-tight">
              {isBreathing ? currentPhase.label : "Ready"}
            </span>
            {isBreathing && (
              <span className="text-3xl font-bold font-display">{countdown}</span>
            )}
          </div>
        </div>

        <p className="text-sm text-navy/50 mb-5">
          {isBreathing
            ? "Follow the circle — let your breath guide you"
            : "4-7-8 breathing technique. Press start when ready."}
        </p>

        <button
          onClick={() => setIsBreathing(!isBreathing)}
          className={`flex items-center gap-2 mx-auto px-8 py-3 rounded-full font-semibold transition-all ${
            isBreathing
              ? "bg-coral text-white hover:bg-coral-dark"
              : "bg-navy text-white hover:bg-navy-light"
          } shadow-card hover:scale-105`}
        >
          {isBreathing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isBreathing ? "Pause" : "Start Breathing"}
        </button>
      </div>

      {/* Meditations */}
      <h2 className="font-display text-lg font-semibold text-navy mb-3">Guided Meditations</h2>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {meditations.map((m) => (
          <button
            key={m.title}
            className="bg-white rounded-hub shadow-card p-4 text-left border border-sage/10 hover:shadow-elevated hover:scale-[1.02] transition-all"
          >
            <span className="text-2xl">{m.emoji}</span>
            <p className="font-display font-semibold text-navy text-sm mt-2">{m.title}</p>
            <p className="text-xs text-navy/50 mt-0.5">{m.desc}</p>
            <div className="flex items-center justify-between mt-3">
              <span className="text-[10px] bg-sage-light text-sage-dark px-2 py-0.5 rounded-full">{m.duration}</span>
              <Play className="w-3 h-3 text-sage" />
            </div>
          </button>
        ))}
      </div>

      {/* Video Gallery */}
      <h2 className="font-display text-lg font-semibold text-navy mb-3">
        <span className="flex items-center gap-2">
          <Youtube className="w-5 h-5 text-coral" />
          Wellness Videos
        </span>
      </h2>
      <div className="space-y-3">
        {videos.map((v) => (
          <a
            key={v.title}
            href={v.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white rounded-hub shadow-card p-3 border border-sage/10 hover:shadow-elevated transition-all hover:scale-[1.01]"
          >
            <img
              src={v.thumb}
              alt={v.title}
              className="w-20 h-14 object-cover rounded-xl flex-shrink-0"
            />
            <div>
              <p className="font-display font-semibold text-navy text-sm">{v.title}</p>
              <p className="text-xs text-navy/40 mt-0.5">{v.channel}</p>
              <div className="flex items-center gap-1 mt-1.5 text-coral">
                <Youtube className="w-3 h-3" />
                <span className="text-[10px] font-medium">Watch on YouTube</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default MindfulnessHub;
