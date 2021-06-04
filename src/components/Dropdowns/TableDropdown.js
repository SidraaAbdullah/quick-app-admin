import React from "react";
import { createPopper } from "@popperjs/core";
import './dropdown.css';

const NotificationDropdown = ({ archiveWaiter, AddMenuURL, DeleteMenuURL, LinkWaiter, Delete, DeleteLabel }) => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "left-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <>
      <a
        className="text-gray-600 py-1 px-3"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
        onBlur={()=>{
          setTimeout(()=>{
            closeDropdownPopover();
          }, 100)
        }}
      >
        <i className="fas fa-ellipsis-v"></i>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        {archiveWaiter && (
          <a
            href="/"
            className={
              "dropdown text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
            }
            onClick={(e) => {
              e.preventDefault();
              archiveWaiter();
              closeDropdownPopover();
            }}
          >
            Archive
          </a>
        )}
        {AddMenuURL && (
          <a
            href="/"
            className={
              "dropdown text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
            }
            onClick={(e) => {
              e.preventDefault();
              AddMenuURL();
              closeDropdownPopover();
            }}
          >
            Add Menu URL
          </a>
        )}
         {DeleteMenuURL && (
          <a
            href="/"
            className={
              "dropdown text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
            }
            onClick={(e) => {
              e.preventDefault();
              DeleteMenuURL();
              closeDropdownPopover();
            }}
          >
            Delete Menu URL
          </a>
        )}
        {LinkWaiter && (
          <a
            href="/"
            className={
              "dropdown text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
            }
            onClick={(e) => {
              e.preventDefault();
              LinkWaiter();
              closeDropdownPopover();
            }}
          >
            Link Waiter
          </a>
        )}
        {Delete && (
          <a
            href="/"
            className={
              "dropdown text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
            }
            onClick={(e) => {
              e.preventDefault();
              Delete();
              closeDropdownPopover();
            }}
          >
            {DeleteLabel}
          </a>
        )}
      </div>
    </>
  );
};

export default NotificationDropdown;
