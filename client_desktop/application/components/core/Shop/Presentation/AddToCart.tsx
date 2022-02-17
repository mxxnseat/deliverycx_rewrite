/* eslint-disable prefer-const */
import { FC, memo, useMemo, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import debounce from 'lodash.debounce';
import { useSpring, animated, config } from 'react-spring'
import { RequestCart } from "servises/repository/Axios/Request";
import { ReactNode } from 'react';
import { adapterComponentUseCase } from "adapters/adapterComponents";
import { useCaseShopAddToCard } from "domain/use-case/useCaseShop";

interface IProps { 
    id: string,
    _class:string,
    groupImage?: string
    children?:ReactNode
}

const AddToCart: FC<IProps> = ({ id, _class, groupImage, children }) => {
  const useCaseProductCard = adapterComponentUseCase(useCaseShopAddToCard)
  const {debouncedChangeHandler} = useCaseProductCard.handlers
    
    return (
        <>
        <div className="hot_box"  onClick={debouncedChangeHandler}>  
            <animated.div className="hot" />
            {
              children ? children : <img src="/images/icon/add-item.png" alt=""/>
              
            }
            
        </div>    
        </>
    )
}

export default memo(AddToCart);