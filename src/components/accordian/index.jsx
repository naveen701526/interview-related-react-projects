//single selection

import { useState } from "react"
import data from "./data";
import './styles.css'


export default function Accordian() {
    const [selected, setSelected] = useState(null);
    const [enableMultiSelection, setEnableMultiSelection] = useState(false);


    const [multiple, setMultiple] = useState([])

    const handleSingleSelection = (currentId) => {

        setSelected(currentId === selected ? null : currentId)

    }

    const handleMultiSelectionToggle = () => {
        if (!enableMultiSelection) {
            setEnableMultiSelection(true);
            setSelected(null);
        } else {
            setEnableMultiSelection(false);
            setMultiple([])
        }
    }

    const handleMultiSelection = (currentId) => {
        let cpyMultiple = [...multiple]
        const findIndexOfCurrentId = cpyMultiple.indexOf(currentId)

        if (findIndexOfCurrentId === -1) cpyMultiple.push(currentId)
        else cpyMultiple.splice(findIndexOfCurrentId, 1)
        setMultiple(cpyMultiple)
    }
    return <div className="wrapper">
        <button onClick={() => handleMultiSelectionToggle()}>{enableMultiSelection ? 'Enable Single Selection' : 'Enable Multi Selection'}</button>
        <div className="accordian">
            {
                data && data.length > 0 ? data.map(dataItem => <div key={dataItem.id} className="item">
                    <div className="title" onClick={() => enableMultiSelection ? handleMultiSelection(dataItem.id) : handleSingleSelection(dataItem.id)}>
                        <h3>{dataItem.question}</h3>
                        <span>+</span>
                        {
                            enableMultiSelection ? multiple.indexOf(dataItem.id) !== -1 && <div className="content">{dataItem.answer}</div> : selected === dataItem.id && <div className="content">{dataItem.answer}</div>
                        }
                    </div>
                </div>) : <div>No data found</div>
            }
        </div>
    </div>
}