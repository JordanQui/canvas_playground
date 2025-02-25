"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Sketch0001({ id }) {
     const canvasRef = useRef(null);
     const intervalRef = useRef(null);
     const [isLoaded, setIsLoaded] = useState(false);

     useEffect(() => {
          if (!isLoaded) {
               loadHydra();
          }

          return () => {
               unloadHydra();
          };
     }, [id]);

     const loadHydra = () => {
          const canvas = canvasRef.current;

          const script = document.createElement("script");
          script.src = "/hydra.js";
          script.async = true;
          script.onload = () => {
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

               document.body.appendChild(script);
               setIsLoaded(true);
          };

          document.body.appendChild(script);
     };

     const unloadHydra = () => {
          if (intervalRef.current) {
               clearInterval(intervalRef.current);
          }

          const script = document.querySelector(`script[src="/hydra.js"]`);
          if (script) {
               document.body.removeChild(script);
          }

          setIsLoaded(false);
     };

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
               ></canvas>
          </div>
     );
}
