import Gliss2 from "../../../components/Gliss2";

export default function GlissContainer() {
     return (
          <div
               style={{
                    display: "flex",
                    justifyContent: "center",
                    "flex-direction": "column",
               }}
          >
               <Gliss2 id="canvas1" />
          </div>
     );
}
