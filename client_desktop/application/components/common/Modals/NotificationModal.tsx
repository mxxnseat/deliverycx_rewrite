import { FC, ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";

type IProps = {
  children:ReactNode
}

const NotificationModal:FC<IProps> = ({children}) => {
  const [isBrowser, setIsBrowser] = useState<boolean>(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);


  const modalContent = (
    <>{children}</>
    
  )

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.body
    );
  } else {
    return null;
  }
  

}
export default NotificationModal