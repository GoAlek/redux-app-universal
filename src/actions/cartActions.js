"use strict"

export function addToCart(cartItem) {
    return {
        type:"ADD_TO_CART",
        payload:cartItem
    }
}

export function updateCartItem(_id, unit, cart) {
    // Create a copy of the current array of books
    const currentBooksToUpdate = cart;
    const findCartItemById = function(cartItem) {
        return cartItem._id === _id;
    }
    const indexToUpdate = currentBooksToUpdate.findIndex(findCartItemById);

    const newBookToUpdate = {
        ...currentBooksToUpdate[indexToUpdate],
        quantity: currentBooksToUpdate[indexToUpdate].quantity + unit
    }

    let cartUpdate = [...currentBooksToUpdate.slice(0, indexToUpdate), newBookToUpdate,
        ...currentBooksToUpdate.slice(indexToUpdate + 1)];

    return {
        type:"UPDATE_CART_ITEM",
        payload: cartUpdate
    }
}

export function deleteCartItem(_id) {
    return {
        type:"DELETE_CART_ITEM",
        _id: _id
    }
}