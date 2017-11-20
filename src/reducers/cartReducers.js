"use strict"

export function cartReducers(state={cart:[]}, action) {
    switch(action.type) {
        case "ADD_TO_CART":
            return {
                ...state, 
                cart: action.payload,
                totalAmount: totals(action.payload).amount,
                totalQuantity: totals(action.payload).quantity
            }
        case "UPDATE_CART_ITEM":
            // Create a copy of the current array of books
            const currentBooksToUpdate = [...state.cart];
            const findcartItemById = function(cartItem) {
                return cartItem._id === action._id;
            }
            const indexToUpdate = currentBooksToUpdate.findIndex(findcartItemById);

            const newBookToUpdate = {
                ...currentBooksToUpdate[indexToUpdate],
                quantity: currentBooksToUpdate[indexToUpdate].quantity + action.unit
            }

            let cartUpdate = [...currentBooksToUpdate.slice(0, indexToUpdate), newBookToUpdate,
                ...currentBooksToUpdate.slice(indexToUpdate + 1)];

            return {
                ...state,
                cart:cartUpdate,
                totalAmount: totals(cartUpdate).amount,
                totalQuantity: totals(cartUpdate).quantity
            }
        case "DELETE_CART_ITEM":
            return {
                ...state,
                cart:action.payload,
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