"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function Hept({ id, imgSrc, title }) {
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

              let bpm = 157;

              a.setBins(8);

              s0.initImage("/test48.png");

              let smoothedValues = {
                   valueLo: 0,
                   valueMid1: 0,
                   valueMid2: 0,
                   valueHi: 0,
              };

              const tresh = 0.01;

              function smoothAudio() {
                   gsap.to(smoothedValues, {
                        duration: 1,
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
                        duration: 1,
                        valueHi: a.fft[7] > tresh ? a.fft[7] : 0,
                   });
              }

              setInterval(smoothAudio, 1);

              setResolution(640, 480);

          //     a.setSmooth(0.8);

              //shape(3, 1, 0).repeat(3,3,1,0).out(o0);

              src(s0)
                   .scrollX(1, () => Math.sin(0.02, time) * 1)
                   .scrollY(1, () => Math.sin(0.02, time) * 1)
                   .modulateKaleid(
                        voronoi(
                             0,
                             0,
                             () =>
                                  0 +
                                  smoothedValues.valueLo * 5 +
                                  smoothedValues.valueHi * 20
                        ),
                        7
                   )
                   .scale(
                        () => smoothedValues.valueLo * 1 + 0.44,
                        () => smoothedValues.valueHi * 1 + 0.44
                   )
                   .luma(() => -1 + smoothedValues.valueLo * 4)
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
                         cursor: "none"
                    }}
               ></canvas>
          </div>
     );
}
