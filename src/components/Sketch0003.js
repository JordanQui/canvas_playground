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

               // Intégrer P5.js en tant que source de modulation
               if (p5CanvasRef.current) {
                    s0.init({ src: p5CanvasRef.current.canvas });
                    src(s0)
                         .modulate(s0, () => 0.1 + smoothedValues.valueLo * 2)
                         .contrast(2)
                         .scale(() => 0.5 + smoothedValues.valueLo * 0.2)
                         .scrollX(1, 0.01)
                         .modulate(s0, 0.25)
                         .out();
               }
          };
          document.body.appendChild(script);

          // Initialisation de P5.js avec la logique des nœuds connectés
          const sketch = (p) => {
               let nodes = [];
               const numNodes = 10;
               const maxNodes = 300;

               class Node {
                    constructor(x, y) {
                         this.pos = p.createVector(x, y);
                         this.vel = p5.Vector.random2D().mult(1.5);
                         this.maxDist = 100;
                    }

                    update() {
                         this.pos.add(this.vel);
                         if (this.pos.x < 0 || this.pos.x > p.width)
                              this.vel.x *= -1;
                         if (this.pos.y < 0 || this.pos.y > p.height)
                              this.vel.y *= -1;
                    }

                    display() {
                         p.stroke(255, 100);
                         p.strokeWeight(2);
                         p.point(this.pos.x, this.pos.y);
                    }

                    connect(nodes) {
                         nodes.forEach((other) => {
                              const d = p.dist(
                                   this.pos.x,
                                   this.pos.y,
                                   other.pos.x,
                                   other.pos.y
                              );
                              if (d > 1 && d < this.maxDist) {
                                   p.stroke(255, 50);
                                   p.strokeWeight(10);
                                   p.line(
                                        this.pos.x,
                                        this.pos.y,
                                        other.pos.x,
                                        other.pos.y
                                   );
                              }
                         });
                    }
               }

               p.setup = () => {
                    const canvas = p.createCanvas(800, 640);
                    p5CanvasRef.current = canvas;

                    // Création initiale des nœuds
                    for (let i = 0; i < numNodes; i++) {
                         nodes.push(new Node(p.width / 2, p.height / 2));
                    }
               };

               p.draw = () => {
                    p.background(0);

                    // Utilisation des valeurs audio de Hydra.js pour moduler les nœuds
                    nodes.forEach((node) => {
                         node.update();
                         node.display();
                         node.connect(nodes);

                         // Exemple de modulation de la distance maximale des connexions
                         node.maxDist = 50 + smoothedValues.valueLo * 200;
                    });

                    // Ajout progressif de nouveaux nœuds
                    if (p.frameCount % 10 === 0 && nodes.length < maxNodes) {
                         nodes.push(
                              new Node(p.random(p.width), p.random(p.height))
                         );
                    }
               };
          };

          const p5Instance = new p5(sketch);

          // Cleanup pour éviter des instances multiples
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
                    id={id} // Utilisation de l'id pour le canvas Hydra
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
