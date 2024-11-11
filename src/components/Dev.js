"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function Hept2({ id, imgSrc, title }) {
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
                         duration: 0.25,
                         valueLo: a.fft[0] > tresh ? a.fft[0] : 0,
                    });
                    gsap.to(smoothedValues, {
                         duration: 0.5,
                         valueMid1: a.fft[5] > tresh ? a.fft[2] : 0,
                    });
                    gsap.to(smoothedValues, {
                         duration: 0.5,
                         valueMid2: a.fft[6] > tresh ? a.fft[3] : 0,
                    });
                    gsap.to(smoothedValues, {
                         duration: 0.5,
                         valueHi: a.fft[7] > tresh ? a.fft[6] : 0,
                    });
               }

               setInterval(smoothAudio, 1);


               s0.initImage("/test1.png");
               s1.initImage("/test2.png");
               s2.initVideo("/vid.webm")

               src(s1).rotate(1,1).out(o1);
               src(s2).colorama(1,1,1).out(o2);

               src(s0)
                    .saturate(0)
                    .scrollX(1, 1)
                    .scale(0.1)
                    .modulate(
                         o1, 10
                    )
                    .contrast(
                         () =>
                              1 -
                              smoothedValues.valueLo * 2 +
                              smoothedValues.valueHi * 1
                    )
                    .add(o1)
                    .add(o2)
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
                    id={id} // Use the id prop for canvas
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
