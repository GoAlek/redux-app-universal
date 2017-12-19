"use strict"

export function cartReducers(state={cart:[]}, action) {

    const findCartItemById = function(cartItem) {
        return cartItem._id === action._id;
    }

    switch(action.type) {
        case "ADD_TO_CART":
            return {
                ...state, 
                cart: action.payload,
                totalAmount: totals(action.payload).amount,
                totalQuantity: totals(action.payload).quantity
            }
        case "UPDATE_CART_ITEM":
            return {
                ...state,
                cart: action.payload,
                totalAmount: totals(action.payload).amount,
                totalQuantity: totals(action.payload).quantity
            }
        case "DELETE_CART_ITEM":
            // Create a copy of the current array of books
            const currentBooksToDelete = [...state.cart];
            const indexToDelete = currentBooksToDelete.findIndex(findCartItemById);

            let cartDelete = [...currentBooksToDelete.slice(0, indexToDelete),
                ...currentBooksToDelete.slice(indexToDelete + 1)];

            return {
                ...state,
                cart: cartDelete,
                totalAmount: totals(cartDelete).amount,
                totalQuantity: totals(cartDelete).quantity
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