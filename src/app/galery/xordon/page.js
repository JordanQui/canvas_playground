import Xordon from "../../../components/Xordon";

export default function XordonContainer() {
     return (
          <div
               style={{
                    display: "flex",
                    justifyContent: "center",
                    "flex-direction": "column",
               }}
          >
               <Xordon id="canvas1" />
          </div>
     );
}
