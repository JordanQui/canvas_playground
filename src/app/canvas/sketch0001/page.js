"use client";

import { useState, useEffect } from "react";
import Sketch0001 from "../../../components/Sketch0001";

export default function GlissContainer() {
     const [key, setKey] = useState(0);

     useEffect(() => {
          const interval = setInterval(() => {
               window.location.reload();
          }, 30 * 60 * 1000); // 30 minutes

          return () => clearInterval(interval); // Nettoyage à la suppression du composant
     }, []);

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
