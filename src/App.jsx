import React, { useState, useEffect } from 'react';
import Scene from './canvas/Scene';
import Navigation from './components/Navigation';
import DepthIndicator from './components/DepthIndicator';
import ScrollOverlays from './components/ScrollOverlays';
import EventRulesModal from './components/EventRulesModal';
import RealmQuickNav from './components/RealmQuickNav';
import RegistrationModal from './components/RegistrationModal';
import LoadingScreen from './components/LoadingScreen';
import RuneCursorTrail from './components/RuneCursorTrail';
import TimelineRail from './components/TimelineRail';
import SubmergedVignetteHUD from './components/SubmergedVignetteHUD';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [depthMeters, setDepthMeters] = useState(0);
  const [activeRealmIndex, setActiveRealmIndex] = useState(0);

  const [activeRulesEvent, setActiveRulesEvent] = useState(null);
  const [isQuickNavOpen, setIsQuickNavOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [registerEvent, setRegisterEvent] = useState(null);

  // Smooth window scroll progress listener
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(1, Math.max(0, window.scrollY / totalHeight));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToDepthProgress = (targetProgress) => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: targetProgress * totalHeight,
      behavior: 'smooth'
    });
  };

  const handleOpenRegister = (eventItem = null) => {
    setRegisterEvent(eventItem);
    setIsRegisterOpen(true);
  };

  return (
    <main className="relative min-h-screen bg-[#031521] text-[#e8f9ff]">
      {/* 1. Interactive Bioluminescent Plasma Cursor Trail */}
      <RuneCursorTrail />

      {/* 2. Real-World Underwater Diving Visor & Water Refraction Vignette */}
      <SubmergedVignetteHUD />

      {/* 3. Preloader Screen */}
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <>
          {/* 4. Fixed 3D Canvas Background */}
          <Scene
            scrollProgress={scrollProgress}
            onUpdateDepth={(depth, realmIdx) => {
              setDepthMeters(depth);
              setActiveRealmIndex(realmIdx);
            }}
            onOpenRegister={handleOpenRegister}
          />

          {/* 5. Header Navigation */}
          <Navigation
            isMuted={isMuted}
            setIsMuted={setIsMuted}
            onOpenQuickNav={() => setIsQuickNavOpen(true)}
            onOpenRegister={() => handleOpenRegister(null)}
          />

          {/* 6. Submerged Depth Indicator Gauge */}
          <DepthIndicator
            depthMeters={depthMeters}
            activeRealmIndex={activeRealmIndex}
          />

          {/* 7. Vertical Floating Timeline Rail */}
          <TimelineRail
            scrollProgress={scrollProgress}
            onScrollToDepthProgress={handleScrollToDepthProgress}
          />

          {/* 8. Clean Scrollable Content Overlays */}
          <ScrollOverlays
            scrollProgress={scrollProgress}
            onOpenRules={(evt) => setActiveRulesEvent(evt)}
            onOpenRegister={handleOpenRegister}
          />

          {/* 9. Event Rules Overlay Modal */}
          <EventRulesModal
            event={activeRulesEvent}
            onClose={() => setActiveRulesEvent(null)}
            onRegister={(evt) => handleOpenRegister(evt)}
          />

          {/* 10. Realm Map Quick Jump Drawer */}
          <RealmQuickNav
            isOpen={isQuickNavOpen}
            onClose={() => setIsQuickNavOpen(false)}
            onScrollToDepth={handleScrollToDepthProgress}
          />

          {/* 11. Registration Modal */}
          <RegistrationModal
            isOpen={isRegisterOpen}
            onClose={() => setIsRegisterOpen(false)}
            selectedEvent={registerEvent}
          />
        </>
      )}
    </main>
  );
}
