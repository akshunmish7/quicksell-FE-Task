import '../style/card-display.css';
import LowPriorityIcon from '../assets/icons/low-priority.svg';
import MediumPriorityIcon from '../assets/icons/medium-priority.svg';
import HighPriorityIcon from '../assets/icons/high-priority.svg';
import UrgentPriorityIcon from '../assets/icons/urgent-priority.svg';
import NoPriorityIcon from '../assets/icons/no-priority.svg';

import TodoIcon from '../assets/icons/todo-icon.svg';
import InProgressIcon from '../assets/icons/in-progress-icon.svg';
import BacklogIcon from '../assets/icons/backlog-icon.svg';
import DoneIcon from '../assets/icons/done-icon.svg';

import PlusIcon from '../assets/icons/plus-icon.svg'; 
import EllipsisIcon from '../assets/icons/ellipsis-icon.svg';  
import CancelledIcon from '../assets/icons/cancelled-icon.svg';  

import userIcon from '../assets/user_icon.png'
import TagIcon from '../assets/icons/tag.png'
import UrgentPriorityIconCard from '../assets/icons/urgent-card.svg'

function Todo(props) {
  const { groupedTickets, user, priority, groupMode, status, tag, isUserAvailable} = props;

  const iconMapping = {
    'Todo': TodoIcon,
    'In progress': InProgressIcon,
    'Backlog': BacklogIcon,
    'Done': DoneIcon,
    'Cancelled':CancelledIcon
  };

  const priorityMapping = {
    0: 'No priority',
    1: 'Low',
    2: 'Medium',
    3: 'High',
    4: 'Urgent'
  };

  const priorityIconMapping = {
    0: NoPriorityIcon,
    1: LowPriorityIcon,
    2: MediumPriorityIcon,
    3: HighPriorityIcon,
    4: UrgentPriorityIcon
  };
  
  const renderPriorityIcon = (level,isCard=false) => {
    if (level === 4) {
      if (isCard) {
        return <img src={UrgentPriorityIconCard} alt="Urgent Priority (Card)" />;
      }
      return <img src={UrgentPriorityIcon} alt="Urgent Priority" />;
    }
    const iconSrc = priorityIconMapping[level];
    return <img src={iconSrc} alt={`Priority ${priorityMapping[level]}`} />;
  };

  const renderPriorityHeading = (level) => {
    const heading = priorityMapping[level] || 'No priority';
    return heading;
  };

  const renderIconStatus = (state) => {
    const iconSrc = iconMapping[state] || iconMapping['Todo'];
    return <img src={iconSrc} alt={`${state} status`} />;
  };

  const renderTop = () => {
    switch (groupMode) {
      case 'status':
        return (
          <>
            <div className="priority-header">
            <div className="priority-info">
              {renderIconStatus(status)}
              {status}
              <p className="ticket-count">{groupedTickets.length}</p>
            </div>
            <div className="priority-icons">
              <img src={PlusIcon} alt="Add" className="priority-plus-icon" />
              <img src={EllipsisIcon} alt="More options" className="priority-ellipsis-icon" />
            </div>
          </div>
          </>
        );
      case 'priority':
        return (
          <div className="priority-header">
            <div className="priority-info">
              {renderPriorityIcon(priority)}
              {renderPriorityHeading(priority)}
              <p className="ticket-count">{groupedTickets.length}</p>
            </div>
            <div className="priority-icons">
              <img src={PlusIcon} alt="Add" className="priority-plus-icon" />
              <img src={EllipsisIcon} alt="More options" className="priority-ellipsis-icon" />
            </div>
          </div>
        );
        default:
        return (
          <div className="user-info">
            <div className="user-details">
              <img src={userIcon} alt="profile-image" className="profile-image" />
              <span className="user-name">{user.name}</span>
              <span className="ticket-count">{groupedTickets.length}</span>
            </div>
            <div className="user-icons">
              <img src={PlusIcon} alt="Add" className="plus-icon" />
              <img src={EllipsisIcon} alt="More options" className="ellipsis-icon" />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="todo">
      {renderTop()}

      {groupedTickets.map((data) => {
        const isUserAvailable = props.isUserAvailable;
        const userAvailable = isUserAvailable(data.userId);
        console.log("props");
        console.log(props);
        return (
          <div key={data.id} className='todo-task'>
            <div className='todo-task-header'>
              <h1>{data.id}</h1>
              {groupMode !== 'user' ? (
                <>
                  <img src={userIcon} alt="profile-image" />
                  <style>
                    {`
                      .todo-task-header::before {
                        background-color: ${isUserAvailable ? 'green' : '#CCC'};
                      }
                      .todo-task-header::before {
                        border: ${groupMode !== 'user' ? '1px solid #ccc' : 'none'};
                      }
                    `}
                  </style>
                </>
              ) : ""}
            </div>
            <div className='todo-task-text'>
              {groupMode === 'status' ? "" : renderIconStatus(data.status)}
              <p>{data.title}</p>
            </div>

            <div className='todo-task-options'>
              {groupMode === 'status' || groupMode === 'user' ? renderPriorityIcon(data.priority,true) : null}
              <div className='todo-task-options-request'>
              {data.tag && data.tag.length > 0 && data.tag.map((tag, index) => (
                <span key={index} className="tag">
                  <img src={TagIcon} alt="Tag Icon" className="tag-icon" />
                  {tag}
                </span>
              ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Todo;
