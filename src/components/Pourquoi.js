"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function Pourquoi({ id, imgSrc, title }) {
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

               s0.initImage("/why.png");
               // s1.initImage("/lips.png");

               a.setSmooth(0.9)

               // src(s1).modulate(o2, () => smoothedValues.valueLo *  1.5).out(o2);

               src(s0)
                    // .scrollX(() => 0)
                    // .scrollY(() => 0)
                    // .modulate(
                    //      o1,
                    //      () =>
                    //           smoothedValues.valueMid1 * 1 +
                    //           smoothedValues.valueHi * 5
                    // )
                    .scrollX(
                         () =>
                              smoothedValues.valueLo * 2 +
                              smoothedValues.valueHi * 2
                    )
                    .scrollY(
                         () =>
                              smoothedValues.valueLo * 2 +
                              smoothedValues.valueHi * 2
                    )
                    .scale(() => smoothedValues.valueLo * 1 + 0.75)
                    .kaleid(6)
                    // .contrast(1.2)
                    .out(o1);

               src(s0)
                    .scrollX(
                         () =>
                              smoothedValues.valueLo * 2 +
                              smoothedValues.valueHi * 5
                    )
                    .scrollY(
                         () =>
                              smoothedValues.valueLo * 2 +
                              smoothedValues.valueHi * 5
                    )
                    .kaleid(6)
                    .scale(() => 0.25 + smoothedValues.valueMid1 * 2)
                    // .scale(() => smoothedValues.valueLo * 10 + 3)
                    // .luma(
                    //      () => smoothedValues.valueHi * 2 + -1
                    // )
                    .modulate(
                         o0,
                         () =>
                              smoothedValues.valueLo * 10 +
                              smoothedValues.valueHi * -10
                    )
                    .blend(o0, -0.5)
                    .modulate(o1, 0 - smoothedValues.valueLo * 2)
                    .blend(o1)
                    .contrast(() => -0.75 - smoothedValues.valueHi * 1)
                    .luma()
                    .brightness(-0.75)
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
