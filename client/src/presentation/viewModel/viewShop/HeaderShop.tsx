/* eslint-disable @typescript-eslint/no-var-requires */
import Menu from "application/components/common/Menu/Menu";
import { FC, memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

type IProps ={
    setSearch:any
}

const HeaderShop: FC<IProps> = ({setSearch}) => {
    const [isActiveMenu, setIsActiveMenu] = useState<boolean>(false);
    const dispatch = useDispatch();
    useEffect(() => {
        const root: HTMLElement | null = document.querySelector("#root");
        if (!root) return;

        if (isActiveMenu) {
            root.style.overflowY = "hidden";
        } else {
            root.style.overflowY = "initial";
        }
    }, [isActiveMenu]);

    return (
        <header className="header">
            <Menu isActive={isActiveMenu} setter={() => setIsActiveMenu(false)} />

            <div className="header__burger-menu" onClick={() => setIsActiveMenu(true)}></div>
            <div className="header__logo">
                <img src={require("assets/img/logo2.png").default} alt="Логотип" />
            </div>
            <div className="header__search" onClick={() => setSearch(true)}></div>
        </header>
    )
}

export default memo(HeaderShop);