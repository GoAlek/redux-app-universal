"use strict"
import React from 'react';
import {Col, Row, Well, Panel, FormControl, FormGroup, ControlLabel, Button, Image, InputGroup, DropdownButton, MenuItem} from 'react-bootstrap';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';

import {postBooks, deleteBooks, getBooks} from '../../actions/booksActions';
import axios from 'axios';

class BooksForm extends React.Component{

    constructor() {
        super();
        this.state = {
            images:[{}],
            img:''
        }
    }

    componentDidMount() {
        this.props.getBooks();
        //GET IMAGES FROM API
        axios.get('/api/images')
            .then((response) => {
                this.setState({images: response.data});
            })
            .catch((err) => {
                this.setState({images: 'error while loading image files from server', img:''})
            })
    }

    handleSelect(imgName) {
        this.setState({
            img: '/images/' + imgName
        })
    }

    handleSubmit() {
        const book = [{
            title: findDOMNode(this.refs.title).value,
            description: findDOMNode(this.refs.description).value,
            images: findDOMNode(this.refs.images).value,
            price: findDOMNode(this.refs.price).value
        }]
        this.props.postBooks(book);
    }

    onDelete() {
        let bookId = findDOMNode(this.refs.delete).value;

        this.props.deleteBooks(bookId);
    }

    render() {
        const booksList = this.props.books.map(function(book) {
            return (
                <option key={book._id}>{book._id}</option>
            )
        })

        const imgList = this.state.images.map(function(imgArr, i) {
            return(
                <MenuItem key={i} eventKey={imgArr.name}
                    onClick={this.handleSelect.bind(this, imgArr.name)}>{imgArr.name}</MenuItem>
            )
        }, this)

        return(
            <Well>
                <Row>
                    <Col xs={12} sm={6}>
                        <InputGroup>
                            <FormControl type="text" ref="images" value={this.state.img}/>
                                <DropdownButton
                                    componentClass={InputGroup.Button}
                                    id="input-dropdown-addon"
                                    title="Select an image"
                                    bsStyle="primary">
                                    {imgList}
                            </DropdownButton>
                        </InputGroup>
                        <Image src={this.state.img} responsive/>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Panel>
                            <FormGroup controlId="title">
                                <ControlLabel>Title</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter title"
                                    ref="title"/>
                            </FormGroup>
                            <FormGroup controlId="description">
                                <ControlLabel>Description</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter description"
                                    ref="description"/>
                            </FormGroup>
                            <FormGroup controlId="price">
                                <ControlLabel>Price</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter price"
                                    ref="price"/>
                            </FormGroup>
                            <Button onClick={this.handleSubmit.bind(this)} bsStyle="primary">Save book</Button>
                        </Panel>
                        <Panel style={{marginTop:'25px'}}>
                            <FormGroup controlId="formControlsSelect">
                                <ControlLabel>Select a book id to delete</ControlLabel>
                                <FormControl ref="delete" componentClass="select" placeholder="select">
                                    <option value="select">select</option>
                                        {booksList}
                                </FormControl>
                            </FormGroup>
                            <Button bsStyle="danger" onClick={this.onDelete.bind(this)}>Delete book</Button>
                        </Panel>
                    </Col>
                </Row>                
            </Well>
        )
    }
}

function mapStateToProps(state) {
    return {
        books: state.books.books
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        getBooks,
        postBooks,
        deleteBooks
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);

