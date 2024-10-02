import { useState } from 'react';
import hamburgerIcon from '../assets/hamburgerIcon.svg';
import dropdownIcon from '../assets/dropdownIcon.svg';  // Import your SVGs
import '../style/header.css';

function Navbar({ setSelectedGrouping, sortBy, setSortBy }) {
  const selectedGrouping = localStorage.getItem('selectedGrouping') || 'user';

  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isStatusDropdownVisible, setStatusDropdownVisible] = useState(false);
  const [isPriorityDropdownVisible, setPriorityDropdownVisible] = useState(false);

  const [orderingValue, setOrderingValue] = useState('priority');

  const statusOptions = ['user', 'status', 'priority'].filter(option => option !== selectedGrouping);
  const orderingOptions = ['title', 'priority'].filter(option => option !== orderingValue);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const toggleStatusDropdown = () => {
    setStatusDropdownVisible(!isStatusDropdownVisible);
  };

  const togglePriorityDropdown = () => {
    setPriorityDropdownVisible(!isPriorityDropdownVisible);
  };

  const handleGroupingItemClick = (value) => {
    setSelectedGrouping(value);
    localStorage.setItem('selectedGrouping', value);
    setStatusDropdownVisible(false);
  };

  const handleOrderingItemClick = (value) => {
    setSortBy(value);
    setOrderingValue(value);
    setPriorityDropdownVisible(false);
  };

  return (
    <>
      <div className="navbar">
        <div className="dropdown-container">
          <button className="dropdown-button" onClick={toggleDropdown}>
            <img src={hamburgerIcon} alt="Hamburger Icon" className="hamburgerIcon" />
            Display
            <img src={dropdownIcon} alt="Dropdown Icon" className="dropdownIcon" />
          </button>
          {isDropdownVisible && (
            <div className="dropdown-content">
              <div className="row1">
                <p className='grouping'>Grouping</p>
                <div className="groupingProperties">
                  <button className="dropdown-button-one" onClick={toggleStatusDropdown}>
                    {selectedGrouping}
                    <img src={dropdownIcon} alt="Dropdown Icon" className="innerDropdown" />
                  </button>
                  {isStatusDropdownVisible && (
                    <ul className="userDropdown">
                      {statusOptions.map(option => (
                        <li key={option} onClick={() => handleGroupingItemClick(option)}>
                          {option}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="row1">
                <p className='grouping'>Ordering</p>
                <div>
                  <button className="dropdown-button-one" onClick={togglePriorityDropdown}>
                    {orderingValue}
                    <img src={dropdownIcon} alt="Dropdown Icon" className="innerDropdown" />
                  </button>
                  {isPriorityDropdownVisible && (
                    <ul className="priorityDropdown">
                      {orderingOptions.map(option => (
                        <li key={option} onClick={() => handleOrderingItemClick(option)}>
                          {option}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
