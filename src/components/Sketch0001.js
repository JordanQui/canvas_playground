"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Sketch0002({ id }) {
     const intervalRef = useRef(null);
     const hydraRef = useRef(null);
     const scriptRef = useRef(null);

     useEffect(() => {
          // Charge le script Hydra uniquement une fois
          if (!scriptRef.current) {
               scriptRef.current = document.createElement("script");
               scriptRef.current.src = "/hydra.js";
               scriptRef.current.async = true;
               document.body.appendChild(scriptRef.current);
          }

          const onLoad = () => {
               const canvas = document.getElementById(id);
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

               const tresh = 0.001;

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

               clearInterval(intervalRef.current);
               intervalRef.current = setInterval(smoothAudio, 16); // Utilisez un intervalle plus long pour réduire la charge

               a.setSmooth(0.1);

               speed= 0.000001;

               const oscillator = osc(
                    () =>
                         2 -
                         smoothedValues.valueLo +
                         -smoothedValues.valueHi * 35,
                    0,
                    () => smoothedValues.valueMid1 * 500
               )
                    .scale(0.1)
                    .modulate(o0, () => (smoothedValues.valueHi * 7) + 0.36)
                    .blend(o0,0.55)
                    .out(window.o0);

               // Cleanup on component unmount
               return () => {
                    clearInterval(intervalRef.current);
                    if (oscillator) {
                         oscillator.free(); // Libérez les ressources de l'oscillateur
                    }
                    hydraRef.current = null;
               };
          };

          scriptRef.current.onload = onLoad;

          // Cleanup when the component is unmounted
          return () => {
               if (scriptRef.current) {
                    scriptRef.current.onload = null; // Retirer l'écouteur d'événements
                    document.body.removeChild(scriptRef.current); // Enlevez le script au démontage
                    scriptRef.current = null; // Réinitialisez la référence
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
