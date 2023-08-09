import React, { useState } from "react";
import "./Dropdown.scss";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

interface DropdownItem {
  key: string;
  value: string;
}

interface Props {
  title: string;
  dropdownItems: DropdownItem[];
}

export const Dropdown = ({ title, dropdownItems }: Props) => {
  const [dropdownDisabled, setDropdownDisabled] = useState(false);
  const [iconDropdown, setIconDropdown] = useState(faChevronDown);
  const handleDropdown = () => {
    setDropdownDisabled(!dropdownDisabled);
    setIconDropdown(dropdownDisabled ? faChevronDown : faChevronUp);
  };

  return (
    <>
      <div className="container-dropdown">
        <div
          className="container-dropdown-title b2"
          onClick={() => handleDropdown()}
        >
          <div className="icon-dropdown">
            <FontAwesomeIcon icon={iconDropdown} size="sm" />
          </div>
          <p className={`b1 text-secondary`}>{title}</p>
        </div>
        <div className="body-dropdown flex">
          {dropdownDisabled &&
            dropdownItems &&
            dropdownItems.map((item, index) => {
              return (
                <div key={index}>
                  <p className="b2">{item.value}</p>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};
