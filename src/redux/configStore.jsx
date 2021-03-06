import { combineReducers, createStore,applyMiddleware } from "redux";
import movieReducer from "./reducers/movie.reducer";
import loginReducer from "./reducers/login.reducer";
import registerReducer from './reducers/register.reducer'
import reduxThunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import theaterReducer from "./reducers/theater.reducer";
import cinemasReducer from "./reducers/cinemas.reducer";
import showTimesReducer from "./reducers/showtimes.reducer";
import chairListReducer from "./reducers/booking.reducer";
import movieSearch from "./reducers/searchMovie.reducer";
import inforAcountReducer from "./reducers/inforAccount.reducer";
import detailTicketReducer from "./reducers/detailTicketUser.reducer";
import updateInfoReducer from "./reducers/updateInfo.reducer";
import payMoneyReducer from "./reducers/payMoney.reducer";

const rootReducer = combineReducers({
  //reducer khai báo tại đây
  movie : movieReducer,
  user : loginReducer,
  userRegister : registerReducer,
  theater : theaterReducer,
  cinemas : cinemasReducer,
  showTimes : showTimesReducer,
  chair : chairListReducer,
  movieSearch : movieSearch,
  account : inforAcountReducer,
  ticket : detailTicketReducer,
  update : updateInfoReducer,
  pay : payMoneyReducer
});

//Tham số thứ 2 của midleware khai báo tại đây
const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(reduxThunk),
  )
)


export default store;
