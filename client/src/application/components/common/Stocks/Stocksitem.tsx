/* eslint-disable @typescript-eslint/no-var-requires */
import { FC } from "react";

interface IStock{
    content: string
}

const StocksItem: FC<IStock> = ({content}) => {


    return (
        <img className="stocks__item" src={require("assets/img/stock2/" + content).default} />
    )
}

export default StocksItem;