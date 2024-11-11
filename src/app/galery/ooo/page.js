import Ooo from "../../../components/Ooo";

export default function OooContainer() {
     return (
          <div
               style={{
                    display: "flex",
                    justifyContent: "center",
                    "flex-direction": "column",
               }}
          >
               <Ooo id="canvas1" />
          </div>
     );
}
