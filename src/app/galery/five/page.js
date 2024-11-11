import Five from "../../../components/Five";

export default function FiveContainer() {
     return (
          <div
               style={{
                    display: "flex",
                    justifyContent: "center",
                    "flex-direction": "column",
               }}
          >
               <Five id="canvas1" />
          </div>
     );
}
