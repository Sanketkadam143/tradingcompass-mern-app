import * as api from "../API";
import { FETCH_ALL,PLACE_ORDER,UPDATE,DELETE ,CLIENT_MSG} from "../constants/actionTypes";

//action creators
export const getOrders = () => async (dispatch) => {
  try {
    const { data } = await api.fetchOrders();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    dispatch({
      type: CLIENT_MSG,
      message: {
        info: error.response.data?.message,
        status: error.response.status,
      },
    });
    console.log(error);
  }
};


export const placeOrder=(order)=>async(dispatch)=>{
     
    try {
        const{data,status}=await api.placeOrder(order);
        dispatch({type:PLACE_ORDER,payload:data.newOrder});
        dispatch({
          type: CLIENT_MSG,
          message: { info: data?.successMessage, status },
        });
    } catch (error) {
      dispatch({
        type: CLIENT_MSG,
        message: {
          info: error.response.data?.message,
          status: error.response.status,
        },
      });
        console.log(error);
    }
}

export const updateOrder =(id,order)=>async(dispatch)=>{
 
  try {
    const {data,status}=await api.updateOrder(id,order);

    dispatch({type:UPDATE,payload:data.updatedPosition});
    dispatch({
      type: CLIENT_MSG,
      message: { info: data.successMessage, status },
    });
  } catch (error) {
    dispatch({
      type: CLIENT_MSG,
      message: {
        info: error.response.data?.message,
        status: error.response.status,
      },
    });
    console.log(error);
  }
}

export const deleteOrder=(id) => async(dispatch) => {
try {
  const {data,status}= await api.deleteOrder(id);
  dispatch({type:DELETE,payload:id});
  dispatch({
    type: CLIENT_MSG,
    message: { info: data.successMessage, status },
  });
} catch (error) {
  dispatch({
    type: CLIENT_MSG,
    message: {
      info: error.response.data?.message,
      status: error.response.status,
    },
  });
  console.log(error);
}
}