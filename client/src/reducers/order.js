import { FETCH_ALL,PLACE_ORDER,UPDATE,DELETE } from "../constants/actionTypes";

const reducer= (order=[],action)=>{
    switch (action.type) {
        case FETCH_ALL:
             return action.payload.reverse();
        case PLACE_ORDER:
            return [action.payload,...order];
       case UPDATE:
            return order.map((details)=>details._id===action.payload._id ? action.payload : details);
        case DELETE:
            return order.filter((details)=>details._id !== action.payload);  
          
        default:
            return order;
    }
}



export default reducer;