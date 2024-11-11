import TheEye from "../../../components/TheEye";

export default function XordonContainer() {
     return (
          <div
               style={{
                    display: "flex",
                    justifyContent: "center",
                    "flex-direction": "column",
               }}
          >
               <TheEye id="canvas1" />
          </div>
     );
}
