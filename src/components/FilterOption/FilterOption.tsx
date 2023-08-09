import React, { useContext } from "react";
import "./FilterOption.scss";
import { Option } from "../../types/ticket";
import { useTranslation } from "react-i18next";

interface Props {
  option: Option;
  isActive: boolean;
  updateActiveOption?: () => void;
}

export const FilterOption = ({
  option,
  isActive,
  updateActiveOption,
}: Props): JSX.Element => {
  const { t } = useTranslation("common");

  return (
    <div onClick={updateActiveOption}>
      <p
        className={`b1 option ${
          isActive ? `light-text` : `light-text-secondary`
        } `}
      >
        {option === Option.COLLECTIBLES && t("ticket-screen.collectibles")}
        {option === Option.UPCOMING && t("ticket-screen.tickets")}
      </p>
      {isActive && <hr className={`light-underline rounded`} />}
    </div>
  );
};
