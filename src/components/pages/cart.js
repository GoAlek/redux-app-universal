"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {Panel, Col, Row, Well, Button, ButtonGroup, Label, Modal} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {addToCart, deleteCartItem, updateCartItem} from '../../actions/cartActions';

class Cart extends React.Component {
    
    onDelete(_id) {
        this.props.deleteCartItem(_id);
    }

    onIncrement(_id) {
        this.props.updateCartItem(_id, 1, this.props.cart);
    }

    onDecrement(_id, quantity) {
        if (quantity > 1) {
            this.props.updateCartItem(_id, -1, this.props.cart);
        }
    }

    constructor() {
        super();
        this.state = {
            showModal:false
        }
    }

    open() {
        this.setState({showModal:true});
    }

    close() {
        this.setState({showModal:false});
    }

    render() {
        return (this.props.cart[0]) ? this.renderCart() : null;
    }
    
    renderCart() {
        const cartItemsList = this.props.cart.map(function(cartItem) {
            return(
                <Panel key={cartItem._id + 'cart'}>
                    <Row>
                        <Col xs={12} sm={4}>
                            <h6>{cartItem.title}</h6>
                            <span>     </span>
                        </Col>
                        <Col xs={12} sm={2}>
                            <h6>usd. {cartItem.price}</h6>
                        </Col>
                        <Col xs={12} sm={2}>
                            <h6>qty. <Label bsStyle="success">{cartItem.quantity}</Label></h6>
                        </Col>
                        <Col xs={6} sm={4}>
                            <ButtonGroup style={{minWidth:'300px'}}>
                                <Button 
                                    bsStyle="default" 
                                    bsSize="small"
                                    onClick={this.onDecrement.bind(this, cartItem._id, cartItem.quantity)}>
                                        -
                                </Button>
                                <Button 
                                    bsStyle="default" 
                                    bsSize="small"
                                    onClick={this.onIncrement.bind(this, cartItem._id)}>
                                        +
                                </Button>
                                <span>     </span>
                                <Button 
                                    bsStyle="danger" 
                                    bsSize="small" 
                                    onClick={this.onDelete.bind(this, cartItem._id)}>
                                        DELETE
                                </Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Panel>
            )
        }, this)

        return(
            <Panel header="Cart" bsStyle="primary">
                {cartItemsList}
                <Row>
                    <Col xs={12}>
                        <h6>Total amount: {this.props.totalAmount}</h6>
                        <Button onClick={this.open.bind(this)} bsStyle="success" bsSize="small">
                            PROCEED TO CHECKOUT
                        </Button>
                    </Col>
                </Row>
                <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h6>Your order has been saved</h6>
                        <p>You will recieve an email confirmation</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Col xs={6}>
                            <h6>total $: {this.props.totalAmount}</h6>
                        </Col>
                        <Button onClick={this.close.bind(this)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </Panel>
        )
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart.cart,
        totalAmount: state.cart.totalAmount
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        deleteCartItem:deleteCartItem,
        updateCartItem:updateCartItem
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
