import Babies from "../../../components/Babies";

export default function XordonContainer() {
     return (
          <div
               style={{
                    display: "flex",
                    justifyContent: "center",
                    "flex-direction": "column",
               }}
          >
               <Babies id="canvas1" />
          </div>
     );
}
