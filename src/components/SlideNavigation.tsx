import React from 'react';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SlideNavigationProps {
  currentSlide: number;
  totalSlides: number;
  goToSlide: (slideIndex: number) => void;
}

export const SlideNavigation: React.FC<SlideNavigationProps> = ({
  currentSlide,
  totalSlides,
  goToSlide,
}) => {
  return (
    <>
      <div className="navigation-controls">
        <Button
          variant="outline"
          size="icon"
          onClick={() => goToSlide(currentSlide - 1)}
          disabled={currentSlide === 0}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="flex items-center justify-center min-w-[80px] text-sm">
          {currentSlide + 1} / {totalSlides}
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => goToSlide(currentSlide + 1)}
          disabled={currentSlide === totalSlides - 1}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div
        className="progress-bar"
        style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
      ></div>
    </>
  );
};
