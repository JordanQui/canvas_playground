import Numbers from "../../../components/Numbers";

export default function NumbersContainer() {
     return (
          <div
               style={{
                    display: "flex",
                    justifyContent: "center",
                    "flex-direction": "column",
               }}
          >
               <Numbers id="canvas1" />
          </div>
     );
}
