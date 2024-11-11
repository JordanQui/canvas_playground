import Kdiff from "../../../components/Kdiff";

export default function KdiffContainer() {
     return (
          <div
               style={{
                    display: "flex",
                    justifyContent: "center",
                    "flex-direction": "column",
               }}
          >
               <Kdiff id="canvas1" />
          </div>
     );
}
