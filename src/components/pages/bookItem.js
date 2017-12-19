"use strict"
import React from 'react';
import {Row, Col, Well, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from '../../../../../../AppData/Local/Microsoft/TypeScript/2.6/node_modules/redux';
import {addToCart, updateCart} from '../../actions/cartActions';

class BookItem extends React.Component {
    
    handleCart() {
        const book = [...this.props.cart, {
            _id: this.props._id,
            title: this.props.title,
            description: this.props.description,
            price: this.props.price,
            quantity: 1
        }]

        
        if (this.props.cart.length > 0) {
            let _id = this.props._id;
            const findcartItemById = function(cartItem) {
                return cartItem._id === _id;
            }
            let cartIndex = this.props.cart.findIndex(findcartItemById);

            if (cartIndex === -1) {
                this.props.addToCart(book);
            } else {
                this.props.updateCart(_id, 1, this.props.cart);
            }
        } else {
            // CART IS EMPTY
            this.props.addToCart(book);
        }

    }
    
    render() {
        const {title, description, price} = this.props;
        return(
            <Well>
                <Row>
                    <Col xs={12}>
                        <h6>{title}</h6>
                        <p>{description}</p>
                        <h6>usd. {price}</h6>
                        <Button onClick={this.handleCart.bind(this)} bsStyle='primary'>Buy now</Button>
                    </Col>
                </Row>
            </Well>
        )
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart.cart
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addToCart: addToCart,
        updateCart: updateCart
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BookItem);
