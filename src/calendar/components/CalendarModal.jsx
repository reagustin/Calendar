import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addHours, isSameDay, setHours, setMinutes, addMinutes, differenceInSeconds } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';
import es from 'date-fns/locale/es';

registerLocale('es', es)

const customStyles = {
content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

    const [isOpen, setIsOpen] = useState(true);

    const [formValues, setFormValues] = useState({
        title: 'Agustin',
        notes: 'Re',
        start: new Date(),
        end: addHours( new Date(), 2),
    })

    const onInputChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const onDateChanged = (event, changing) => {
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }

    const onCloseModal = () => {
        console.log('cerrando modal')
        setIsOpen(false);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        const difference = differenceInSeconds( formValues.end, formValues.start);

        if (isNaN(difference) || difference <= 0) {
            console.log('Error en fechas');
            return;
        }

        if (formValues.title.length <= 0) return;
        
        console.log(formValues);

        // TODO:
        // cerrar modal
        // Remover errores en pantalla
        
    }

    /// adiciones de Federico Nahuel de udemy: Para eso uso las propiedades minTime y maxTime de los datePickers
    // las cuales les asigno valores memorizados con los siguientes useMemo
    const minStartTime = useMemo( () => {
        return ( isSameDay( formValues.start, new Date()) )
            ? new Date()
            : setHours(setMinutes(new Date(), 0), 0)
    }, [formValues.start] )
     
     
    const minEndTime = useMemo(() => {
        return ( isSameDay( formValues.start, formValues.end ) )
            ? formValues.start
            : setHours(setMinutes(new Date(), 0), 0)
    }, [formValues.start, formValues.end])
    ///

  return (
    <Modal
        isOpen={isOpen}                
        onRequestClose={onCloseModal}
        style={customStyles}
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={ 200 }
    >
        <h1> Nuevo evento </h1>
        <hr />
        <form className="container" onSubmit={onSubmit}>

            <div className="form-group mb-2">
                <label>Fecha y hora inicio</label>
                <DatePicker
                    minTime={ minStartTime }
                    maxTime={ setHours(setMinutes( new Date(), 59), 23) }
                    selected={formValues.start}
                    onChange={(event) => onDateChanged(event, 'start')}
                    className="form-control"
                    dateFormat="Pp"
                    showTimeSelect
                    locale='es'
                    timeCaption="Hora"
                />                
            </div>

            <div className="form-group mb-2">
                <label>Fecha y hora fin</label>
                <DatePicker
                    minDate={formValues.start}
                    minTime={ minEndTime }
                    maxTime={ setHours(setMinutes( new Date(), 59), 23) }
                    selected={formValues.end}
                    onChange={(event) => onDateChanged(event, 'end')}
                    className="form-control"
                    dateFormat="Pp"
                    showTimeSelect
                    locale='es'
                    timeCaption="Hora"
                />                                
            </div>

            <hr />
            <div className="form-group mb-2">
                <label>Titulo y notas</label>
                <input 
                    type="text" 
                    className="form-control"
                    placeholder="Título del evento"
                    name="title"
                    autoComplete="off"
                    value={formValues.title}
                    onChange={onInputChange}
                />
                <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
            </div>

            <div className="form-group mb-2">
                <textarea 
                    type="text" 
                    className="form-control"
                    placeholder="Notas"
                    rows="5"
                    name="notes"
                    value={formValues.notes}
                    onChange={onInputChange}
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">Información adicional</small>
            </div>

            <button
                type="submit"
                className="btn btn-outline-primary btn-block"
            >
                <i className="far fa-save"></i>
                <span> Guardar</span>
            </button>

        </form>
    </Modal>
  )
}