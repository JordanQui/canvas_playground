import Gliss from "../../../components/Gliss";

export default function GlissContainer() {
     return (
          <div
               style={{
                    display: "flex",
                    justifyContent: "center",
                    "flex-direction": "column",
               }}
          >
               <Gliss id="canvas1" />
          </div>
     );
}
