import * as api from "../API";
import { FETCH_ALL,PLACE_ORDER,UPDATE,DELETE } from "../constants/actionTypes";

//action creators
export const getOrders = () => async (dispatch) => {
  try {
    const { data } = await api.fetchOrders();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};


export const placeOrder=(order)=>async(dispatch)=>{
    try {
        const{data}=await api.placeOrder(order);
        dispatch({type:PLACE_ORDER,payload:data});
    } catch (error) {
        console.log(error);
    }
}

export const updateOrder =(id,order)=>async(dispatch)=>{
  try {
    const {data}=await api.updateOrder(id,order);

    dispatch({type:UPDATE,payload:data});
  } catch (error) {
    console.log(error.message);
  }
}

export const deleteOrder=(id) => async(dispatch) => {
try {
  await api.deleteOrder(id);
  dispatch({type:DELETE,payload:id});
} catch (error) {
  console.log(error);
}
}