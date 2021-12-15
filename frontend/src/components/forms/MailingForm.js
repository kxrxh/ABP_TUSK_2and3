import React, { Component } from 'react'
import { Button, Form, InputGroup, Card } from 'react-bootstrap'
import './forms.css'

const API_ADDRESS = "http://localhost:3001/api/"

export class MailingForm extends Component{
	constructor(props) {
		super(props);
		this.state = {
			mailing: this.props.employee.Mailing == 1,
			email: this.props.employee.Mail,
		}
		this.changeMailing = this.changeMailing.bind(this);
		this.changeEmail = this.changeEmail.bind(this);
	}
	changeEmail(mail) {
		fetch(API_ADDRESS + "employee/" + this.props.employee.ID, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"mail": mail,
			})
		}).then(res => res.json())
		this.setState({
			email: mail,
		})
	}
	changeMailing() {
        console.log(this.state.mailing)
		fetch(API_ADDRESS + "employee/" + this.props.employee.ID, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			}, 
			body: JSON.stringify({
				"mailing": this.state.mailing ? "0" : "1" // Здесь надо инвертировать, все ок
			})
		})
		.then(r => r.json())
		.then(r=> console.log(r), e => {console.log(e)})
		this.setState({
			mailing: !this.state.mailing
		})

	}
	render() {
		return (
            <Card className="form">
			<Form id="mainform" className="mb-3 Form">
                <Card.Header>
					<Form.Label>Email адрес</Form.Label>
                </Card.Header>
                <Card.Body>

				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Control type="email" placeholder="Введите email" 
						value={this.state.email}
						onChange={event => this.changeEmail(event.target.value)}
					/>
				</Form.Group>

				<Form.Group className="mb-3 mailing">
					<InputGroup>
						<InputGroup.Text>Рассылка</InputGroup.Text>
						<InputGroup.Text>
						<Form.Check type="checkbox" checked={this.state.mailing}
							onChange={this.changeMailing}
						/>
						</InputGroup.Text>
					</InputGroup>
				</Form.Group>
                </Card.Body>
			</Form>
		</Card>
        )
	}
}