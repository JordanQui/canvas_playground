"use client";

import { useState, useEffect } from "react";
import Sketch0001 from "../../../components/Sketch0001";

export default function GlissContainer() {
     const [key, setKey] = useState(0);

     // useEffect(() => {
     //      const interval = setInterval(() => {
     //           setKey((prevKey) => prevKey + 1);
     //      }, 1000);

     //      return () => clearInterval(interval);
     // }, []);

     return (
          <div
               style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
               }}
          >
               <Sketch0001 key={key} id={key.toString()} />
          </div>
     );
}
