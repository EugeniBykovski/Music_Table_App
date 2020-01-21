import React from 'react'
import './Table.css'

// создадим глупый компонент, который делает нам какой-то шаблон и не имеет никакой логики
export default props => ( // в качестве bind параметра будем указывать название столбца, который нужно фильтровать (сортировать)
    <table className="table">
        <thead>
            <tr>
                <th onClick={props.onSort.bind(null, 'id')} className='TableLink'>
                    № {props.sortField === 'id' ? <small>{props.sort}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'executor')} className='TableLink'>
                    Исполнитель {props.sortField === 'executor' ? <small>{props.sort}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'song')} className='TableLink'>
                    Песня {props.sortField === 'song' ? <small>{props.sort}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'genre')} className='TableLink'>
                    Жанр {props.sortField === 'genre' ? <small>{props.sort}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'year')} className='TableLink'>
                    Год {props.sortField === 'year' ? <small>{props.sort}</small> : null}
                </th>
            </tr>
        </thead>
        <tbody>
            {props.data.map(item => (
                <tr key={item.id + item.phone} onClick={props.onRowSelect.bind(null, item)} className='TableLink'>
                    <td>{item.id}</td>
                    <td>{item.executor}</td>
                    <td>{item.song}</td>
                    <td>{item.genre}</td>
                    <td>{item.year}</td>
                </tr>
            ))}
        </tbody>
    </table>
)

