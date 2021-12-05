import { ICategory } from "@types";
import ShopProductCard from "application/components/core/Shop/ShopProductCard"
import HeaderBack from "presentation/viewModel/viewHead/HeaderBack"
import { FC, useState } from "react"
import { RouteComponentProps } from "react-router";

interface IMatchProps {
  id: string
}
type RouteProps = RouteComponentProps<IMatchProps>;

const ShopCardLayout:FC<RouteProps> = ({ match }) => {
  const [group, setGroup] = useState<ICategory>({} as ICategory)
  const productId = match.params.id;
  console.log(group)
  return (
    <div className="product-card">
            <HeaderBack backgroundColor="#fff">
                <div className="product-card__category">
                    <div className="category-image-wrap">
                        <img src={group.image} />
                    </div>
                </div>
            </HeaderBack>    
            <ShopProductCard productId={productId} setgrop={setGroup} />
    </div>
  )
}
export default ShopCardLayout