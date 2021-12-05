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
  const organization = adapterSelector.createSelectors<IPoint>(selector => selector.point, val => val._id)
  const { data, isLoading } = useGetProductCartQuery({ productId, organization })
  
  useEffect(() => {

    !isLoading && setgrop(data?.group)
  }, [data])
  
  return (
    (!isLoading && data) ? 
      <div className="product-card__image-wrap">
        <div className="container">

            <img className="product-card__image" src={data.product.image} alt="Картинка продукта" />

            <div className="product-card__title">{data.product.name}</div>
            <div className="row justify-between">
                <AddToFavorites id={data.product.id} _class="add-favorite" isFav={data.product.isFav} />
                {/* <button className="add-favorite"></button> */}
                <div className="product-card__price">
                    <div className="product-card__measure">
                        {
                            data.product.measureUnit === "порц" ? `${convertWeight(data.product.weight)} г` : "1 шт"
                        }
                    </div>
                    <span className="select-red">{data.product.price} ₽</span>
                </div>
                <AddToCart id={productId} groupImage={data.group.image} _class={"product-card__add"} />
            </div>
          </div>
          {
              data.product.code && data.product.code.match(/^HI-\d+$/) ?
                <div className="product-card__henkali-info">
                  <div className="product-card__order-from">Заказ от 3 шт.</div>
                  <div className="product-card__bonus">
                      При заказе дюжины хинкалей<br />
                      Вы платите за 11!
                  </div>
                </div> : ''
        }
        <div className="container">
                <div className="product-card__description">
                    {
                        data.product.description
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
      </div>
      
     : <LoaderProduct />
    
  )
}
export default ShopProductCard