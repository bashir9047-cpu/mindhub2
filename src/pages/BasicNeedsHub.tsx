import { useEffect, useState } from "react";
import { ShoppingBag, Phone, MapPin, Clock, Filter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Resource {
  id: string;
  name: string;
  category: string;
  address: string | null;
  phone: string | null;
  hours: string | null;
  description: string | null;
  tags: string[] | null;
}

type FilterType = "all" | "food" | "shelter" | "women_only";

const filters: { value: FilterType; label: string; emoji: string }[] = [
  { value: "all", label: "All", emoji: "🌿" },
  { value: "food", label: "Food", emoji: "🥫" },
  { value: "shelter", label: "Shelter", emoji: "🏠" },
  { value: "women_only", label: "Women-Only", emoji: "💜" },
];

const categoryColors: Record<string, string> = {
  food: "bg-amber-50 border-amber-200",
  shelter: "bg-blue-50 border-blue-200",
  women_only: "bg-purple-50 border-purple-200",
};

const categoryBadge: Record<string, string> = {
  food: "bg-amber-100 text-amber-700",
  shelter: "bg-blue-100 text-blue-700",
  women_only: "bg-purple-100 text-purple-700",
};

const BasicNeedsHub = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const categories =
      filter === "all" ? ["food", "shelter", "women_only"] : [filter];
    supabase
      .from("resources")
      .select("*")
      .in("category", categories)
      .then(({ data }) => {
        if (data) setResources(data);
        setLoading(false);
      });
  }, [filter]);

  return (
    <div className="max-w-2xl mx-auto px-4 pt-8 pb-6 md:max-w-4xl animate-float-up">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-navy rounded-2xl flex items-center justify-center">
          <ShoppingBag className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-semibold text-navy">Basic Needs Hub</h1>
          <p className="text-xs text-navy/50">Food, shelter & essential services in London, ON</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => { setFilter(f.value); setLoading(true); }}
            className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === f.value
                ? "bg-navy text-white shadow-card"
                : "bg-white text-navy/60 border border-border hover:border-sage"
            }`}
          >
            <span>{f.emoji}</span>
            {f.label}
          </button>
        ))}
      </div>

      {/* Resources */}
      <div className="space-y-3">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-hub shadow-card p-5 animate-pulse h-36" />
          ))
        ) : resources.length === 0 ? (
          <div className="text-center py-12 text-navy/40">
            <ShoppingBag className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p>No resources found for this filter.</p>
          </div>
        ) : (
          resources.map((r) => (
            <div
              key={r.id}
              className={`rounded-hub shadow-card p-5 border ${categoryColors[r.category] || "bg-white border-sage/10"}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display font-semibold text-navy text-base leading-tight">{r.name}</h3>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold capitalize ${categoryBadge[r.category] || "bg-sage-light text-sage-dark"}`}>
                      {r.category === "women_only" ? "Women-Only" : r.category}
                    </span>
                  </div>
                  {r.description && (
                    <p className="text-sm text-navy/60 leading-relaxed">{r.description}</p>
                  )}
                </div>
                {r.phone && (
                  <a
                    href={`tel:${r.phone}`}
                    className="flex-shrink-0 flex items-center gap-1.5 bg-navy text-white px-3 py-1.5 rounded-full text-xs font-medium hover:bg-navy-light transition-colors"
                  >
                    <Phone className="w-3 h-3" />
                    Call
                  </a>
                )}
              </div>
              <div className="mt-3 space-y-1">
                {r.address && (
                  <div className="flex items-center gap-2 text-xs text-navy/50">
                    <MapPin className="w-3 h-3 text-sage" />
                    <span>{r.address}</span>
                  </div>
                )}
                {r.phone && (
                  <div className="flex items-center gap-2 text-xs text-navy/50">
                    <Phone className="w-3 h-3 text-sage" />
                    <a href={`tel:${r.phone}`} className="hover:text-coral">{r.phone}</a>
                  </div>
                )}
                {r.hours && (
                  <div className="flex items-center gap-2 text-xs text-navy/50">
                    <Clock className="w-3 h-3 text-sage" />
                    <span>{r.hours}</span>
                  </div>
                )}
              </div>
              {r.tags && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {r.tags.map((tag) => (
                    <span key={tag} className="text-[10px] bg-white/70 text-navy/50 px-2 py-0.5 rounded-full border border-border capitalize">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Emergency note */}
      <div className="mt-6 bg-coral/10 border border-coral/30 rounded-hub p-4">
        <p className="font-semibold text-navy text-sm mb-1">🚨 Emergency Housing</p>
        <p className="text-xs text-navy/60">If you need immediate shelter tonight, contact the Unity Project (519-433-8700) or Salvation Army Centre of Hope (519-661-0343). Both are open 24/7.</p>
      </div>
    </div>
  );
};

export default BasicNeedsHub;
