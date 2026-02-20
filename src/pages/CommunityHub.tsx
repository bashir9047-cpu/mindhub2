import { useEffect, useState } from "react";
import { Users, BookOpen, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import MoodChart from "@/components/MoodChart";

interface Post {
  id: string;
  author_name: string;
  message: string;
  created_at: string;
}

interface MoodLog {
  id: string;
  mood_score: number;
  mood_emoji: string | null;
  created_at: string;
}

const CommunityHub = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [moodLogs, setMoodLogs] = useState<MoodLog[]>([]);
  const [tab, setTab] = useState<"forum" | "journal">("forum");
  const [loading, setLoading] = useState(true);

  const sessionId = (() => {
    let id = localStorage.getItem("mindhub_session");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("mindhub_session", id);
    }
    return id;
  })();

  useEffect(() => {
    if (tab === "forum") {
      supabase
        .from("community_posts")
        .select("*")
        .order("created_at", { ascending: false })
        .then(({ data }) => {
          if (data) setPosts(data);
          setLoading(false);
        });
    } else {
      supabase
        .from("user_mood_logs")
        .select("*")
        .eq("session_id", sessionId)
        .order("created_at", { ascending: true })
        .then(({ data }) => {
          if (data) setMoodLogs(data);
          setLoading(false);
        });
    }
  }, [tab]);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-CA", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });

  return (
    <div className="max-w-2xl mx-auto px-4 pt-8 pb-6 md:max-w-4xl animate-float-up">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-sage rounded-2xl flex items-center justify-center">
          <Users className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-semibold text-navy">Community & Journal</h1>
          <p className="text-xs text-navy/50">Stories, support & your mood history</p>
        </div>
      </div>

      {/* Tab switcher */}
      <div className="flex gap-1 bg-muted p-1 rounded-2xl mb-6">
        <button
          onClick={() => { setTab("forum"); setLoading(true); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            tab === "forum" ? "bg-white text-navy shadow-card" : "text-navy/50 hover:text-navy"
          }`}
        >
          <Users className="w-4 h-4" />
          Community Forum
        </button>
        <button
          onClick={() => { setTab("journal"); setLoading(true); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            tab === "journal" ? "bg-white text-navy shadow-card" : "text-navy/50 hover:text-navy"
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          Mood Journal
        </button>
      </div>

      {/* Forum Tab */}
      {tab === "forum" && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-sage rounded-full animate-pulse" />
            <p className="text-xs text-navy/50">Read-only community feed — real voices from Londoners</p>
          </div>
          <div className="space-y-3">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-hub shadow-card p-5 animate-pulse h-24" />
              ))
            ) : (
              posts.map((post) => (
                <div key={post.id} className="bg-white rounded-hub shadow-card p-5 border border-sage/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-sage-light rounded-full flex items-center justify-center">
                      <span className="text-sage-dark font-display font-bold text-sm">
                        {post.author_name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-navy">{post.author_name}</p>
                      <p className="text-[10px] text-navy/40">{formatDate(post.created_at)}</p>
                    </div>
                  </div>
                  <p className="text-sm text-navy/70 leading-relaxed">{post.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Journal Tab */}
      {tab === "journal" && (
        <div>
          {loading ? (
            <div className="bg-white rounded-hub shadow-card p-5 animate-pulse h-48" />
          ) : moodLogs.length === 0 ? (
            <div className="text-center py-16 text-navy/40">
              <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-display font-semibold text-navy/50">No mood logs yet</p>
              <p className="text-sm mt-1">Check in from the Home tab to start your journal.</p>
            </div>
          ) : (
            <>
              <MoodChart logs={moodLogs} />
              <div className="mt-4 space-y-2">
                <h3 className="font-display font-semibold text-navy text-base">Check-in History</h3>
                {[...moodLogs].reverse().map((log) => (
                  <div key={log.id} className="flex items-center gap-3 bg-white rounded-2xl shadow-card px-4 py-3 border border-sage/10">
                    <span className="text-2xl">{log.mood_emoji || "😐"}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full ${i < log.mood_score ? "bg-sage" : "bg-muted"}`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-navy/50">Score: {log.mood_score}/5</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-navy/40">{formatDate(log.created_at)}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CommunityHub;
