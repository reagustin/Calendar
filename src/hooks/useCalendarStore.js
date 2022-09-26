import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent } from "../store";


export const useCalendarStore = () => {

    const dispatch = useDispatch();
    
    const {
      events,
      activeEvent    
    } = useSelector( state => state.calendar)
    
    const setActiveEvent = (calendarEvent) => {
      dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async(calendarEvent) => {
      //TODO: llega al backend

      //Todo bien
      if(calendarEvent._id) {
        // estoy actualizando
        dispatch(onUpdateEvent({...calendarEvent}));
      }else{
        // estoy creando
        dispatch(onAddNewEvent( {...calendarEvent, _id: new Date().getTime() }));
      }

    }
    
  return {
    //*Properties
    events,
    activeEvent,
    //*Metodos
    setActiveEvent,
    startSavingEvent,
  }
}
