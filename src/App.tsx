import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import MentalHealthHub from "./pages/MentalHealthHub";
import BasicNeedsHub from "./pages/BasicNeedsHub";
import TransportationHub from "./pages/TransportationHub";
import MindfulnessHub from "./pages/MindfulnessHub";
import CommunityHub from "./pages/CommunityHub";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="mental-health" element={<MentalHealthHub />} />
            <Route path="basic-needs" element={<BasicNeedsHub />} />
            <Route path="transportation" element={<TransportationHub />} />
            <Route path="mindfulness" element={<MindfulnessHub />} />
            <Route path="community" element={<CommunityHub />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
