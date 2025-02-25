"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Sketch0001({ id }) {
     const canvasRef = useRef(null); // Référence au canvas
     const intervalRef = useRef(null);
     const hydraRef = useRef(null);

     useEffect(() => {
          function initHydra() {
               if (hydraRef.current) return; // Évite d'initialiser plusieurs fois Hydra

               const canvas = canvasRef.current;
               if (!canvas) return; // Sécurité au cas où le canvas n'est pas encore chargé

               hydraRef.current = new Hydra({
                    canvas: canvas,
                    detectAudio: true,
               });

               a.setBins(8);
               setResolution(1920, 1080);

               let smoothedValues = {
                    valueLo: 0,
                    valueMid1: 0,
                    valueMid2: 0,
                    valueHi: 0,
               };

               const tresh = 0.0001;

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

               if (intervalRef.current) clearInterval(intervalRef.current);
               intervalRef.current = setInterval(smoothAudio, 1);

               osc(
                    () =>
                         2 -
                         smoothedValues.valueLo +
                         smoothedValues.valueHi * 3,
                    0.1,
                    0
               )
                    .scale(() => smoothedValues.valueLo * 1 + 0.1)
                    .mult(
                         osc(
                              () => 0.1 + smoothedValues.valueHi * 1,
                              0,
                              () =>
                                   smoothedValues.valueMid1 * 100 +
                                   smoothedValues.valueHi * 100
                         ).rotate(10)
                    )
                    .modulate(o0, 0.6)
                    .out(o0);
          }

          if (!window.Hydra) {
               const script = document.createElement("script");
               script.src = "/hydra.js";
               script.async = true;
               script.onload = initHydra;
               document.body.appendChild(script);

               return () => {
                    document.body.removeChild(script);
               };
          } else {
               initHydra();
          }

          return () => {
               if (intervalRef.current) clearInterval(intervalRef.current);
               if (hydraRef.current) {
                    hydraRef.current = null; // Reset propre de Hydra
               }
          };
     }, [id]);

     return (
          <div
               style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
               }}
          >
               <canvas
                    ref={canvasRef}
                    id={id} // On garde l'ID intact
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
