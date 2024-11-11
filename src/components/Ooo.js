"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function Ooo({ id, imgSrc, title }) {
     useEffect(() => {
          const script = document.createElement("script");
          script.src = "/hydra.js";
          script.async = true;
          script.onload = () => {
               const canvas = document.getElementById(id);

               const hydra = new Hydra({
                    canvas: canvas,
                    detectAudio: true,
               });

               a.setBins(8);

               setResolution(800, 600);

               let smoothedValues = {
                    valueLo: 0,
                    valueMid1: 0,
                    valueMid2: 0,
                    valueHi: 0,
               };

               const tresh = 0.01;

               function smoothAudio() {
                    gsap.to(smoothedValues, {
                         duration: 0.5,
                         valueLo: a.fft[0] > tresh ? a.fft[0] : 0,
                    });
                    gsap.to(smoothedValues, {
                         duration: 0.55,
                         valueMid1: a.fft[1] > tresh ? a.fft[1] : 0,
                    });
                    gsap.to(smoothedValues, {
                         duration: 0.15,
                         valueMid2: a.fft[2] > tresh ? a.fft[2] : 0,
                    });
                    gsap.to(smoothedValues, {
                         duration: 0.5,
                         valueHi: a.fft[7] > tresh ? a.fft[7] : 0,
                    });
               }

               setInterval(smoothAudio, 1);


               s0.initImage("/ooo.png");

               a.setSmooth(0.9)

               src(s0)
                    .saturate(0)
                    .scrollX(() => smoothedValues.valueLo * 6)
                    .scrollY(() => smoothedValues.valueLo * 1)
                    .scale(() => smoothedValues.valueLo * 40 + 3)
                    .rotate(3.1)
                    .luma(
                         () =>
                              smoothedValues.valueLo * 0.04 -
                              0.2 +
                              smoothedValues.valueHi * 0.2
                    )
                    //.kaleid(1)
                    //.rotate(() => smoothedValues.valueLo * 10)
                    .scale(() => smoothedValues.valueLo * 0.2 - 0.5)
                    .modulate(
                         o0,
                         () =>
                              smoothedValues.valueMid1 * 0.2 +
                              smoothedValues.valueHi * 15
                    )
                    .scale(
                         () =>
                              1 +
                              smoothedValues.valueLo * 0.5 +
                              smoothedValues.valueMid1 * 1
                    )
                    .contrast(
                         () =>
                              1 -
                              smoothedValues.valueLo * 1 +
                              smoothedValues.valueHi * 10
                    )
                    .out(o0);
          };
          document.body.appendChild(script);

          // Cleanup lors de la destruction du composant
          return () => {
               document.body.removeChild(script);
          };
     }, [id]);

     return (
          <div
               style={{
                    display: "flex",
                    "justify-content": "center",
                    "flex-direction": "column",
               }}
          >
               <canvas
                    id={id} 
                    style={{
                         display: "block",
                         width: "100vw",
                         height: "100vh",
                         backgroundColor: "#00",
                         overflow: "hidden",
                         cursor: "none",
                    }}
               ></canvas>
          </div>
     );
}
