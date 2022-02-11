import { FC } from "react";

interface IStock{
    content: string
}

const StocksItem: FC<IStock> = ({content}) => {


    return (
        <img className="stocks__item" src={"./images/" + content} />
    )
}

export default StocksItem;