"use client";

import { useEffect } from "react";
import { getResolution } from "../utils/store";
import gsap from "gsap";

export default function Riveal({ id }) {
     useEffect(() => {
          const {width, height} = getResolution();
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

               setResolution(width, heightÒ);

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

               s0.initImage("/riveal.png");

               src(s0)
                    .saturate(0)
                    .scrollX(() => smoothedValues.valueLo * 1, 0.05)
                    .scrollY(() => smoothedValues.valueLo * 1, 0.05)
                    .scale(2)
                    .luma(
                         () =>
                              smoothedValues.valueLo * 0.04 -
                              0.2 +
                              smoothedValues.valueHi * 0.2
                    )
                    .rotate(1)
                    .kaleid(2)
                    .scale(() => smoothedValues.valueMid2 * 0.2 - 0.5)
                    .modulate(
                         o0,
                         () =>
                              smoothedValues.valueMid1 * 0.5 +
                              smoothedValues.valueHi * 1
                    )
                    .scale(
                         () =>
                              1 +
                              smoothedValues.valueLo * 3.5 -
                              smoothedValues.valueHi * 0.2
                    )
                    .contrast(
                         () =>
                              -2 -
                              smoothedValues.valueLo * 1 -
                              smoothedValues.valueHi * 5
                    )
                    .out(o0);
          };
          document.body.appendChild(script);

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
