"use client"
import "animate.css";
import { useEffect, useState } from "react";

interface FeatureProps {
  title: string;
  description: string;
  video_link: string;
  flip: boolean;
}

export function Feature({
  title,
  description,
  video_link,
  flip,
}: FeatureProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById(title);
    if (element) observer.observe(element);

    // Cleanup the observer on unmount
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [title]);

  return (
    <div id={title} className={flip ? "bg-muted space-y-12 mt-6 p-6 md:p-8" : "space-y-12 mt-6 p-6 md:p-8"}>
      {flip && (
        <div className="mx-auto grid items-center gap-8 sm:max-w-6xl grid-cols-[3fr,2fr] md:gap-12 lg:max-w-7xl lg:grid-cols-[3fr,2fr]">
          <div
            className={isVisible ? "grid gap-8 animate__animated animate__slow animate__fadeIn" : "grid gap-8 "}
          >
            <h3 className="text-2xl font-bold">{title}</h3>
            <p className="text-lg text-muted-foreground">{description}</p>
          </div>
          <div className="grid gap-1">
            <img src={video_link} className="rounded-2xl" />
          </div>
        </div>
      )}

      {!flip && (
        <div className="mx-auto grid items-center gap-8 sm:max-w-6xl grid-cols-[2fr,3fr] md:gap-12 lg:max-w-7xl lg:grid-cols-[2fr,3fr]">
          <div className="grid gap-1">
            <img src={video_link} className="rounded-2xl" />
          </div>
          <div
            className={isVisible ? "grid gap-8 animate__animated animate__slow animate__fadeIn" : "grid gap-8"}
          >
            <h3 className="text-2xl font-bold">{title}</h3>
            <p className="text-lg text-muted-foreground">{description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
