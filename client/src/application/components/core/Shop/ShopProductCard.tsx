import { IPoint } from "@types";
import LoaderProduct from "application/components/common/Loaders/loaderProduct";
import convertWeight from "application/helpers/convertWeight";
import AddToCart from "presentation/viewModel/viewShop/AddToCart";
import AddToFavorites from "presentation/viewModel/viewShop/AddToFavorites";
import { FC, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { adapterSelector } from "servises/redux/selectors/selectors";
import { useGetProductCartQuery } from "servises/repository/RTK/RTKShop"


type IProps = {
  productId: string
  setgrop:any
}

const ShopProductCard: FC<IProps> = ({ productId, setgrop }) => {
  const organization = adapterSelector.createSelectors<IPoint>(selector => selector.point, val => val.id)
  const { data:product, isLoading } = useGetProductCartQuery(productId)
  
  useEffect(() => {

    !isLoading && setgrop(product?.categoryImage)
  }, [product])
  
  return (
    (!isLoading && product) ? 
      <>
      <div className="product-card__image-wrap">
        <div className="container">

            <img className="product-card__image" src={product.image} alt="Картинка продукта" />

            <div className="product-card__title">{product.name}</div>
            <div className="row justify-between">
                <AddToFavorites id={productId} _class="add-favorite" isFav={product.isFav} />
                {/* <button className="add-favorite"></button> */}
                <div className="product-card__price">
                    <div className="product-card__measure">
                        {
                            product.measureUnit === "порц" ? `${convertWeight(product.weight)} г` : "1 шт"
                        }
                    </div>
                    <span className="select-red">{product.price} ₽</span>
                </div>
                <AddToCart id={productId} groupImage={product.categoryImage} _class={"product-card__add"} />
            </div>
          </div>
          
        </div>
        
        <div className="container">
                <div className="product-card__description">
                    {
                        product.description
                    }
                </div>
                {/* <div className="product-card__ingredients">
                    <div className="product-card__ingredients__heading">Ингридиенты: </div>
                    {
                        product.additionalInfo
                    }
                </div> */}
                {/* {
                    sauces ? (
                        <div className="product-card__sauces">
                            <div className="product-card__sauces__heading select-red">
                                <span className="border_dotted-circle">
                                    <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                                </span>
                                Подать с соусом?
                                <span className="border_dotted-circle">
                                    <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                                </span>
                            </div>

                            {
                                sauces.map(sauce=>{
                                    return <Sauce key={sauce.id} {...sauce}/>
                                })
                            }
                            
                        </div>
                    ) : ''
                } */}

            </div>
      </>
     : <LoaderProduct />
    
  )
}
export default ShopProductCard