"use client"; // Indique que ce composant est côté client

import Link from "next/link";
import { useState } from "react";

export default function Home() {
     const sketches = [
          { name: "Sketch 001", path: "/canvas/sketch0001" },
          { name: "Sketch 002", path: "/canvas/sketch0002" },
          { name: "Sketch 003", path: "/canvas/sketch0003" },
          { name: "Sketch 004", path: "/canvas/sketch0004" },
          // { name: "Sketch 004", path: "/canvas/sketch0004" },
     ];

     return (
          <div
               style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    "background-color": "white"
               }}
          >
               {sketches.map((sketch, index) => (
                    <HoverButton
                         key={index}
                         href={sketch.path}
                         label={sketch.name}
                    />
               ))}
          </div>
     );
}

// Composant pour les boutons avec gestion d'événements
function HoverButton({ href, label }) {
     const [isHovered, setIsHovered] = useState(false);

     return (
          <Link
               href={href}
               style={{
                    display: "block",
                    margin: "10px 0",
                    padding: "10px 20px",
                    border: isHovered ? "4px solid black" : "2px solid black",
                    textAlign: "center",
                    textDecoration: "none",
                    fontSize: "16px",
                    color: "black",
                    width: "200px",
                    transition: "all 0.3s",
                    height: "50px"
               }}
               onMouseEnter={() => setIsHovered(true)}
               onMouseLeave={() => setIsHovered(false)}
          >
               {label}
          </Link>
     );
}
