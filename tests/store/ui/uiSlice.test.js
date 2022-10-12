import { onCloseDateModal, onOpenDateModal, uiSlice } from "../../../src/store";


describe('Pruebas en el uiSlice', () => { 
    

    test('debe de regresar el estado por defecto', () => { 
        
        console.log(uiSlice.getInitialState());
        expect(uiSlice.getInitialState().isDateModalOpen).toBeFalsy();
        expect(uiSlice.getInitialState()).toEqual({ isDateModalOpen: false, isModalClosed: true });      

    })

    test('debe de cambiar el isDateModalOpen', () => { 
        
        let state = uiSlice.getInitialState();
        state = uiSlice.reducer(state, onOpenDateModal());
        expect(state.isDateModalOpen).toBeTruthy();
        
        
        state = uiSlice.reducer(state, onCloseDateModal());
        expect(state.isDateModalOpen).toBeFalsy();
        
    })
})