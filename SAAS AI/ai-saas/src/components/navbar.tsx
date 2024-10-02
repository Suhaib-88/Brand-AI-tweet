import { Menu } from "lucide-react"
import { Button } from "./ui/button"
import { UserButton } from "@clerk/nextjs"

const Navbar = ()=> {
    return(
        <div className="flex items-center p-4">
            <Button variant= 'ghost'>
                <Menu/>
                <div className="flex w-full justify-end">
                    <UserButton afterSignOutUrl="/" />
                </div>
            </Button>

        </div>
    )
}