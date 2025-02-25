"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Sketch0001({ id }) {
     const canvasRef = useRef(null);
     const intervalRef = useRef(null); // Référence pour l'intervalle

     useEffect(() => {
          const canvas = canvasRef.current;

          // Vérifie si WebGL est disponible
          const testWebGL = () => {
               const gl = canvas.getContext("webgl");
               if (gl) {
                    console.log("WebGL est disponible !");
               } else {
                    console.warn(
                         "WebGL n'est pas supporté sur ce navigateur !"
                    );
               }
          };

          const script = document.createElement("script");
          script.src = "/hydra.js";
          script.async = true;
          script.onload = () => {
               testWebGL(); // Vérifie WebGL après le chargement de Hydra.js

               const hydra = new Hydra({
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

               intervalRef.current = setInterval(smoothAudio, 1); // Enregistre l'ID de l'intervalle

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
          };

          document.body.appendChild(script);

          // Cleanup lors de la destruction du composant
          return () => {
               clearInterval(intervalRef.current); // Nettoie l'intervalle
               document.body.removeChild(script);
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
                    id={id}
                    width={1920} // Définit la largeur du canvas
                    height={1080} // Définit la hauteur du canvas
                    style={{
                         display: "block",
                         width: "100vw",
                         height: "100vh",
                         backgroundColor: "#000", // Utilise une couleur de fond visible
                         overflow: "hidden",
                         cursor: "none",
                    }}
               ></canvas>
          </div>
     );
}
