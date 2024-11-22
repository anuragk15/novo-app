/* eslint-disable @typescript-eslint/no-namespace */
import { useEffect, useState } from "react";
import "ldrs/cardio";
import "ldrs/superballs";
import "ldrs/quantum";
import "ldrs/hatch";

// Default values shown

// Default values shown

// Default values shown

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "l-cardio": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        size?: number | string;
        stroke?: string;
        speed?: string;
        color?: string;
      };
      "l-superballs": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        size?: number | string;
        stroke?: string;
        speed?: string;
        color?: string;
      };
      "l-hatch": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        size?: number | string;
        stroke?: string;
        speed?: string;
        color?: string;
      };
      "l-quantum": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        size?: number | string;
        stroke?: string;
        speed?: string;
        color?: string;
      };
    }
  }
}

// Default values shown

export default function LoadingOnboardingText() {
  const [textIndex, setTextIndex] = useState(0);
  const texts = [
    "Checking if the website is up...",
    "Scanning for hidden gems on your site...",
    "Reading between the lines...",
    "Pulling together fresh insights...",
  ];

  useEffect(() => {
    const intervalTime = textIndex === 0 ? 2000 : 6000; // 2 seconds for the first, 6 seconds for the rest

    const interval = setInterval(() => {
      if (textIndex < texts.length - 1) {
        setTextIndex((prevIndex) => prevIndex + 1);
      }
    }, intervalTime); // Change text every 2 second
    if (textIndex == texts.length - 1) {
      clearInterval(interval);
    }
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [texts.length, textIndex]);

  return (
    <div className="w-full h-full flex gap-8 flex-col justify-center items-center">
      {textIndex == 0 ? (
        <l-cardio size={100} stroke="4" speed="1.5" color="black"></l-cardio>
      ) : textIndex == 1 ? (
        <l-superballs size="70" speed="2" color="black"></l-superballs>
      ) : textIndex == 2 ? (
        <l-hatch  size="60" speed="6" color="black"></l-hatch>
      ) : (
        <l-quantum size="60" speed="4" color="black"></l-quantum>
      )}

      <p className=" italic text-xl">{texts[textIndex]}</p>
    </div>
  );
}
