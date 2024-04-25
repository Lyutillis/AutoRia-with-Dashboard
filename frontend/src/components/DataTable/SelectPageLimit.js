import React from 'react';
import "./SelectPageLimit.css";

const SelectPageLimit = ({setCarsPerPage}) => {
    const setLimit = (e) => {
        setCarsPerPage(
            parseInt(e.currentTarget.value, 10)
        )
    }

    return (
        <div className="select-box">
            <div className="select-box__current" tabIndex="1">
                <div className="select-box__value">
                    <input className="select-box__input" type="radio" id="option0" value="10" name="LimitDropdown" onChange={ setLimit } defaultChecked="checked" />
                    <p className="select-box__input-text">10</p>
                </div>
                <div className="select-box__value">
                    <input className="select-box__input" type="radio" id="option1" value="20" name="LimitDropdown" onChange={ setLimit } defaultChecked="" />
                    <p className="select-box__input-text">20</p>
                </div>
                <div className="select-box__value">
                    <input className="select-box__input" type="radio" id="option2" value="30" name="LimitDropdown" onChange={ setLimit } defaultChecked="" />
                    <p className="select-box__input-text">30</p>
                </div>
                <div className="select-box__value">
                    <input className="select-box__input" type="radio" id="option3" value="40" name="LimitDropdown" onChange={ setLimit } defaultChecked="" />
                    <p className="select-box__input-text">40</p>
                </div>
                <div className="select-box__value">
                    <input className="select-box__input" type="radio" id="option4" value="50" name="LimitDropdown" onChange={ setLimit } defaultChecked="" />
                    <p className="select-box__input-text">50</p>
                </div>
                <img className="select-box__icon" src="http://cdn.onlinewebfonts.com/svg/img_295694.svg" alt="Arrow Icon" aria-hidden="true"/>
            </div>
            <ul className="select-box__list">
                <li>
                <label className="select-box__option" htmlFor="option0" aria-hidden={ true }>10</label>
                </li>
                <li>
                <label className="select-box__option" htmlFor="option1" aria-hidden={ true }>20</label>
                </li>
                <li>
                <label className="select-box__option" htmlFor="option2" aria-hidden={ true }>30</label>
                </li>
                <li>
                <label className="select-box__option" htmlFor="option3" aria-hidden={ true }>40</label>
                </li>
                <li>
                <label className="select-box__option" htmlFor="option4" aria-hidden={ true }>50</label>
                </li>
            </ul>
            </div>
    );
};

export default SelectPageLimit;
