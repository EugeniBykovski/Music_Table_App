import React from 'react'
import './DetailRowView.css'

export default ({person}) => (
    <div className="DetailRowView">
        <p>Исполнитель и песня: <b>{person.executor + ' - ' + person.song}</b></p>
        <p>Страна: <b>{person.address.streetAddress}</b></p>
        <p>Город: <b>{person.address.city}</b></p>
        <p>Провинция (штат): <b>{person.address.state}</b></p>
        <p>Индекс: <b>{person.address.zip}</b></p>
    </div>
)
