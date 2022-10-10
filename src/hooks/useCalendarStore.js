import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUnselectEvent, onUpdateEvent, onLoadEvents} from "../store";


export const useCalendarStore = () => {

    const dispatch = useDispatch();
    
    const { events, activeEvent} = useSelector( state => state.calendar);
    const { user } = useSelector( state => state.auth);
    
    const setActiveEvent = (calendarEvent) => {
      dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async(calendarEvent) => {
      //TODO: Update event

      try {        
        if(calendarEvent.id) {        
          await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
          dispatch(onUpdateEvent({...calendarEvent, user}));
          return;
        }
        const { data } = await calendarApi.post('/events',calendarEvent);                
        dispatch(onAddNewEvent({...calendarEvent, id: data.evento.id, user }));        
      } catch (error) {
        console.log(error);
        Swal.fire('Error al guardar', error.response.data.msg, 'error');
      }

    }

    const startDeletingEvent = async() => {
      try {
        await calendarApi.delete(`/events/${activeEvent.id}`);      
        dispatch(onDeleteEvent());
      } catch (error) {
        Swal.fire('Error al eliminar eventos', error.response.data.msg, 'error');        
        console.log(error);
      }      
    }

    const startLoadingEvents = async() => {
      try {
        const {data} = await calendarApi.get('/events');        
        const events = convertEventsToDateEvents(data.eventos);
        dispatch(onLoadEvents(events));

      } catch (error) {
        console.log('Error cargando eventos');
        console.log(error);
      }
    }


    ///
    const setClickOutside = () => { //! Seguir pensando la logica
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
    startLoadingEvents,
  }
}
