import { UserButton } from "@clerk/nextjs";

const DashboardPage=() =>{
    return (<p> Dashboad Page (Protected)
        <UserButton></UserButton>
    </p>)
}

export default DashboardPage;