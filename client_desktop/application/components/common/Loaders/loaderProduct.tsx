import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { Oval } from  'react-loader-spinner'


const divStyle = {
    width: "100%",
    "display": "flex",
    "justifyContent": "center",
    margin: "0 auto"
}

const LoaderProduct = () => {
    return (
        <div className="loader_box" style={divStyle}>
            <Oval
  ariaLabel="loading-indicator"
  height={50}
  width={50}
  strokeWidth={3}
  color="#8D191D"
  secondaryColor="#8C8C8C"
/>
        </div>)
}

export default LoaderProduct;