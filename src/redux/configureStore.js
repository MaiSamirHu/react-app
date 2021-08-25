import {createStore,combineReducers} from 'redux';
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Leaders } from './leaders';
import { Promotions } from './promotions';
export const ConfigureStore=()=>{
    const store=createStore(
        
        combineReducers({
            comments:Comments,
            dishes :Dishes,
            promotions :Promotions,
            leaders:Leaders
        })
        
    );
    return store;
};