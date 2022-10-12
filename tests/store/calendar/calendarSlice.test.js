import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice"
import { calendarWithActiveEventState, calendarWithEventsState, events, initialState } from "../../fixtures/calendarStates";


describe('Pruebas en calendarSlice', () => { 
    

    test('debe de regresar el estado por defecto', () => {     
        const state = calendarSlice.getInitialState();
        expect(state).toEqual(initialState);
    });

    test('onSetActiveEvent debe de activar el evento', () => {

        const state = calendarSlice.reducer(calendarWithEventsState, onSetActiveEvent(events[0]));
        expect(state.activeEvent).toEqual(events[0]);

    })
    
    test('onAddNewEvent debe de agregar el evento', () => {

        const newEvent = {            
            id: 3,
            start: new Date('2022-10-21 13:00:00'),
            end: new Date('2022-10-21 15:00:00'),
            title: 'Reunion con jorge',
            notes: 'Armar minutas'        
        }
        const state = calendarSlice.reducer(calendarWithEventsState, onAddNewEvent(newEvent));
        // console.log(...events, newEvent)
        expect(state.events).toEqual([...events, newEvent]);
    })

    test('onUpdateEvent debe de agregar el evento', () => {
        const newEvent = {            
            id: 1,
            start: new Date('2022-10-21 13:00:00'),
            end: new Date('2022-10-21 15:00:00'),
            title: 'Esto es una actualizacion',
            notes: 'Y actualizo la nota'        
        }
        const state = calendarSlice.reducer(calendarWithEventsState, onUpdateEvent(newEvent));
        // console.log(...events, newEvent)
        expect(state.events[0]).toEqual(newEvent);
        expect(state.events).toContain(newEvent);
    })

    test('onDeleteEvent debe de eliminar el evento activo', () => {
        
        const state = calendarSlice.reducer(calendarWithActiveEventState, onDeleteEvent());
                
        expect(state.events.length).toBe(1);
        expect(state.activeEvent).toBe(null);
        expect(state.events).not.toContain(events[0]);
        
    })
    
    test('onLogout calendar debe de limpiar el estado', () => {
        
        const state = calendarSlice.reducer(calendarWithActiveEventState, onLogoutCalendar());
        
        expect(state).toEqual(initialState);
    })
    
    test('onLoadEvents debe de establecer los eventos', () => {
        
        const state = calendarSlice.reducer(initialState, onLoadEvents(events));
        
        expect(state).toEqual(calendarWithEventsState);
        expect(state.events).toEqual(events);
        expect(state.isLoadingEvents).toBeFalsy();
        
        const newState = calendarSlice.reducer(state, onLoadEvents(events));
        expect(newState.events.length).toBe(events.length);
        
    })
    
})