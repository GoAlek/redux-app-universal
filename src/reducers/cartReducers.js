"use strict"

export function cartReducers(state={cart:[]}, action) {

    const findCartItemById = function(cartItem) {
        return cartItem._id === action._id;
    }

    switch(action.type) {
        case "GET_CART":
            return {
                ...state, 
                cart: action.payload,
                totalAmount: totals(action.payload).amount,
                totalQuantity: totals(action.payload).quantity
            }
        case "ADD_TO_CART":
            return {
                ...state, 
                cart: action.payload,
                totalAmount: totals(action.payload).amount,
                totalQuantity: totals(action.payload).quantity
            }
        case "UPDATE_CART":
            return {
                ...state,
                cart: action.payload,
                totalAmount: totals(action.payload).amount,
                totalQuantity: totals(action.payload).quantity
            }
        case "DELETE_CART_ITEM":
            return {
                ...state,
                cart: action.payload,
                totalAmount: totals(action.payload).amount,
                totalQuantity: totals(action.payload).quantity
            }
    }
    return state;
}

//CALCULATE TOTALS
export function totals(cartItems) {

    const sum = function(prev, curr) {
        return prev + curr;
    }

    const totalAmount = cartItems.map(function(cartItem) {
        return cartItem.price * cartItem.quantity;
    }).reduce(sum, 0);

    const totalQuantity = cartItems.map(function(cartItem) {
        return cartItem.quantity;
    }).reduce(sum, 0);

    return {
        amount:totalAmount.toFixed(2),
        quantity:totalQuantity
    };
}