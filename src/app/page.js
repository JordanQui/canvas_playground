// pages/index.js ou app/page.js

import Dev from "../components/Dev";

export default function Home() {
     return (
          <div
               style={{
                    display: "flex",
                    "justify-content": "center",
                    "flex-direction": "column",
               }}
          >
               <Dev id="canvas1"/>
          </div>
     );
}
