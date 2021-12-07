import React, { lazy, Suspense, memo, useState } from 'react';
import { ErrorBoundary, Footer, Preloader } from 'components';
import CharacterCreator from './components/CharacterCreator';

const AboutSection = lazy(() => import('./components/AboutSection'));
const CharacterShowcase = lazy(() => import('./components/CharactersShowcase'));

const MintPage = memo(() => {
  const [isLoaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  return (
    <div style={{ textAlign: 'center', overflowX: 'hidden' }}>
      <ErrorBoundary>
        <Preloader ready={isLoaded} progress={progress} />
        <CharacterCreator isLoaded={isLoaded} setLoaded={setLoaded} setProgress={setProgress} />
      </ErrorBoundary>
      <Suspense fallback={<div />}>
        <AboutSection />
        <CharacterShowcase />
      </Suspense>
      <Footer />
    </div>
  );
});

export default MintPage;
