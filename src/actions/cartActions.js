"use strict"

export function addToCart(cartItem) {
    return {
        type:"ADD_TO_CART",
        payload:cartItem
    }
}

export function updateCartItem(_id, unit) {
    return {
        type:"UPDATE_CART_ITEM",
        _id: _id,
        unit: unit
    }
}

export function deleteCartItem(cartItem) {
    return {
        type:"DELETE_CART_ITEM",
        payload:cartItem
    }
}