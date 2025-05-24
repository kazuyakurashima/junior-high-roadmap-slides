import React from 'react';
import { cn } from '@/lib/utils';

interface SlideProps {
  id: number;
  currentSlide: number;
  children: React.ReactNode;
  className?: string;
}

export const Slide: React.FC<SlideProps> = ({
  id,
  currentSlide,
  children,
  className,
}) => {
  let slideStatus = 'next';
  
  if (id === currentSlide) {
    slideStatus = 'active';
  } else if (id < currentSlide) {
    slideStatus = 'prev';
  }

  return (
    <div className={cn('slide', slideStatus, className)}>
      <div className="slide-content">
        {children}
      </div>
    </div>
  );
};
