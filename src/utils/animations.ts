import { useEffect } from 'react';

/**
 * Hook to initialize Intersection Observer for scroll animations
 */
export const useScrollAnimation = () => {
  useEffect(() => {
    const animatedElements = document.querySelectorAll(
      '.animate-fade-in, .animate-slide-up, .animate-slide-right'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            // Unobserve after animation is triggered
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null, // viewport
        threshold: 0.1, // trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // trigger a bit before the element is in view
      }
    );

    animatedElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      animatedElements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);
};

/**
 * Apply staggered animation delay to children of a container
 * @param selector - CSS selector for the children elements
 * @param baseDelay - Base delay in milliseconds before starting the stagger
 * @param staggerDelay - Delay between each child animation in milliseconds
 */
export const applyStaggeredAnimation = (
  selector: string,
  baseDelay = 0,
  staggerDelay = 100
) => {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach((element, index) => {
      const delay = baseDelay + index * staggerDelay;
      (element as HTMLElement).style.transitionDelay = `${delay}ms`;
    });

    return () => {
      elements.forEach((element) => {
        (element as HTMLElement).style.transitionDelay = '';
      });
    };
  }, [selector, baseDelay, staggerDelay]);
};

/**
 * Hook to add parallax scrolling effect to an element
 * @param selector - CSS selector for the element
 * @param speed - Speed of the parallax effect (1 = normal, 0.5 = half speed, 2 = double speed)
 */
export const useParallaxEffect = (selector: string, speed = 0.5) => {
  useEffect(() => {
    const element = document.querySelector(selector) as HTMLElement;
    if (!element) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const offset = scrollPosition * speed;
      element.style.transform = `translateY(${offset}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selector, speed]);
};
