import React, { useState, useRef, useEffect } from 'react';
import './style.css'

function ListItem({task, index, onDelete, onChange}) {

    const [value, setValue] = useState(task.task);
    const [checked, setChecked] = useState(task.checked);
    const [lastValue, setLastValue] = useState(task.task);
    const [contentEditable, setContentEditable] = useState(false);

    const editBox = useRef();

    let id = "checkbox-" + index;

    function edit(event) {

        event.preventDefault();

        let newValue = value.trim() || lastValue;

        task.task = newValue;

        setValue(newValue);
        onChange(task, index);
        setLastValue(newValue);
        setContentEditable(false);

    }

    function toggleCheckbox() {

        task.checked = !checked;

        setChecked(!checked);
        onChange(task, index);

    }

    useEffect(() => {

        if (contentEditable) {

            editBox.current.focus();

        }

    }, [contentEditable]);

    return (
        
        <li className="list-item">

            <input type="checkbox" id={id} checked={checked} onChange={toggleCheckbox} />

            {!contentEditable ?
            
                <label htmlFor={id} >{value}</label>
            
            :

                <form onSubmit={edit} className="editable-label-form">

                    <input type="text" value={value} placeholder="Task" ref={editBox} onInput={(event) => {

                        setValue(event.target.value);

                    }} onKeyDown={(event) => {

                        if (event.key === "Escape") {

                            setValue(lastValue);
                            setContentEditable(false);

                        }

                    }} />

                </form>

        }

        <button onClick={() => setContentEditable(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
        </button>
        <button onClick={() => {onDelete(index)}}>X</button>
                            
        </li>
    
    )

}

export default ListItem
