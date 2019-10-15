import React, { Component } from "react";
import ReactLightCalendar from '@lls/react-light-calendar'
import '@lls/react-light-calendar/dist/index.css'

// const DAY_LABELS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
const MONTH_LABELS = ['Enero', 'Febrero', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aûot', 'Septembre', 'Octobre', 'Novembre', 'Décembre']

class Calendar extends Component {
  constructor(props) {
    super(props)
    const date = new Date()
    const startDate = date.getTime()
    this.state = {
      startDate, // Today
      endDate: new Date(startDate).setDate(date.getDate() + 0) // Today + 6 days
    }
  }

  onChange = (startDate, endDate) => {
    
  this.setState({ startDate, endDate })}

  render = () => {
    const { startDate, endDate } = this.state

    return (
        <ReactLightCalendar disableDates={date => date < new Date().getTime()}  startDate={startDate} endDate={endDate} onChange={this.onChange} range monthLabels={MONTH_LABELS}/>
    )
  }
}

export default Calendar;