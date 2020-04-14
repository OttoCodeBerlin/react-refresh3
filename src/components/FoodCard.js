import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

export default function FoodCard(props) {
  return (
    <div className="mt-2">
      <Card style={{ width: '14rem' }}>
        <Container style={{ width: '10rem', height: '8rem', marginTop: '20px' }} className="justify-content-md-center">
          <Card.Img variant="top" src={props.img} />
        </Container>
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>{props.cals} calories</Card.Text>

          <Row>
            <Col>
              <Button variant="primary-link" onClick={(e) => props.handleMinus(e,props.index)}>-</Button>
            </Col>
            <Col>
              <Card.Text className="mt-2">
                <strong>{props.qty}</strong>
              </Card.Text>
            </Col>
            <Col>
              <Button variant="primary-link" onClick={(e) => props.handlePlus(e,props.index)}>+</Button>
            </Col>
            <Col>
              <Button variant="primary mt-2" onClick={(e) => props.handleAdd(e,props.index)}>Add</Button>
            </Col>
            
          </Row>
        </Card.Body>
      </Card>
    </div>
  )
}
