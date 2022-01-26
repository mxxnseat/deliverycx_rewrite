import "./scss/index.scss";

import ReactDOM from 'react-dom';
import App from 'application/App';
import { store,persistor } from 'servises/redux/createStore';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
const history = createBrowserHistory()
// alert(1);
// d()
// console.log(process.env);
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <App />
    {/* <div>hello world</div> */}
    </PersistGate>
    
    
  </Provider>,
	document.getElementById('root')
);

