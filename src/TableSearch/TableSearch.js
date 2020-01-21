import React, {useState} from 'react'

export default props => {
    // по умолчанию у нас будет пустая строка (пустой state)
    const [value, setValue] = useState('')

    // setValue - функция, которая позволяет нам изменять value
    const valueChangeHandler = event => {
        setValue(event.target.value)
    }

    return (
        <div className="input-group mb-4 mt-4">
            <div className="input-group-prepend">
                <button
                    className="btn btn-outline-secondary"
                    onClick={() => props.onSearch(value)}
                >
                Search
                </button>
            </div>
            <input type="text" className="form-control" onChange={valueChangeHandler} value={value} />
        </div>
    )
}