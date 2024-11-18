import LoginChk from "../components/LoginChk";
import Nav from "../components/Nav";
import ApiServices from "../services/apiServices";

export default function Login ( {
    manager,
    setManager
} ){
    const isAuthenticate = ApiServices.isAuthenticate();
    if(isAuthenticate){
        return '';
    }
    return(
        <div>
            
            <Nav />
            This page is under development
            <LoginChk
                manager={manager}
                setManager={setManager}
            />
        </div>
    )
}
