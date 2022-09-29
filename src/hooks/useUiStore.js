import { useDispatch, useSelector } from "react-redux"
import { onCloseDateModal, onOpenDateModal } from "../store";  //! y aca NRO 4


export const useUiStore = () => {

    const dispatch = useDispatch();

    const {
        isDateModalOpen    
    } = useSelector( state => state.ui)

    const {
        isModalClosed
    } = useSelector (state => state.ui)

    const openDateModal = () => {
        dispatch(onOpenDateModal())
    }

    const closeDateModal = () => {
        dispatch(onCloseDateModal());  //! y aca NRO 3
    }

    const toggleDateModal = () => {
        (isDateModalOpen)
            ? openDateModal()
            : closeDateModal();
    }

    return {
        //* Properties
        isDateModalOpen,
        isModalClosed,
        //* Metodos
        openDateModal,
        closeDateModal,
        toggleDateModal,
    }
}