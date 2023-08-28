import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import './App.css'
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';


//IMPORT SCREENS
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Game from "./pages/Game";
import Cart from "./pages/Cart";
import AddGame from "./pages/AddGame";


import reducers from './store/reducers';
import EditGame from './pages/EditGame';

const RootReducer = combineReducers({
  Reducer: reducers
});

const store = createStore(RootReducer, applyMiddleware(ReduxThunk));

function App() {

  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/addProduct" element={<AddGame/>} />
            <Route path="/editGame/:gameId" element={<EditGame/>} />
            <Route path="/review-details/:gameId" element={<Game/>} />
            <Route path="/cart" element={<Cart/>} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
