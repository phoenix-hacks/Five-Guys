import Heading from "./Heading";
import Options from "./Options";
import './SideBar.css';


function SideBar(){
    return(
        <div className="sidebar">
            <Heading/>
            <Options/>
        </div>
    )
}

export default SideBar;