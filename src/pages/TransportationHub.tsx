import { Bus, Phone, ExternalLink, MapPin, Clock } from "lucide-react";

const transportOptions = [
  {
    title: "London Transit Commission (LTC)",
    desc: "Fixed-route bus service across London, ON",
    address: "450 Highbury Ave N, London, ON N5H 1G7",
    phone: "519-451-1347",
    hours: "Mon–Fri 8am–5pm (Customer Service)",
    links: [
      { label: "Trip Planner", url: "https://www.londontransit.ca/trip-planner/" },
      { label: "Route Map", url: "https://www.londontransit.ca/routes-and-schedules/" },
    ],
    color: "bg-navy",
    emoji: "🚌",
  },
  {
    title: "LTC Specialized Transit",
    desc: "Paratransit for individuals with disabilities who cannot use regular buses",
    address: "450 Highbury Ave N, London, ON N5H 1G7",
    phone: "519-453-3444",
    hours: "Mon–Fri 8am–4:30pm (Bookings)",
    links: [
      { label: "Eligibility Info", url: "https://www.londontransit.ca/specialized-transit/" },
    ],
    color: "bg-sage-dark",
    emoji: "♿",
  },
];

const rideApps = [
  { name: "Uber", url: "https://www.uber.com/", icon: "🚗", desc: "On-demand ride-hailing" },
  { name: "Lyft", url: "https://www.lyft.com/", icon: "🟣", desc: "Ride-hailing service" },
  { name: "London Taxi", url: "tel:5194343377", icon: "🟡", desc: "Local taxi — 519-434-3377" },
  { name: "Metro Cabs", url: "tel:5196799999", icon: "🚖", desc: "Local taxi — 519-679-9999" },
];

const TransportationHub = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 pt-8 pb-6 md:max-w-4xl animate-float-up">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-sage-dark rounded-2xl flex items-center justify-center">
          <Bus className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-semibold text-navy">Transportation Hub</h1>
          <p className="text-xs text-navy/50">Getting around London, Ontario</p>
        </div>
      </div>

      {/* Transit services */}
      <div className="space-y-4 mb-6">
        {transportOptions.map((opt) => (
          <div key={opt.title} className="bg-white rounded-hub shadow-card p-5 border border-sage/10">
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 ${opt.color} rounded-2xl flex items-center justify-center text-lg flex-shrink-0`}>
                {opt.emoji}
              </div>
              <div className="flex-1">
                <h3 className="font-display font-semibold text-navy text-base">{opt.title}</h3>
                <p className="text-sm text-navy/60 mt-1 leading-relaxed">{opt.desc}</p>
                <div className="mt-3 space-y-1">
                  <div className="flex items-center gap-2 text-xs text-navy/50">
                    <MapPin className="w-3 h-3 text-sage" />
                    <span>{opt.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-navy/50">
                    <Phone className="w-3 h-3 text-sage" />
                    <a href={`tel:${opt.phone}`} className="hover:text-coral">{opt.phone}</a>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-navy/50">
                    <Clock className="w-3 h-3 text-sage" />
                    <span>{opt.hours}</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4 flex-wrap">
                  <a
                    href={`tel:${opt.phone}`}
                    className="flex items-center gap-1.5 bg-navy text-white px-4 py-2 rounded-full text-xs font-semibold hover:bg-navy-light transition-colors"
                  >
                    <Phone className="w-3 h-3" />
                    Call
                  </a>
                  {opt.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 bg-sage-light text-sage-dark px-4 py-2 rounded-full text-xs font-semibold hover:bg-sage hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ride Apps */}
      <h2 className="font-display text-lg font-semibold text-navy mb-3">Ride-Hailing & Taxis</h2>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {rideApps.map((app) => (
          <a
            key={app.name}
            href={app.url}
            target={app.url.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="bg-white rounded-hub shadow-card p-4 border border-sage/10 hover:shadow-elevated transition-all hover:scale-[1.02] flex flex-col gap-2"
          >
            <span className="text-2xl">{app.icon}</span>
            <p className="font-display font-semibold text-navy text-sm">{app.name}</p>
            <p className="text-xs text-navy/50">{app.desc}</p>
          </a>
        ))}
      </div>

      {/* LTC real-time info */}
      <div className="bg-navy rounded-hub p-5 text-white">
        <div className="flex items-center gap-2 mb-2">
          <Bus className="w-5 h-5 text-sage-light" />
          <h3 className="font-display font-semibold">LTC Real-Time Info</h3>
        </div>
        <p className="text-sm text-white/70 mb-4">Track buses live and plan your trip with the official LTC tools.</p>
        <div className="flex gap-3 flex-wrap">
          <a
            href="https://www.londontransit.ca/real-time-information/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-sage text-white px-4 py-2 rounded-full text-xs font-semibold hover:bg-sage-dark transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            Real-Time Tracking
          </a>
          <a
            href="https://www.londontransit.ca/trip-planner/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white/15 text-white px-4 py-2 rounded-full text-xs font-semibold hover:bg-white/25 transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            Trip Planner
          </a>
        </div>
      </div>
    </div>
  );
};

export default TransportationHub;
