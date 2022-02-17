import { FC, ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";

type IProps = {
  onClose:any
  children:ReactNode
}

const Modals:FC<IProps> = ({onClose,children}) => {
  const [isBrowser, setIsBrowser] = useState<boolean>(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);


  const modalContent = (
    <div className="modal">
      <div className="modal_overlay" onClick={onClose}></div>
      {children}
    </div>
    
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
export default Modals