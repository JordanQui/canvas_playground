"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function Ooo2({ id, imgSrc, title }) {
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

               s0.initImage("/crystal.png");
               s1.initImage("/lips.png");

               src(s1).modulate(o2, () => smoothedValues.valueLo *  1.5).out(o2);

               src(s0)
                    // .scrollX(() => 0)
                    // .scrollY(() => 0)
                    // .modulate(
                    //      o1,
                    //      () =>
                    //           smoothedValues.valueMid1 * 1 +
                    //           smoothedValues.valueHi * 5
                    // )
                    .scale(() => smoothedValues.valueLo * 10 + 1.5)
                    // .contrast(1.2)
                    .out(o1);

               src(s0)
                    .scrollX(() => 0)
                    .scrollY(() => 0.2)
                    .scale(() => smoothedValues.valueLo * 10 + 3)
                    .luma(
                         () => smoothedValues.valueHi * 2 + -1
                    )
                    .modulate(
                         o1,
                         () =>
                              smoothedValues.valueMid1 * 1 +
                              smoothedValues.valueHi * 0.5
                    )
                    .blend(o2,2)
                    .contrast(() => 1 - smoothedValues.valueHi * 4)
                    .posterize(16,16)
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
