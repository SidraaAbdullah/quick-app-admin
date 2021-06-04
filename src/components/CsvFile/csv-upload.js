import React from 'react';
import CSVReader from 'react-csv-reader';
import { Message } from '../alert/message';
import { PleaseWait } from '../loaders';

type Props = {
  mutation: Function,
  mutationBody: Object,
  verifiedColumns: Array,
  isLoading: boolean,
  afterSuccessFunctions?: Function,
  dataParameter: string,
  processData: Function,
  csvReaderId: string,
};

const CsvUpload = (props: Props) => {
  const {
    mutation,
    mutationBody,
    verifiedColumns = [],
    isLoading,
    afterSuccessFunctions = () => {},
    dataParameter,
    processData,
    csvReaderId,
  } = props;
  const parseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: header => header.toLowerCase().replace(/\W/g, '_'),
  };
  const resetInputFileValue = () => {
    if (document.getElementById(csvReaderId || 'contactToCsv')) {
      document.getElementById(csvReaderId || 'contactToCsv').value = '';
    }
  };
  const handleImportedCsvFile = async (data, fileInfo) => {
    // according to RFC 7111 this first condition below should be replaced with -> text/csv
    if (
      fileInfo.type === 'application/vnd.ms-excel' ||
      fileInfo.type.includes('csv')
    ) {
      if (data.length > 0) {
        if (checkColumns(data)) {
          const invitedCustomers = processData(data);

          await mutation(
            {
              ...mutationBody,
              [dataParameter]: invitedCustomers,
            },
            {
              onSuccess: async res => {
                if (!afterSuccessFunctions) {
                  return Message.success();
                }
                await afterSuccessFunctions(res.data);
              },
              onError: error => {
                return Message.error(error);
              },
            },
          );
          resetInputFileValue();
        } else {
          resetInputFileValue();
          Message.error({}, { message: 'Format of the file is invalid' });
        }
      } else {
        resetInputFileValue();
        Message.error(
          {},
          { message: 'Please add at least one contact in file' },
        );
      }
    } else {
      resetInputFileValue();
      Message.error({}, { message: 'Please upload a valid file' });
    }
  };
  const checkColumns = data => {
    let result = false;
    const columns = Object.keys(data[0]);
    const isOkay = columns.every(
      (item, index) => item.toUpperCase() === verifiedColumns[index],
    );
    if (isOkay) {
      result = true;
    }
    return result;
  };
  const handleImportedCsvFileError = ({ err }) => {
    Message.error({}, { message: err });
  };

  return (
    <React.Fragment>
      <CSVReader
        accept=".csv"
        cssClass="csv-reader-input"
        onFileLoaded={handleImportedCsvFile}
        onError={handleImportedCsvFileError}
        label=""
        parserOptions={parseOptions}
        inputId={csvReaderId || 'contactToCsv'}
        inputStyle={{ display: 'none' }}
      />
      {isLoading && <PleaseWait />}
    </React.Fragment>
  );
};

export default CsvUpload;
