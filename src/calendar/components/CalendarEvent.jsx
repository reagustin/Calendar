

export const CalendarEvent = ({event}) => {

    const { title , user} = event;

    return (
        <>
            <strong>{title}</strong>
            <span> - {user.name}</span>
        </>
    )
}


// este componente se puede memorizar cuando tengamos muchos eventos cargados.