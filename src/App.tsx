import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from './pages/Index';
import Onboarding from './pages/Onboarding';
import DailyLog from './pages/DailyLog';
import Trends from './pages/Trends';
import Alerts from './pages/Alerts';
import Profile from './pages/Profile';
import Recommendations from './pages/Recommendations';
import NotFound from './pages/NotFound';
import BottomNav from './components/BottomNav';
import Signup from './pages/Auth/Signup';
import Login from './pages/Auth/Login';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public / Landing routes */}
          <Route path="/" element={<><Index /><BottomNav /></>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/onboarding" element={<Onboarding />} />

          {/* Protected / Logged-in routes */}
          <Route path="/daily-log" element={<><DailyLog /><BottomNav /></>} />
          <Route path="/trends" element={<><Trends /><BottomNav /></>} />
          <Route path="/alerts" element={<><Alerts /><BottomNav /></>} />
          <Route path="/recommendations" element={<><Recommendations /><BottomNav /></>} />
          <Route path="/profile" element={<><Profile /><BottomNav /></>} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;