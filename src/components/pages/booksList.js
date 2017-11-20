"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getBooks} from '../../actions/booksActions';
import {Grid, Col, Row, Button} from 'react-bootstrap';

import BookItem from './bookItem';
import BooksForm from './booksForm';
import Cart from './cart';

class BooksList extends React.Component {
    componentDidMount() {
        //Dispatch an action  
        this.props.getBooks();
    }

    render() {
        const booksList = this.props.books.map(function(book, index) {
            return(
                <Col xs={12} sm={6} md={4} key={book._id}>
                    <BookItem
                        _id={book._id}
                        title={book.title}
                        description={book.description}
                        price={book.price}/>
                </Col>
            )
        })
        return(
            <Grid>
                <Row>
                    <Cart />
                </Row>
                <Row style={{marginTop:'15px'}}>
                    <Col xs={12} sm={6}>
                        <BooksForm />
                    </Col>
                    {booksList}
                </Row>
            </Grid>
        )
    }
}

function mapStateToProps(state) {
    return {
        books: state.books.books
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getBooks:getBooks
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);