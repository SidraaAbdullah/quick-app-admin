import React,{useEffect} from "react";
import { TableDetail } from "./components";
import ReactTooltip from "react-tooltip";

const Table = ({ color, tableHeading, tableColumns, children }) => {
  useEffect(()=>{
      ReactTooltip.rebuild();
    },[children]);
  return (
    <div className="flex flex-wrap mt-4">
      <div className="w-full mb-12 px-4">
        <TableDetail
          color={color}
          tableHeading={tableHeading}
          tableColumns={tableColumns}
        >
          {children}
        </TableDetail>
      </div>
      <ReactTooltip/>
    </div>
  );
};

export default Table;
