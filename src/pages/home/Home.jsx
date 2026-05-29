import Hero from '../../components/hero/Hero';
import Features from '../../components/features/Features';
import { useEffect } from 'react';

export default function Home() {
      useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (<>
    <Hero />
    <Features />
  </>
  )
};
