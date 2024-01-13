import Link from "next/link";
import Login from "./Login";
import { getServerSession } from "next-auth";
import {authOptions} from "../../pages/api/auth/[...nextauth]"
import Logged from "./Logged"
import { MySession } from "../interfaces/Session"


export default async function Nav() {
    const session = (await getServerSession(authOptions)) as MySession
    //console.log(session,'nav session')
    return(
        <nav className="flex justify-between items-center py-8">
            <Link href={"/"}>
                <h1 className="font-bold text-lg">Send it.</h1>
            </Link>
            <ul className="flex items-center gap-6">
                {/* {!session?.user && <Login/>}
                {session?.user && <h1>Welcome {session.user.name}</h1>} */}
                {!session?.user ? (<Login/>) : 
                (<div><h1 className="text-center">Welcome {session?.user.name}</h1> <Logged image={session.user?.image||""}/></div>)}
            </ul>
        </nav>
        )
}