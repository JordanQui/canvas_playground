"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function Xordon2({ id, imgSrc, title }) {
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

                setResolution(720, 600);

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

                s0.initImage("/eye.png");

                src(s0)
                     .saturate(0)
                     //.scrollX(0, 0.1)
                     .scale(1)
                     .luma(-0.5)
                     //.kaleid(4)
                     .scale(() => smoothedValues.valueLo * 2 + 0.2)
                     .modulate(
                          o0,
                          () =>
                               smoothedValues.valueMid1 * 0.2 +
                               smoothedValues.valueHi * 0.7
                     )
                     .scale(() => 1.999 + smoothedValues.valueLo * 4 - smoothedValues.valueHi * 5)
                     .contrast(() => 1.5 - smoothedValues.valueLo * 25 + smoothedValues.valueHi * 50)
                     .blend(o0)
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
