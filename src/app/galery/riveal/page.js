import Riveal from "../../../components/Riveal";

export default function RivealContainer() {
     return (
          <div
               style={{
                    display: "flex",
                    justifyContent: "center",
                    "flex-direction": "column",
               }}
          >
               <Riveal id="canvas1" />
          </div>
     );
}
