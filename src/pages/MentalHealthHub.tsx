import { useEffect, useState } from "react";
import { Heart, Phone, MapPin, Clock, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Resource {
  id: string;
  name: string;
  address: string | null;
  phone: string | null;
  hours: string | null;
  description: string | null;
  tags: string[] | null;
}

const MentalHealthHub = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("resources")
      .select("*")
      .eq("category", "mental_health")
      .then(({ data }) => {
        if (data) setResources(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 pt-8 pb-6 md:max-w-4xl animate-float-up">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-sage rounded-2xl flex items-center justify-center">
          <Heart className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-semibold text-navy">Mental Health Hub</h1>
          <p className="text-xs text-navy/50">London, Ontario resources</p>
        </div>
      </div>

      {/* Crisis callout */}
      <div className="mt-4 mb-6 bg-coral rounded-hub p-4 text-white">
        <p className="font-display font-semibold text-base">In immediate crisis?</p>
        <p className="text-sm opacity-90 mb-3">Call 988 (Suicide & Crisis Lifeline) or visit the CMHA London Crisis Centre at 648 Huron St — open 24/7.</p>
        <a href="tel:988" className="inline-flex items-center gap-2 bg-white text-coral font-semibold px-4 py-2 rounded-full text-sm hover:scale-105 transition-transform">
          <Phone className="w-4 h-4" />
          Call 988 Now
        </a>
      </div>

      {/* Resources */}
      <h2 className="font-display text-lg font-semibold text-navy mb-3">Local Services</h2>
      <div className="space-y-3 mb-6">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-hub shadow-card p-5 animate-pulse h-32" />
          ))
        ) : (
          resources.map((r) => (
            <div key={r.id} className="bg-white rounded-hub shadow-card p-5 border border-sage/10">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display font-semibold text-navy text-base leading-tight">{r.name}</h3>
                {r.phone && (
                  <a href={`tel:${r.phone}`} className="flex-shrink-0 flex items-center gap-1.5 bg-sage text-white px-3 py-1.5 rounded-full text-xs font-medium hover:bg-sage-dark transition-colors">
                    <Phone className="w-3 h-3" />
                    Call
                  </a>
                )}
              </div>
              {r.description && <p className="text-sm text-navy/60 mt-2 leading-relaxed">{r.description}</p>}
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
                    <span key={tag} className="text-[10px] bg-sage-light text-sage-dark px-2 py-0.5 rounded-full font-medium capitalize">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Map placeholder */}
      <div className="bg-white rounded-hub shadow-card overflow-hidden border border-sage/10">
        <div className="p-4 border-b border-border">
          <h2 className="font-display font-semibold text-navy flex items-center gap-2">
            <MapPin className="w-4 h-4 text-coral" />
            Therapists Near Me
          </h2>
          <p className="text-xs text-navy/50 mt-0.5">London, Ontario</p>
        </div>
        <div className="relative bg-sage-light h-52 flex flex-col items-center justify-center gap-3">
          <div className="w-12 h-12 bg-sage rounded-full flex items-center justify-center">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <p className="text-navy/60 text-sm font-medium">Interactive Map</p>
          <p className="text-navy/40 text-xs px-8 text-center">Showing mental health providers within 10km of London, ON</p>
          <a
            href="https://www.google.com/maps/search/therapist+near+London+Ontario"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-navy text-white px-4 py-2 rounded-full text-xs font-semibold hover:scale-105 transition-transform"
          >
            <ExternalLink className="w-3 h-3" />
            Open in Google Maps
          </a>
        </div>
      </div>

      {/* Help line grid */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <a href="tel:988" className="bg-coral/10 border border-coral/30 rounded-hub p-4 text-center hover:bg-coral/20 transition-colors">
          <p className="font-display font-bold text-coral text-2xl">988</p>
          <p className="text-xs text-navy font-medium">Suicide & Crisis Lifeline</p>
        </a>
        <a href="tel:5194349191" className="bg-sage-light border border-sage/30 rounded-hub p-4 text-center hover:bg-sage/20 transition-colors">
          <p className="font-display font-bold text-sage-dark text-xl">519-434-9191</p>
          <p className="text-xs text-navy font-medium">CMHA London Crisis</p>
        </a>
      </div>
    </div>
  );
};

export default MentalHealthHub;
