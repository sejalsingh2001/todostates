import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
export default function ListItem(props) {
  const { index, value, updatedata } = props;

  const [listItemText, setListItemText] = useState(value);
  const [enableUpdate, setUpdateStatus] = useState(false);

  const handleChange = (event) => {
    setListItemText(event.target.value);
  };

  const handleUpdate = (e) => {
    if (e.key === 'Enter') {
      console.log('updating list item');
      updatedata(listItemText, index);
      setUpdateStatus(false);
    }
  };

  return (
    <>
      <div className="list-content">
        <div className="inner-content">
          <li className="li">
            <div
              onClick={() => {
                
                props.image(props.id);
                props.checkdata(props.id);
               
              }}
            ><FontAwesomeIcon icon={faCheck} className="tick"/></div>

            <input disabled={!enableUpdate}
              type="text"
              className={props.isCompleted ? 'strike fa-Check' : ''}
              value={listItemText}
              onChange={handleChange}
              onKeyDown={handleUpdate}
            />

            <button
              className="update"
              onClick={() => setUpdateStatus(!enableUpdate)}
            >
              {enableUpdate ? 'Save' : 'Update'}
            </button>
            <button 
              className="Del"
              onClick={() => {
                props.deletedata(props.id);
              }}
            >
              X
            </button>
          </li>
        </div>
      </div>
    </>
  );
}
