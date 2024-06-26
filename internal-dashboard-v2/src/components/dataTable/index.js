import TableRow from "./tableRows";
import HKDataTableHeader from "./tableHeader";
import HKDataTableFilter from "./tableFilter";
import TableError from "./tableError";
import HKDataTableNavigation from "./tableNavigation";

const HKDataTable = (props) => {
  let {
    columns,
    rows,
    errorInApi,
    handleErrorInApi,
    handlePageNavigation,
    pageConfiguration,
  } = props;

  return (
    <div>
      <div className=" border-collapse">
        <HKDataTableFilter columns={columns} onFilter={props.onFilter} />
      </div>
      <div className=" border-collapse w-[100%] h-screen overflow-auto">
        <div className="min-w-fit">
          <HKDataTableHeader
            columns={columns}
            onSort={props.onSort}
            pageConfiguration={pageConfiguration}
          />
          {!errorInApi && (
            <TableRow link={props.link} rowData={rows} tableColumn={columns} />
          )}
          {errorInApi && (
            <TableError
              handleErrorInApi={handleErrorInApi}
              errorInApi={errorInApi}
            />
          )}
        </div>
      </div>
      <div className=" border-collapse w-full min-w-fit mb-24 mx-auto">
        {!errorInApi && (
          <HKDataTableNavigation
            handlePageNavigation={handlePageNavigation}
            pageConfiguration={pageConfiguration}
          />
        )}
      </div>
    </div>
  );
};

export default HKDataTable;
