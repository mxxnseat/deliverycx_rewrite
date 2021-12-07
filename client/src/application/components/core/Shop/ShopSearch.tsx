/* eslint-disable @typescript-eslint/no-var-requires */
const ShopSearch = () => {
  return (
      <div className="header__search-window">
            <div className="header__search-field">
                <div className="container">
                    <img className="header__search-field__search" src={require("assets/i/search.svg").default} />
                    <input type="text" placeholder="Искать" />
                    <img className="header__search-field__close" src={require("assets/i/close.svg").default} />
                </div>
            </div>
            <div className="header__search-list">
                <div className="container">
                    
                </div>
               
            </div>
        </div>
  )
}
export default ShopSearch