import React, { useEffect, useState } from 'react';
import Parser from 'rss-parser';

const parser = new Parser();

const PsychologyFeed = () => {
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    // We use a CORS proxy because Psychology Today blocks direct browser requests
    const fetchFeed = async () => {
      try {
        const feed = await parser.parseURL('https://cors-anywhere.herokuapp.com/https://www.psychologytoday.com/us/feed');
        setArticles(feed.items.slice(0, 3)); // Top 3 articles
      } catch (err) {
        console.error("RSS Error:", err);
      }
    };
    fetchFeed();
  }, []);

  return (
    <div className="mt-12">
      <h2 className="text-sm font-bold tracking-[0.3em] uppercase mb-6 text-cyan-400">Essential Reads</h2>
      <div className="space-y-4">
        {articles.map((item, i) => (
          <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className="glass-card p-6 block hover:bg-white/10 transition-all group">
            <h4 className="text-lg font-medium group-hover:text-cyan-300 transition-colors leading-snug">{item.title}</h4>
            <p className="text-sm text-white/40 mt-2 line-clamp-2">{item.contentSnippet}</p>
            <div className="mt-4 text-[10px] text-cyan-500 font-bold uppercase tracking-widest">Read Article →</div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default PsychologyFeed;