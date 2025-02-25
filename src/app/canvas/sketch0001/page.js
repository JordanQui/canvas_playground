"use client";

import { useState, useEffect } from "react";
import Sketch1 from "../../../components/Sketch0001";

export default function GlissContainer() {
     const [key, setKey] = useState(0);

     useEffect(() => {
          const interval = setInterval(() => {
               setKey(prevKey => prevKey + 1); 
          }, 20 * 60 * 1000); 

          return () => clearInterval(interval);
     }, []);

     return (
          <div
               style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
               }}
          >
               <Sketch1 key={key} id="canvas1" />
          </div>
     );
}