import {Link, useLocation, useNavigate} from "@tanstack/react-router";
import {useDisclosure} from "@mantine/hooks";
import useNavLinks from "../../hooks/useNavlinks.tsx";
import NavLinks from "./navlinks.tsx";
import {Burger, Button, Drawer} from "@mantine/core";
import {IconX} from "@tabler/icons-react";
import useUser from "../../hooks/useUser.tsx";
import NotificationMenu from "./notificationMenu.tsx";
import ProfileMenu from "./profileMenu.tsx";

const Header = () => {
    const { user } = useUser();
    const [opened, { open, close }] = useDisclosure(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { links } = useNavLinks();

    return location.pathname != '/signup' && location.pathname != '/login' ? (
        <div className={'w-full text-white flex justify-between items-center p-6 bg-mine-shaft-950 h-20 font-[poppins]'}>
            <div className={'flex gap-3 items-center text-bright-sun-400 cursor-pointer'} onClick={() => navigate({ to: "/" })}>
                <img src="/assets/Fishing-Rod.svg" alt="SVG Icon" className="w-12 h-12" />
                <div className={'xs-mx:hidden text-3xl font-semibold'}>
                    JobFetch
                </div>
            </div>
            <NavLinks />
            <div className={'flex gap-3 items-center'}>
                {user ? <ProfileMenu /> : <Link to={'/auth/login'}>
                    <Button variant={'subtle'} color={'bright-sun.4'} onClick={() => navigate({ to: "/auth/login"})}>
                        Login / Signup
                    </Button>
                </Link>}
                {user ? <NotificationMenu /> : null}

                <Burger className="bs:hidden" opened={opened} onClick={open} aria-label="Toggle navigation" />
                <Drawer size={"xs"} overlayProps={{ backgroundOpacity: 0.5, blur: 4 }} opened={opened} onClose={close} position={"right"} title="Authentication" closeButtonProps={{ icon: <IconX size={30} /> }}>
                    <div className={`flex flex-col gap-6 items-center`} onClick={(e) => {
                        const target = e.target as HTMLElement;
                        const targetDiv = target.closest("[datatype='child']")
                        if (targetDiv) close();
                    }}>
                        {links.map((link, index) => (
                            <div key={index}
                                 className={`h-full flex items-center`} datatype={"child"}>
                                <Link to={`/${link.url}`} className="hover:text-bright-sun-400 text-xl">
                                    {link.name}
                                </Link>
                            </div>
                        ))}
                    </div>
                </Drawer>
            </div>
        </div>
    ) : <></>
}

export default Header
