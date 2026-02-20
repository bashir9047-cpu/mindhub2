import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Bus, Wind, Users, Smile, Meh, Frown, Angry, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import MindHubCard from "@/components/MindHubCard";
import BreathingCard from "@/components/ui/BreathingCard";

const moods = [
  { score: 5, emoji: "😄", label: "Great", icon: Star },
  { score: 4, emoji: "🙂", label: "Good", icon: Smile },
  { score: 3, emoji: "😐", label: "Okay", icon: Meh },
  { score: 2, emoji: "😔", label: "Low", icon: Frown },
  { score: 1, emoji: "😢", label: "Hard", icon: Angry },
];

const hubs = [
  {
    to: "/mental-health",
    label: "Mental Health",
    desc: "Crisis support, therapy & counselling",
    icon: Heart,
    color: "bg-sage text-white",
    accent: "sage",
  },
  {
    to: "/basic-needs",
    label: "Basic Needs",
    desc: "Food banks, shelters & essential aid",
    icon: ShoppingBag,
    color: "bg-navy text-white",
    accent: "navy",
  },
  {
    to: "/transportation",
    label: "Transportation",
    desc: "LTC routes, paratransit & ride apps",
    icon: Bus,
    color: "bg-sage-dark text-white",
    accent: "sage-dark",
  },
  {
    to: "/mindfulness",
    label: "Mindfulness",
    desc: "Breathing, guided meditations & calm",
    icon: Wind,
    color: "bg-coral text-white",
    accent: "coral",
  },
];

const getSessionId = () => {
  let id = localStorage.getItem("mindhub_session");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("mindhub_session", id);
  }
  return id;
};

const Home = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [moodSaved, setMoodSaved] = useState(false);
  const [todayMood, setTodayMood] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const checkTodayMood = async () => {
      const sessionId = getSessionId();
      const today = new Date().toISOString().split("T")[0];
      const { data } = await supabase
        .from("user_mood_logs")
        .select("mood_score")
        .eq("session_id", sessionId)
        .gte("created_at", `${today}T00:00:00`)
        .order("created_at", { ascending: false })
        .limit(1);
      if (data && data.length > 0) {
        setTodayMood(data[0].mood_score);
        setSelectedMood(data[0].mood_score);
        setMoodSaved(true);
      }
    };
    checkTodayMood();
  }, []);

  const handleMoodSelect = async (score: number) => {
    setSelectedMood(score);
    const mood = moods.find((m) => m.score === score);
    const sessionId = getSessionId();
    const { error } = await supabase.from("user_mood_logs").insert({
      session_id: sessionId,
      mood_score: score,
      mood_emoji: mood?.emoji,
    });
    if (!error) {
      setMoodSaved(true);
      toast({ title: "Mood logged!", description: `Feeling ${mood?.label} today. 💙` });
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 pt-8 pb-6 md:max-w-5xl animate-float-up">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-full bg-sage flex items-center justify-center">
            <Wind className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-medium text-slate-300 tracking-widest uppercase">MindHub</span>
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-white leading-tight">
          London, Ontario's<br />
          <span className="text-cyan-400">Wellness Companion</span>
        </h1>
        <p className="mt-2 text-slate-400 text-sm md:text-base">
          Crisis support, local resources, and daily wellness — all in one place.
        </p>
      </div>

      {/* Breathing & Insight Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <BreathingCard />
        <div className="glass-card p-8 flex flex-col justify-center">
          <h3 className="text-lg font-light tracking-wider mb-4 text-white">DAILY INSIGHT</h3>
          <p className="text-white/70 italic text-lg leading-relaxed">"The rain outside is a reminder that even nature needs to wash away the old to make room for the new."</p>
          <div className="mt-6 h-1 w-20 bg-cyan-500/30 rounded-full"></div>
        </div>
      </div>

      {/* Daily Check-in */}
      <div className="glass-card p-6 mb-8 border-white/10">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-display text-lg font-semibold text-white">Daily Check-in</h2>
            <p className="text-xs text-white/50">{new Date().toLocaleDateString("en-CA", { weekday: "long", month: "long", day: "numeric" })}</p>
          </div>
          {moodSaved && (
            <span className="text-xs bg-sage-light text-sage-dark px-3 py-1 rounded-full font-medium">✓ Logged</span>
          )}
        </div>
        <p className="text-sm text-white/60 mb-4">How are you feeling right now?</p>
        <div className="flex items-center justify-between gap-2">
          {moods.map((mood) => (
            <button
              key={mood.score}
              onClick={() => !moodSaved && handleMoodSelect(mood.score)}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all flex-1 ${
                selectedMood === mood.score 
                  ? "bg-cyan-500/20 text-white scale-105 border border-cyan-500/50" 
                  : "hover:bg-white/5 text-white/70"
              } ${moodSaved ? "cursor-default" : "cursor-pointer"}`}
              title={mood.label}
            >
              <span className="text-2xl">{mood.emoji}</span>
              <span className="text-[10px] font-medium">{mood.label}</span>
            </button>
          ))}
        </div>
        {moodSaved && (
          <p className="text-center text-xs text-white/40 mt-3">Come back tomorrow to check in again 🌿</p>
        )}
      </div>

      {/* 4 Hub Grid */}
      <div className="mb-6">
        <h2 className="font-display text-xl font-semibold text-white mb-4">Your Hubs</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {hubs.map((hub) => (
            <MindHubCard
              key={hub.to}
              title={hub.label}
              description={hub.desc}
              icon={hub.icon}
              to={hub.to}
            />
          ))}
        </div>
      </div>

      {/* Community shortcut */}
      <Link
        to="/community"
        className="flex items-center justify-between glass-card px-5 py-4 border-white/10 hover:bg-white/10 transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center">
            <Users className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <p className="font-display font-semibold text-white text-sm">Community & Journal</p>
            <p className="text-xs text-white/50">Forum posts & mood history</p>
          </div>
        </div>
        <span className="text-white/30 text-lg">→</span>
      </Link>

      {/* Crisis Banner */}
      <div className="mt-6 bg-coral/20 border border-coral/30 rounded-hub p-4 flex items-center gap-3">
        <span className="text-2xl">🆘</span>
        <div>
          <p className="font-semibold text-white text-sm">Need immediate help?</p>
          <p className="text-xs text-white/70">
            Tap the <span className="text-coral font-semibold">988 CRISIS</span> button anytime — London crisis line available 24/7.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
