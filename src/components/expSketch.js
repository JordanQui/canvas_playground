"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";

export default function Sketch0001({ id, reload }) {
     const containerRef = useRef(null);
     const canvasRef = useRef(null);
     const intervalRef = useRef(null);
     const [status, setStatus] = useState("Initialisation...");
     const [hydraInitialized, setHydraInitialized] = useState(false);

     const getWebGLContext = (canvas) => {
          const contextOptions = {
               alpha: true,
               depth: true,
               stencil: true,
               antialias: true,
               premultipliedAlpha: false,
               preserveDrawingBuffer: true,
               powerPreference: "default",
               failIfMajorPerformanceCaveat: false,
          };

          let gl = null;

          // Essayons d'abord d'obtenir un contexte WebGL 2
          try {
               gl = canvas.getContext("webgl2", contextOptions);
               if (gl) {
                    console.log("Utilisation de WebGL 2");
                    return { gl, type: "webgl2" };
               }
          } catch (e) {
               console.warn("WebGL 2 a échoué:", e);
          }

          // Si WebGL 2 échoue, essayons WebGL 1
          try {
               gl = canvas.getContext("webgl", contextOptions);
               if (gl) {
                    console.log("Utilisation de WebGL 1");
                    return { gl, type: "webgl" };
               }
          } catch (e) {
               console.warn("WebGL a échoué:", e);
          }

          // Au cas où nous devrions essayer experimental-webgl
          try {
               gl = canvas.getContext("experimental-webgl", contextOptions);
               if (gl) {
                    console.log("Utilisation de WebGL Experimental");
                    return { gl, type: "experimental-webgl" };
               }
          } catch (e) {
               console.warn("Experimental WebGL a échoué:", e);
          }

          return { gl: null, type: null };
     };

     const recreateCanvas = () => {
          if (containerRef.current) {
               if (canvasRef.current) {
                    containerRef.current.removeChild(canvasRef.current); // Supprimer l'ancien canvas
               }

               const newCanvas = document.createElement("canvas");
               newCanvas.id = ${id}-canvas-${Date.now()};
               newCanvas.width = 1920;
               newCanvas.height = 1080;
               newCanvas.style.display = "block";
               newCanvas.style.width = "100%";
               newCanvas.style.height = "100%";
               newCanvas.style.objectFit = "contain";

               containerRef.current.appendChild(newCanvas);
               canvasRef.current = newCanvas;

               return newCanvas;
          }
          return null;
     };

     const loadHydra = () => {
          return new Promise((resolve, reject) => {
               const oldScript = document.getElementById("hydra-script");
               if (oldScript) {
                    document.head.removeChild(oldScript);
               }

               const script = document.createElement("script");
               script.id = "hydra-script";
               script.src = "/hydra.js"; // Assurez-vous que ce chemin est correct
               script.async = true;
               script.onload = () => {
                    resolve();
               };
               script.onerror = (e) => {
                    console.error("Erreur de chargement du script Hydra:", e);
                    reject(new Error("Échec du chargement de Hydra"));
               };
               document.head.appendChild(script);
          });
     };

     const initializeHydra = async () => {
          try {
               setStatus("Reconstruction du canvas...");
               const canvas = recreateCanvas();

               // Vérifiez si le canvas a bien été créé
               console.log("Canvas créé:", canvas);
               if (!canvas) {
                    setStatus("Impossible de créer le canvas");
                    return false;
               }

               setStatus("Vérification de WebGL...");
               const { gl, type } = getWebGLContext(canvas);

               // Vérifiez le contexte WebGL
               console.log("Contexte WebGL:", gl);
               if (!gl) {
                    setStatus(
                         "WebGL n'est pas disponible. Veuillez vérifier votre navigateur."
                    );
                    return false;
               }

               // Vérification d'extensions WebGL
               const availableExtensions = gl.getSupportedExtensions();
               console.log("Extensions supportées :", availableExtensions);

               if (!availableExtensions.includes("OES_texture_float")) {
                    console.error(
                         "L'extension OES_texture_float n'est pas disponible."
                    );
                    setStatus(
                         "L'extension OES_texture_float n'est pas disponible."
                    );
                    return false;
               }

               setStatus(WebGL disponible (${type}). Chargement de Hydra...);

               if (typeof window.Hydra === "undefined") {
                    await loadHydra();
               }

               if (typeof window.Hydra === "undefined") {
                    setStatus("Hydra n'est pas disponible après chargement");
                    return false;
               }

               // Attendre un peu avant d'initialiser Hydra
               await new Promise((resolve) => setTimeout(resolve, 200));

               const hydraInstance = new window.Hydra({
                    canvas: canvas,
                    detectAudio: true,
                    enableStreamCapture: false,
                    width: canvas.width, // Utiliser la largeur du canvas
                    height: canvas.height, // Utiliser la hauteur du canvas
                    numSources: 4,
                    numOutputs: 4,
               });

               // Vérifiez si l'instance Hydra a été créée
               console.log("Instance Hydra :", hydraInstance);
               if (!hydraInstance) {
                    setStatus("Échec de la création de l'instance Hydra");
                    return false;
               }

               setStatus("Configuration de l'audio...");

               if (window.a && typeof window.a.setBins === "function") {
                    window.a.setBins(8);

                    let smoothedValues = {
                         valueLo: 0,
                         valueMid1: 0,
                         valueMid2: 0,
                         valueHi: 0,
                    };

                    const threshold = 0.0001;

                    function smoothAudio() {
                         if (!window.a || !window.a.fft) return;

                         gsap.to(smoothedValues, {
                              duration: 0.5,
                              valueLo:
                                   window.a.fft[0] > threshold
                                        ? window.a.fft[0]
                                        : 0,
                         });
                         gsap.to(smoothedValues, {
                              duration: 0.55,
                              valueMid1:
                                   window.a.fft[1] > threshold
                                        ? window.a.fft[1]
                                        : 0,
                         });
                         gsap.to(smoothedValues, {
                              duration: 0.15,
                              valueMid2:
                                   window.a.fft[2] > threshold
                                        ? window.a.fft[2]
                                        : 0,
                         });
                         gsap.to(smoothedValues, {
                              duration: 0.5,
                              valueHi:
                                   window.a.fft[7] > threshold
                                        ? window.a.fft[7]
                                        : 0,
                         });
                    }

                    if (intervalRef.current) {
                         clearInterval(intervalRef.current);
                    }
                    intervalRef.current = setInterval(smoothAudio, 1);

                    setTimeout(() => {
                         setStatus("Création des visuels...");
                         try {
                              window
                                   .osc(
                                        () =>
                                             2 -
                                             smoothedValues.valueLo +
                                             smoothedValues.valueHi * 3,
                                        0.1,
                                        0
                                   )
                                   .scale(
                                        () => smoothedValues.valueLo * 1 + 0.1
                                   )
                                   .mult(
                                        window
                                             .osc(
                                                  () =>
                                                       0.1 +
                                                       smoothedValues.valueHi *
                                                            1,
                                                  0,
                                                  () =>
                                                       smoothedValues.valueMid1 *
                                                            100 +
                                                       smoothedValues.valueHi *
                                                            100
                                             )
                                             .rotate(10)
                                   )
                                   .modulate(window.o0, 0.6)
                                   .out(window.o0);

                              setStatus("✨ Prêt !");
                              setHydraInitialized(true);
                         } catch (e) {
                              console.error(
                                   "Erreur lors de la création des visuels:",
                                   e
                              );
                              setStatus(
                                   Erreur lors de la création des visuels: ${e.message}
                              );
                              return false;
                         }
                    }, 500);
               } else {
                    setStatus("L'API audio de Hydra n'est pas disponible");
                    return false;
               }
          } catch (error) {
               console.error("Erreur lors de l'initialisation:", error);
               setStatus(Erreur: ${error.message});
               return false;
          }
     };

     const cleanup = () => {
          if (intervalRef.current) {
               clearInterval(intervalRef.current);
               intervalRef.current = null;
          }

          try {
               if (canvasRef.current) {
                    const gl =
                         canvasRef.current.getContext("webgl") ||
                         canvasRef.current.getContext("webgl2");
                    if (gl) {
                         const loseExt = gl.getExtension("WEBGL_lose_context");
                         if (loseExt) {
                              loseExt.loseContext();
                         }
                    }
               }
          } catch (e) {
               console.warn("Erreur lors du nettoyage WebGL:", e);
          }

          setHydraInitialized(false);
     };

     useEffect(() => {
          const initTimer = setTimeout(() => {
               initializeHydra();
          }, 300);

          return () => {
               clearTimeout(initTimer);
               cleanup();
          };
     }, [reload]);

     return (
          <div
               style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    width: "100vw",
                    height: "100vh",
                    position: "relative",
                    backgroundColor: "#000",
                    overflow: "hidden",
               }}
          >
               <div
                    ref={containerRef}
                    style={{
                         width: "100%",
                         height: "100%",
                         position: "relative",
                    }}
               />

               {!hydraInitialized && (
                    <div
                         style={{
                              position: "absolute",
                              color: "white",
                              background: "rgba(0,0,0,0.7)",
                              padding: "15px",
                              borderRadius: "8px",
                              zIndex: 10,
                              maxWidth: "80%",
                              textAlign: "center",
                         }}
                    >
                         <div
                              style={{ marginBottom: "10px", fontSize: "18px" }}
                         >
                              {status}
                         </div>
                         <div style={{ fontSize: "14px", opacity: 0.8 }}>
                              Si le problème persiste, essayez de rafraîchir la
                              page ou utilisez un autre navigateur.
                         </div>
                    </div>
               )}
          </div>
     );
}
