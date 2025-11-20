'use client';

import { useEffect, useState } from 'react';

interface IconProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function Icon({ src, alt, className = '', width = 20, height = 20 }: IconProps) {
  const [svgContent, setSvgContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(src)
      .then((res) => res.text())
      .then((text) => {
        // Extract SVG content and make it respect currentColor
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(text, 'image/svg+xml');
        const svgElement = svgDoc.querySelector('svg');
        
        if (svgElement) {
          // Set fill and stroke to currentColor for proper theming
          if (!svgElement.hasAttribute('fill') || svgElement.getAttribute('fill') !== 'none') {
            svgElement.setAttribute('fill', 'currentColor');
          }
          // For stroke-based icons, set stroke to currentColor
          const paths = svgElement.querySelectorAll('path');
          paths.forEach((path) => {
            if (path.hasAttribute('stroke')) {
              path.setAttribute('stroke', 'currentColor');
            }
            if (!path.hasAttribute('fill') || path.getAttribute('fill') !== 'none') {
              if (!path.hasAttribute('fill')) {
                path.setAttribute('fill', 'currentColor');
              }
            }
          });
          
          svgElement.setAttribute('width', width.toString());
          svgElement.setAttribute('height', height.toString());
          svgElement.setAttribute('class', className);
          
          setSvgContent(svgElement.outerHTML);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error loading SVG:', err);
        setIsLoading(false);
      });
  }, [src, width, height, className]);

  if (isLoading) {
    return <div className={className} style={{ width, height }} />;
  }

  return <div dangerouslySetInnerHTML={{ __html: svgContent }} />;
}

