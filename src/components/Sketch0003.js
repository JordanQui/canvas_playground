/**
 * Ce projet utilise Hydra.js, sous licence MIT.
 * Copyright (c) 2020 Olivia Jack et les contributeurs de Hydra.js.
 * Voir le fichier LICENSE pour plus de détails.
 */

"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function Sketch0002({ id }) {
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

               setResolution(4000, 4000);

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
               a.setSmooth(0.99);

               speed=0.0000001

               osc(() => 100 - smoothedValues.valueLo * 500, 0)
                    .scrollX(() => -smoothedValues.valueMid2 * 20)
                    .scale(() => 1 + (smoothedValues.valueLo * 10) - (smoothedValues.valueHi * 4))
                    .contrast(() => 5 - (smoothedValues.valueLo * 10))
                    .add(osc(() => 0.1 + smoothedValues.valueHi * 500, 0, ()=> smoothedValues.valueMid1 * 10).rotate(0.1))
                    .modulate(o0, () => 0.1 + smoothedValues.valueLo * 2.5 + (smoothedValues.valueHi * 100))
                    .modulate(osc(() => 1 + smoothedValues.valueLo * 2,0.1,0.1))
                    .blend(o0, 0.5)
                    .kaleid(7)
                    .scale(10)
               .out();
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
