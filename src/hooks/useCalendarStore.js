import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUnselectEvent, onUpdateEvent } from "../store";


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

    const startDeletingEvent = () => {

      //Todo llegar al backend
      
      dispatch(onDeleteEvent());
    }

    const setClickOutside = () => {
      dispatch(onUnselectEvent())
    }
    
  return {
    //*Properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    //*Metodos
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    setClickOutside,
  }
}
