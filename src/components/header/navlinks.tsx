import {Link, useLocation} from "@tanstack/react-router";
import useNavLinks from "../../hooks/useNavlinks.tsx";

const NavLinks = () => {
    const { links } = useNavLinks();
    const location = useLocation();

    return (
        <div className={'bs-mx:!hidden flex items-center gap-5 h-full  text-mine-shaft-300'}>
            {links.map((link, index) => (
                <div key={index}
                     className={`${location.pathname == "/" + link.url ? "border-bright-sun-400 text-bright-sun-400" : "border-transparent"} flex items-center border-t-[3px] h-full`}>
                    <Link to={`/${link.url}`}>
                        {link.name}
                    </Link>
                </div>
            ))}
        </div>
    )
}
export default NavLinks
