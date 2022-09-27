import { useCalendarStore, useUiStore } from "../../hooks";

export const FabDelete = () => {

  const { startDeletingEvent, hasEventSelected } = useCalendarStore();
  const { isModalClosed } = useUiStore();

  const handleDelete = () => {
    startDeletingEvent();
  }

  return (    
    <button
        className="btn btn-danger fab-danger"
        onClick={handleDelete}
        style={{
          display: (hasEventSelected && isModalClosed) ? '' : 'none'
        }}
    >
        <i className="fas fa-trash-alt"></i>
    </button>
  )
}
