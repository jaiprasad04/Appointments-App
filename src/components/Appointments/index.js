// Write your code here
import {Component} from 'react'
import {v4} from 'uuid'

import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentsList: [],
    isFilterActive: false,
  }

  toggleIsFavorite = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppoint => {
        if (eachAppoint.id === id) {
          return {...eachAppoint, isFavorite: !eachAppoint.isFavorite}
        }
        return eachAppoint
      }),
    }))
  }

  onClickFilter = () => {
    const {isFilterActive} = this.state
    this.setState({isFilterActive: !isFilterActive})
  }

  getFilteredAppointmentList = () => {
    const {appointmentsList, isFilterActive} = this.state
    if (isFilterActive) {
      return appointmentsList.filter(
        eachAppoint => eachAppoint.isFavorite === true,
      )
    }
    return appointmentsList
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state

    const newAppointment = {
      id: v4(),
      titleInput,
      dateInput,
      isFavorite: false,
    }

    this.setState(prevState => ({
      titleInput: '',
      dateInput: '',
      appointmentsList: [...prevState.appointmentsList, newAppointment],
    }))
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDate = event => {
    this.setState({dateInput: event.target.value})
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-active' : ''
    const filteredAppointmentsList = this.getFilteredAppointmentList()

    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="appointments-container">
            <div className="add-appointment-container">
              <form className="form" onSubmit={this.onAddAppointment}>
                <h1 className="heading">Add Appointment</h1>
                <label htmlFor="title" className="label">
                  TITLE
                </label>
                <input
                  type="text"
                  value={titleInput}
                  id="title"
                  placeholder="Title"
                  className="input-text"
                  onChange={this.onChangeTitle}
                />
                <label htmlFor="date" className="label">
                  DATE
                </label>
                <input
                  type="date"
                  value={dateInput}
                  id="date"
                  className="input-text"
                  onChange={this.onChangeDate}
                />
                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="image"
              />
            </div>
            <hr className="line" />
            <div className="description-container">
              <h1 className="description">Appointments</h1>
              <button
                type="button"
                className={`starred-button ${filterClassName}`}
                onClick={this.onClickFilter}
              >
                Starred
              </button>
            </div>
            <ul className="appointment-list-container">
              {filteredAppointmentsList.map(eachAppoint => (
                <AppointmentItem
                  key={eachAppoint.id}
                  appointmentDetails={eachAppoint}
                  toggleIsFavorite={this.toggleIsFavorite}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
