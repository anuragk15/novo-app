import "ldrs/trio";
/* eslint-disable @typescript-eslint/no-namespace */

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "l-trio": React.DetailedHTMLProps<
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

export default function Loader() {
  return <l-trio size="40" speed="1.3" color="black"></l-trio>;
}
