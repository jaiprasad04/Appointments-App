// Write your code here
import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsFavorite} = props
  const {id, titleInput, dateInput, isFavorite} = appointmentDetails
  const date = dateInput
    ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
    : ''

  const likeImageUrl = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickFavoriteIcon = () => {
    toggleIsFavorite(id)
  }

  return (
    <li className="appointment-list">
      <div className="text-container">
        <p className="title">{titleInput}</p>
        <button
          type="button"
          className="star-button"
          onClick={onClickFavoriteIcon}
          data-testid="star"
        >
          <img src={likeImageUrl} alt="star" className="star" />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
