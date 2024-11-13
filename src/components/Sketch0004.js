"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import p5 from "p5";

export default function Gliss({ id, imgSrc, title }) {
     const p5CanvasRef = useRef(null);
     const hydraCanvasRef = useRef(null);

     useEffect(() => {
          const script = document.createElement("script");
          script.src = "/hydra.js";
          script.async = true;
          let smoothedValues = {
               valueLo: 0,
               valueMid1: 0,
               valueMid2: 0,
               valueHi: 0,
          };

          script.onload = () => {
               const canvas = document.getElementById(id);

               // Initialiser Hydra.js
               const hydra = new Hydra({
                    canvas: canvas,
                    detectAudio: true,
               });
               hydra.setResolution(800, 640);

               a.setBins(8);

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

               if (p5CanvasRef.current) {
                    s0.init({ src: p5CanvasRef.current.canvas });
                    src(s0)
                         .modulate(s0, () => 0.01 + smoothedValues.valueLo * 2)
                         .contrast(2)
                         .scale(() => 1 + smoothedValues.valueHi * 10)
                         // .scrollX(1, 0.1)
                         .out();
               }
          };
          document.body.appendChild(script);

          // Initialisation de P5.js
          const sketch = (p) => {
               let spacing = 100;
               let speed = 0;
               let offset = 0;
               let feedbackGain = 1.2;
               let threshold = 0.15;
               let rotationAngle = 0;

               p.setup = () => {
                    const canvas = p.createCanvas(
                         400,
                         400
                    );
                    p5CanvasRef.current = canvas;
                    p.background(0);
               };

               p.draw = () => {
                    p.background(0);
                    p.tint(255, 255 * feedbackGain);
                    p.blendMode(p.DIFFERENCE);

                    // Analyse du niveau sonore du microphone Hydra.js
                    let micLevel = smoothedValues.valueLo * 2;
                    let micLevel2 = smoothedValues.valueHi * 2;

                    // Appliquer le seuil de volume
                    if (micLevel >= threshold) {
                         spacing = p.map(micLevel, threshold, 1, 1, 1000);
                         rotationAngle = p.map(micLevel, threshold, 1, 0, p.PI);
                    } else {
                         spacing = 100;
                         rotationAngle = 0;
                    }

                    offset += speed;

                    p.push();
                    p.translate(p.width / 2, p.height / 2); // Déplacer l'origine au centre
                    p.rotate(rotationAngle); // Appliquer la rotation
                    p.translate(-p.width / 2, -p.height / 2); // Revenir à l'origine en haut à gauche

                    for (let i = -offset; i < p.width; i += spacing * 2) {
                         drawHorizontalGradient(
                              i,
                              -p.height / 2,
                              spacing,
                              p.height * 2,
                              true
                         );
                         drawHorizontalGradient(
                              i + spacing,
                              -p.height / 2,
                              spacing,
                              p.height * 2,
                              false
                         );
                    }

                    p.pop();
                    p.blendMode(p.BLEND);
               };

               function drawHorizontalGradient(x, y, w, h, blackToWhite) {
                    for (let i = 0; i < w; i++) {
                         let alpha;
                         if (i < w * 0.15) {
                              alpha = p.map(i, 0, w * 0.45, 0, 255);
                         } else if (i > w * 0.85) {
                              alpha = p.map(i, w * 0.55, w, 255, 0);
                         } else {
                              alpha = 0;
                         }

                         if (!blackToWhite) alpha = 255 - alpha;
                         p.fill(255, alpha);
                         p.noStroke();
                         let squareSize = h / 2.0;

                         for (let j = 0; j < h; j += squareSize) {
                              p.rect(x + i, y + j, 1, squareSize);
                         }
                    }
               }
          };

          const p5Instance = new p5(sketch);

          return () => {
               p5Instance.remove();
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
                    id={id} 
                    ref={hydraCanvasRef}
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
