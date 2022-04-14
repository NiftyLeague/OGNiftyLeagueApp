import React from 'react';

const RentalSearchSideBar = ({ isOpen, toggleSidebar }) => {
  return (
    <div>
      <div>I slide into view</div>
      <div>Me too!</div>
      <div>Meee Threeeee!</div>
      <button onClick={toggleSidebar} className="sidebar-toggle">
        Toggle Sidebar
      </button>
    </div>
  );
};
export default RentalSearchSideBar;