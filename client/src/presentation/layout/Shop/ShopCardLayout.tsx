import { ICategory } from "@types";
import ShopLinkToCart from "application/components/core/Shop/ShopLinkToCart";
import ShopProductCard from "application/components/core/Shop/ShopProductCard"
import HeaderBack from "presentation/viewModel/viewHead/HeaderBack"
import { FC, useState } from "react"
import { RouteComponentProps } from "react-router";

interface IMatchProps {
  id: string
}
type RouteProps = RouteComponentProps<IMatchProps>;

const ShopCardLayout:FC<RouteProps> = ({ match }) => {
  const [group, setGroup] = useState<string>()
  const productId = match.params.id;

  return (
    <div className="product-card">
            <HeaderBack backgroundColor="#fff">
                <div className="product-card__category">
                    <div className="category-image-wrap">
                        <img src={group} />
                    </div>
                </div>
            </HeaderBack>    
            <ShopProductCard productId={productId} setgrop={setGroup} />
            <ShopLinkToCart />
    </div>
  )
}
export default ShopCardLayout