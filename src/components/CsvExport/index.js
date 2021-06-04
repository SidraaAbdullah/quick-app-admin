import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import Button from "@material-ui/core/Button";
import { pad } from "../../util/waiter";

const ExportCsvContact = (props) => {
  const { data } = props;
  const [csvData, setCsvData] = useState([]);
  useEffect(() => {
    const csv = [["VOTER NAME", "LOTTERY NUMBER", "VOTER EMAIL", "RESTAURANT NAME", "DATE"]];
    data.map(
      // eslint-disable-next-line array-callback-return
      async ({ token, user_id, place_id, createdAt }) => {
        let fullToken = pad(token, 8, '0');
        csv.push([
          user_id?.full_name,
          fullToken.replace(/(\d{4})(\d{4})/, "$1-$2"),
          user_id?.email,
          place_id?.name,
          createdAt,
        ]);
      }
    );
    setCsvData(csv);
    console.log(csv)
  }, [data]);
  return (
    <React.Fragment>
      <CSVLink filename="Contact.csv" data={csvData}>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#ee3e54",
            color: "white",
            fontSize: "0.7rem",
            width:'8rem'
          }}
        >
          Export as CSV
        </Button>{" "}
      </CSVLink>
    </React.Fragment>
  );
};
ExportCsvContact.defaultProps = {
  data: [],
};

export { ExportCsvContact };
