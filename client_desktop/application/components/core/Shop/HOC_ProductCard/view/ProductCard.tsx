import { IProduct } from "@types"
import convertWeight from "application/helpers/convertWeight"
import { FC } from "react"
import AddToCart from "../../Presentation/AddToCart"

type IProps = {
  product:IProduct
  onClose:any
}

const ProductCard:FC<IProps> = ({product,onClose}) => {
  return (
    <>
    {
      product && (
      <div className="product_card">
    		<div className="product_card-container">
    			<div className="close" onClick={onClose}>
    				<img src="/images/icon/close.png" alt=""/>
    			</div>
    			<div className="product_card__item__img-wrap">
    				<div>
    					<img src={product.image} alt=""/>
    				</div>
    			</div>
    			<div className="product_card__item__content">
    				<div className="product_card__item-title">{product.name}</div>
    				<div className="product_card__item-text">
    					{product.description}
    				</div>
    				{
              /**
               * <div className="product_card__sous">
    					<div className="product_card__sous-title">
    						<span>Соус к хинкали</span>
    					</div>
    					<div className="product_card__sous_list">
    						<div className="product_card__sous_list-item">
    							<div className="sous_list-item--name">wwww</div>
    							<div className="sous_list-item--grams">25</div>
    							<div className="sous_list-item--price">35</div>
    							<div className="sous_list-item--radio">
    								<input className="custom-radio" name="color" type="radio" id="color-green" value="green"/>
    								<label htmlFor="color-green"></label>
    							</div>
    						</div>
    						<div className="product_card__sous_list-item">
    							<div className="sous_list-item--name">wwwwwwwwwwww</div>
    							<div className="sous_list-item--grams">25</div>
    							<div className="sous_list-item--price">35</div>
    							<div className="sous_list-item--radio">
    								<input className="custom-radio" name="color" type="radio" id="color-green2" value="green"/>
    								<label htmlFor="color-green2"></label>
    							</div>
    						</div>
    					</div>
    				</div>
               * 
               */
            }
    				<div className="product_card__option">
    					<div>
    						<div className="measure">
                {
                  product.measureUnit === "порц" ? `${convertWeight(product.weight)} г` : "1 шт"
                }
                </div>
    						<div className="price">{product.price} ₽</div>
    					</div>
                  {
                    false &&
                    <div className="product_card__count-option">
      						<div className="count-option__remove"><img src="/images/icon/minus.svg" alt="минус"/></div>
      						<div className="count-option__count">1</div>
      						<div className="count-option__increment"><img src="/images/icon/plus.svg" alt="плюс"/></div>
      					</div>
              }
    					
    					
              <AddToCart id={product.id} groupImage={product.categoryImage} _class={"product-card__add"}>
                <img className="add_to" src="/images/icon/add_to-big.svg" alt=""/>
              </AddToCart>
    				</div>
    			</div>
    		</div>
    	</div>
      )
    }
    </>
    
  )
}
export default ProductCard