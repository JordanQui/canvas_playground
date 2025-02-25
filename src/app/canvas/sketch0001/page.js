"use client";

import { useState, useEffect } from "react";
import Sketch0001 from "../../../components/Sketch0001";

export default function GlissContainer() {
     const [reloadId, setReloadId] = useState(0);

     useEffect(() => {
          const interval = setInterval(() => {
               setReloadId((prev) => prev + 1);
          }, 5000); // Rafraîchir toutes les 5 secondes

          return () => clearInterval(interval);
     }, []);

     return (
          <div
               style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    width: "100vw",
                    height: "100vh",
               }}
          >
               <Sketch0001 id="sketch0001" reload={reloadId} />
          </div>
     );
}
