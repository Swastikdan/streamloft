import type { SVGProps } from "react";
const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 640 640"
    {...props}
  >
    <path fill="#fff" d="M209.617 214.726h219.702V424.21H209.617z"></path>
    <path
      fill="url(#a)"
      d="M320 64C178.688 64 64 178.688 64 320s114.688 256 256 256 256-114.688 256-256S461.312 64 320 64m68.096 300.288-32.768 18.944-32.768 18.944c-42.24 24.32-76.8 4.352-76.8-44.288v-75.776c0-48.896 34.56-68.608 76.8-44.288l32.768 18.944 32.768 18.944c42.24 24.32 42.24 64.256 0 88.576"
    ></path>
    <defs>
      <linearGradient
        id="a"
        x1="319.999"
        x2="319.999"
        y1="-896.603"
        y2="575.996"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#68ACFF"></stop>
        <stop offset="0.229" stopColor="#65A7FF"></stop>
        <stop offset="0.498" stopColor="#5B99FF"></stop>
        <stop offset="0.787" stopColor="#4A81FF"></stop>
        <stop offset="1" stopColor="#3B6BFF"></stop>
      </linearGradient>
    </defs>
  </svg>
);

export default Logo;
