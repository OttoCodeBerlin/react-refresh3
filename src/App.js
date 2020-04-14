import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import Container from 'react-bootstrap/Container'
import CardDeck from 'react-bootstrap/CardDeck'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import InputGroup from 'react-bootstrap/InputGroup'

import FoodCard from './components/FoodCard'

import foods from './foods.json'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      filteredFoods: foods,
      foods,
      formIsVisible: false,
      name: '',
      calories: '',
      image: '',
      search: '',
      todayName: [],
      todayIdx: [],
      todayCals: [],
      todayQty: [],
      todayTotalCals: 0,
    }

    this.handleOpenForm = this.handleOpenForm.bind(this)
    this.handleAddFood = this.handleAddFood.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleClearSearchForm = this.handleClearSearchForm.bind(this)
    this.handlePlus = this.handlePlus.bind(this)
    this.handleMinus = this.handleMinus.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleOpenForm = function () {
    this.setState({
      formIsVisible: !this.state.formIsVisible,
    })
  }

  handleAddFood = function (e) {
    e.preventDefault()
    const { name, calories, image } = this.state
    const foodObj = { name, calories, image, quantity: 0 }
    const foodsCopy = [...this.state.foods]
    foodsCopy.push(foodObj)
    this.setState({
      foods: foodsCopy,
    })
    this.setState({
      name: '',
      calories: '',
      image: '',
    })
    this.handleOpenForm()
  }

  handleChange = function (e) {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSearch = function (e) {
    this.setState({ search: e.target.value })
  }

  handleClearSearchForm = function () {
    this.setState({ search: '' })
  }

  handlePlus = function (e, idx) {
    e.preventDefault()
    const foodsCopy = [...this.state.foods]
    foodsCopy[idx].quantity++
    this.setState({
      foods: foodsCopy,
    })
  }

  handleMinus = function (e, idx) {
    e.preventDefault()
    const foodsCopy = [...this.state.foods]
    if (foodsCopy[idx].quantity > 0) foodsCopy[idx].quantity--
    this.setState({
      foods: foodsCopy,
    })
  }

  handleAdd = function (e, idx) {
    e.preventDefault()
    if (this.state.foods[idx].quantity > 0) {
      if (this.state.todayIdx.find((e) => e === idx) !== undefined) {
        const smallIdx = this.state.todayIdx.findIndex((e) => e === idx)
        const qtyCopy = [...this.state.todayQty]
        qtyCopy[smallIdx] += this.state.foods[idx].quantity
        const calsCopy = [...this.state.todayCals]
        calsCopy[smallIdx] += this.state.foods[idx].calories * this.state.foods[idx].quantity
        const totalCals = this.state.todayTotalCals + this.state.foods[idx].calories * this.state.foods[idx].quantity
        const foodsCopy = [...this.state.foods]
        foodsCopy[idx].quantity = 0
        this.setState({
          todayCals: calsCopy,
          todayQty: qtyCopy,
          todayTotalCals: totalCals,
          foods: foodsCopy,
        })
      } else {
        const nameCopy = [...this.state.todayName]
        nameCopy.push(this.state.foods[idx].name)
        const idxCopy = [...this.state.todayIdx]
        idxCopy.push(idx)
        const qtyCopy = [...this.state.todayQty]
        qtyCopy.push(this.state.foods[idx].quantity)
        const calsCopy = [...this.state.todayCals]
        calsCopy.push(this.state.foods[idx].calories * this.state.foods[idx].quantity)
        const totalCals = this.state.todayTotalCals + this.state.foods[idx].calories * this.state.foods[idx].quantity
        const foodsCopy = [...this.state.foods]
        foodsCopy[idx].quantity = 0
        this.setState({
          todayName: nameCopy,
          todayCals: calsCopy,
          todayQty: qtyCopy,
          todayIdx: idxCopy,
          todayTotalCals: totalCals,
          foods: foodsCopy,
        })
      }
    }
  }

  handleDelete = function (e, idx) {
    e.preventDefault()
    const nameCopy = [...this.state.todayName]
    nameCopy.splice(idx, 1)
    const idxCopy = [...this.state.todayIdx]
    idxCopy.splice(idx, 1)
    const qtyCopy = [...this.state.todayQty]
    qtyCopy.splice(idx, 1)
    const calsCopy = [...this.state.todayCals]
    const calsToDelete = calsCopy.splice(idx, 1)
    const totalCals = this.state.todayTotalCals - calsToDelete

    this.setState({
      todayName: nameCopy,
      todayCals: calsCopy,
      todayQty: qtyCopy,
      todayIdx: idxCopy,
      todayTotalCals: totalCals,
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
            <Form onSubmit={this.handleAddFood}>
              <Form.Group as={Row} controlId="formHorizontalName">
                <Form.Label column sm={4}>
                  Name
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    name="name"
                    type="text"
                    placeholder="e.g. Schweinebraten"
                    value={this.state.foodName}
                    onChange={(e) => this.handleChange(e)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formHorizontalCalories">
                <Form.Label column sm={4}>
                  Calories
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    name="calories"
                    type="number"
                    placeholder="e.g. 800"
                    value={this.state.foodCals}
                    onChange={(e) => this.handleChange(e)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formHorizontalImg">
                <Form.Label column sm={4}>
                  Image URL
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    name="image"
                    type="text"
                    placeholder="www.xxx.com/xyz.jpg"
                    value={this.state.foodImgUrl}
                    onChange={(e) => this.handleChange(e)}
                  />
                </Col>
              </Form.Group>
              <Button type="submit" className="mb-3 mr-2" variant="outline-primary">
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
          <InputGroup>
            <Form.Control
              name="search"
              type="text"
              placeholder="Search Food ..."
              value={this.state.search}
              onChange={(e) => this.handleSearch(e)}
            />
            <InputGroup.Append onClick={this.handleClearSearchForm}>
              <InputGroup.Text id="inputGroupPrepend">X</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
          <hr />
        </Container>
        <Container>
          {this.state.todayName.length > 0 && (
            <div>
              <h3>Today's Food</h3>
              <br />
              {this.state.todayName.map((el, idx) => (
                <Row key={idx}>
                  <Col>
                    <strong>
                      <p>
                        {el} * {this.state.todayQty[idx]}
                      </p>
                    </strong>
                  </Col>
                  <Col>
                    <p>{this.state.todayCals[idx]} Calories</p>
                  </Col>
                  <Col>
                    <p
                      style={{ color: 'lightgrey', textDecoration: 'underline', cursor: 'pointer' }}
                      onClick={(e) => this.handleDelete(e, idx)}
                    >
                      Delete
                    </p>
                  </Col>
                </Row>
              ))}
              <hr />
              <h6>Total {this.state.todayTotalCals} Calories</h6>
              <hr />
            </div>
          )}
        </Container>

        <Container>
          <CardDeck className="justify-content-md-center">
            {this.state.foods
              .filter((e) => e.name.toUpperCase().includes(this.state.search.toUpperCase()))
              .map((el, idx) => (
                <FoodCard
                  key={idx}
                  index={idx}
                  name={el.name}
                  cals={el.calories}
                  qty={el.quantity}
                  img={el.image}
                  handlePlus={this.handlePlus}
                  handleMinus={this.handleMinus}
                  handleAdd={this.handleAdd}
                />
              ))}
          </CardDeck>
        </Container>
      </div>
    )
  }
}
