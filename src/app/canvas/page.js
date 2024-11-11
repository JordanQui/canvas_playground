import Link from "next/link";

export default function Galery() {
     return (
          <div
               style={{
                    display: "flex",
                    justifyContent: "center",
                    "flex-direction": "column",
               }}
          >
               <div>
                    <ul>
                         <li>
                              <Link href="/galery/gliss">Gliss</Link>
                         </li>
                         <li>
                              <Link href="/galery/xordon">Xordon</Link>
                         </li>
                         <li>
                              <Link href="/galery/numbers">Numbers</Link>
                         </li>
                         <li>
                              <Link href="/galery/hept">Hept</Link>
                         </li>
                         <li>
                              <Link href="/galery/theeye">The Eye</Link>
                         </li>
                         <li>
                              <Link href="/galery/babies">Babies</Link>
                         </li>
                         <li>
                              <Link href="/galery/stairs">Stairs</Link>
                         </li>
                         <li>
                              <Link href="/galery/five">Five</Link>
                         </li>
                         <li>
                              <Link href="/galery/riveal">Riveal</Link>
                         </li>
                         <li>
                              <Link href="/galery/ooo">Ooo</Link>
                         </li>
                         <li>
                              <Link href="/galery/ooo2">Ooo2</Link>
                         </li>
                         <li>
                              <Link href="/galery/kdiff">Kdiff</Link>
                         </li>
                         <li>
                              <Link href="/galery/pourquoi">Pourquoi</Link>
                         </li>
                    </ul>
               </div>
          </div>
     );
}
