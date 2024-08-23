import Dashboard from "@/components/Dashboard";
import Login from "@/components/Login";
import Main from "@/components/Main";
export const metadata = {
    title: "Broodl . DashBoard",
  };
export default function DashBoardPage(){
    const isAuthenticated=false
    let children=(<Login/>)
    if(isAuthenticated){
        children=(<DashBoardPage/>)
    }
    return(
        <Main>{children}</Main>
    )
}

  