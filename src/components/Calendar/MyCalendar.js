// import moment from 'moment';
// import React, { Component }from 'react';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
// import { minTime, maxTime, calendarInitialState } from '../../firebase/fbConfig';

// const localizer = momentLocalizer(moment); // or globalizeLocalizer
// const DragAndDropCalendar = withDragAndDrop(Calendar, { backend: false })

// function MyCalendar() {
//   return (<>
//     This is my calendar
//     <DragAndDropCalendar

//       // events={events}
//       // onEventDrop={moveEvent}
//       resizable
//       // onEventResize={resizeEvent}
//       defaultView="week"
//       defaultDate={new Date()}
//       localizer={localizer}
//       // onSelectEvent={this.selectEvent}
//       min={minTime}
//       max={maxTime}
//     />
//   </>);
// }

// export default MyCalendar;
import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { projectAuth, projectFirestore } from "../../firebase/fbConfig";
import { uuid } from "uuidv4";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const minTime = new Date();
minTime.setHours(7, 0, 0);
const maxTime = new Date();
maxTime.setHours(20, 0, 0);
const calendarInitialState = {
  events: [],
  equipments: [],
  people: [],
  modal: {
    id: null,
    title: null,
    desc: null,
    start: new Date(2018, 4, 4, 7, 0, 0),
    end: new Date(2018, 4, 4, 8, 0, 0),
  },
  modalOpen: false,
  equipmentsOpen: false,
  peopleOpen: false,

}
function GetEvents(uid) {
  return projectFirestore.collection('events').where('ownerId', '==', uid).get();
}

export function UpdateEvents(id) {
  return projectFirestore.collection('events').doc(id)
}
class MyCalendar extends Component {
  constructor(props) {
    super(props)
    this.state = calendarInitialState
    this.moveEvent = this.moveEvent.bind(this)
  }
  componentDidMount() {
    const newEvents = []
  //   const newEquipments = []
  //   const newPeople = []

    GetEvents(this.props.uid).then(snapshot => {
      snapshot.forEach(doc => {
        newEvents.push(doc.data())
        this.setState({
          events: newEvents,
        })
      });
    })
  // GetEquipments(this.props.uid).then(querySnapshot => {
  //   querySnapshot.forEach(doc => {
  //     newEquipments.push(doc.data())
  //     this.setState({
  //       equipments: newEquipments,
  //     })
  //   });
  // })
  // GetPeople(this.props.uid).then(querySnapshot => {
  //   querySnapshot.forEach(doc => {
  //     newPeople.push(doc.data())
  //     this.setState({
  //       people: newPeople,
  //     })
  //   });
  // })
  }

  moveEvent({ event, start, end }) {
    const { events } = this.state
    const idx = events.indexOf(event)
    let updatedEvent = { ...event, start, end }
    const nextEvents = [...events]
    if (idx > -1) {
      nextEvents.splice(idx, 1, updatedEvent)
      UpdateEvents(event.id).update({ start, end }).then(
        this.setState({
          events: nextEvents,
        })
      ).catch(error => {
        console.error('Update error', error);
      });
    }
    else {
      const newEventId = uuid()
      updatedEvent = { ...updatedEvent, id: newEventId, ownerId: this.props.uid }
      console.log(updatedEvent)
      nextEvents.push(updatedEvent)
      UpdateEvents(newEventId).set(updatedEvent).then(
        this.setState({
          events: nextEvents,
        })
      ).catch(error => {
        console.error('Create New Event error', error);
      });
    }
  }
  selectEvent = (event) => {
    this.handleOpen(event)
  }
  resizeEvent = (resizeType, { event, start, end }) => {
    const { events } = this.state

    const nextEvents = events.map(existingEvent => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    })

    UpdateEvents(event.id).update({ start, end }).then(
      this.setState({
        events: nextEvents,
      })
    ).catch(error => {
      console.error('Update error', error);
    });
  }
  onEventResize = (data) => {
    const { start, end } = data;

    this.setState((state) => {
      state.events[0].start = start;
      state.events[0].end = end;
      return { events: [...state.events] };
    });
  };

  onEventDrop = (data) => {
    console.log(data);
  };

  editEvent = ({ id, title, desc }) => {
    const { events } = this.state

    const nextEvents = events.map(existingEvent => {
      return existingEvent.id === id
        ? { ...existingEvent, title, desc }
        : existingEvent
    })

    UpdateEvents(id).update({ title, desc }).then(
      this.setState({
        events: nextEvents,
      })
    ).catch(error => {
      console.error('Update Event error', error);
    });
  }

  deleteEvent = ({ id }) => {
    const { events } = this.state

    const nextEvents = events.filter(existingEvent => {
      return existingEvent.id !== id
    })

    UpdateEvents(id).delete().then(
      this.setState({
        events: nextEvents,
      })
    ).catch(error => {
      console.error('Delete Event error', error);
    });
  }
  render() {
    return (
      <div>
        <DnDCalendar
          // defaultDate={moment().toDate()}
          // defaultView="month"
          // events={this.state.events}
          // localizer={localizer}
          // onEventDrop={this.onEventDrop}
          // onEventResize={this.onEventResize}
          // resizable
          // style={{ height: "100vh" }}
          events={this.state.events}
          localizer={localizer}
          onEventDrop={this.moveEvent}
          resizable
          onEventResize={this.resizeEvent}
          defaultView="month"
          defaultDate={moment().toDate()}
          onSelectEvent={this.selectEvent}
          min={minTime}
          max={maxTime}
        />
      </div>
    );
  }
}

export default MyCalendar;
