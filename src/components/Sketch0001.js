"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";

export default function Sketch0001({ id }) {
     const canvasRef = useRef(null);
     const intervalRef = useRef(null);
     const scriptRef = useRef(null);
     const hydraRef = useRef(null);
     const hydraScriptSrc = "/hydra.js";
     const [recharge, setRecharge] = useState(false);
     const [glReady, setGlReady] = useState(false);

     useEffect(() => {
          const canvas = canvasRef.current;
          if (!canvas) return;

          canvas.width = 1920;
          canvas.height = 1080;
          const gl = canvas.getContext("webgl");
          if (!gl) return;

          setGlReady(true);

          const script = document.createElement("script");
          script.src = hydraScriptSrc;
          script.async = true;
          scriptRef.current = script;

          script.onload = () => {
               if (glReady) {
                    initializeHydra();
               }
          };

          document.body.appendChild(script);

          return cleanup;
     }, [recharge, glReady]);

     useEffect(() => {
          const interval = setInterval(() => {
               setRecharge((prevRecharge) => !prevRecharge);
          }, 10 * 1000);

          intervalRef.current = interval;

          return () => {
               clearInterval(interval);
          };
     }, []);

     const initializeHydra = () => {
          try {
               const hydra = new Hydra({
                    canvas: canvasRef.current,
                    detectAudio: true,
               });

               hydraRef.current = hydra;

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
          } catch (error) {
               console.error(error);
          }
     };

     const cleanup = () => {
          console.log("Nettoyage de Hydra...");
          try {
               if (hydraRef.current) {
                    hydraRef.current = null;
               }
               if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
               }
               if (canvasRef.current) {
                    const ctx = canvasRef.current.getContext("2d");
                    if (ctx) {
                         ctx.clearRect(
                              0,
                              0,
                              canvasRef.current.width,
                              canvasRef.current.height
                         );
                    }
               }
          } catch (err) {
               console.error("Erreur lors de la suppression de Hydra :", err);
          } finally {
               // Nettoyer les ressources ici
          }
     };



     useEffect(() => {
          return () => {
               cleanup();
          };
     }, []);

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
                    width={1920}
                    height={1080}
                    style={{
                         display: "block",
                         width: "100vw",
                         height: "100vh",
                         backgroundColor: "#000",
                         overflow: "hidden",
                         cursor: "none",
                    }}
               />
          </div>
     );
}
