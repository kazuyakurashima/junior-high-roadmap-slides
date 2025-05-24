import { useState, useEffect } from 'react';
import { Slide } from './components/Slide';
import { SlideNavigation } from './components/SlideNavigation';



function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        goToSlide(currentSlide + 1);
      } else if (e.key === 'ArrowLeft') {
        goToSlide(currentSlide - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const goToSlide = (slideIndex: number) => {
    if (slideIndex >= 0 && slideIndex < 18) {
      setCurrentSlide(slideIndex);
    }
  };

return (
  <div className="relative overflow-hidden bg-background text-foreground">
    {/* Slide 1: Title Slide */}
    <Slide id={0} currentSlide={currentSlide} className="bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h1 className="slide-title text-primary">中学入試ロードマップ</h1>
        <h2 className="slide-subtitle text-muted-foreground mb-8">4年生・5年生の保護者様向け</h2>
        <p className="text-lg mb-4">2025年5月</p>
        <p className="text-lg font-medium">話者：倉島一也</p>
      </div>
    </Slide>

    {/* Slide 2: 中学受験を取り巻く数字 */}
    <Slide id={1} currentSlide={currentSlide} className="bg-white">
      <div className="p-10 text-xl">
        <h2 className="text-2xl font-bold mb-4">中学受験を取り巻く数字</h2>
        <p>ここにグラフや数値を表示する予定です。</p>
      </div>
    </Slide>

    {/* Navigation controls */}
    <SlideNavigation 
      currentSlide={currentSlide} 
      totalSlides={18} 
      goToSlide={goToSlide} 
    />
  </div>
);
}

export default App;
