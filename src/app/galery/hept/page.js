import Hept from "../../../components/Hept";

export default function HeptContainer() {
     return (
          <div
               style={{
                    display: "flex",
                    justifyContent: "center",
                    "flex-direction": "column",
               }}
          >
               <Hept id="canvas1" />
          </div>
     );
}
