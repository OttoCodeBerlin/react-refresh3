import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import Container from 'react-bootstrap/Container'
import CardDeck from 'react-bootstrap/CardDeck'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import FoodCard from './components/FoodCard'

import foods from './foods.json'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      foods,
      formIsVisible: false,
    }
    console.log(this.state.foods)

    this.handleOpenForm = this.handleOpenForm.bind(this)
    this.handleAddFood = this.handleAddFood.bind(this)
  }

  handleOpenForm = function () {
    this.setState({
      formIsVisible: !this.state.formIsVisible,
    })
  }

  handleAddFood = function () {
    const idx = Math.floor(Math.random() * this.state.contactsRemainder.length)
    this.setState({
      contactsInit: [...this.state.contactsInit, this.state.contactsRemainder[idx]],
    })
  }

  render() {
    return (
      <div>
        <Container>
          <h1 className="m-4">Welcome To Your Nutrition Manager</h1>
          <hr />
          <Button className="mb-3 mr-2" variant="primary" onClick={this.handleOpenForm}>
            Add Your Food
          </Button>
          {this.state.formIsVisible && (
            <Form>
              <Form.Group as={Row} controlId="formHorizontalName">
                <Form.Label column sm={4}>
                  Name
                </Form.Label>
                <Col sm={8}>
                  <Form.Control type="text" placeholder="e.g. Schweinebraten" />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formHorizontalCalories">
                <Form.Label column sm={4}>
                  Calories
                </Form.Label>
                <Col sm={8}>
                  <Form.Control type="number" placeholder="e.g. 800" />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formHorizontalImg">
                <Form.Label column sm={4}>
                  Image URL
                </Form.Label>
                <Col sm={8}>
                  <Form.Control type="text" placeholder="www.xxx.com/xyz.jpg" />
                </Col>
              </Form.Group>
              <Button className="mb-3 mr-2" variant="outline-primary" onClick={this.handleOpenForm}>
                Add
              </Button>
              <Button className="mb-3 mr-2" variant="outline-secondary" onClick={this.handleOpenForm}>
                Close
              </Button>
            </Form>
          )}

          <hr />
        </Container>
        <Container>
          <CardDeck>
            {this.state.foods.map((el, idx) => (
              <FoodCard key={idx} name={el.name} cals={el.calories} qty={el.quantity} img={el.image} />
            ))}
          </CardDeck>
        </Container>
      </div>
    )
  }
}
