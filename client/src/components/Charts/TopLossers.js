import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useStateContext } from "../../Contexts/ContextProvider";

const TopLossers = () => {
  //received data from usestate
  const { StockData } = useStateContext();

  //not considering 1st object as it was nifty and its not a stock
  const stocks = StockData?.data?.slice(1);

  //filtering and storing top lossers into new array
  let topLossers = [];
  stocks?.forEach((x) => {
    if (x.pChange < 0) {
      topLossers.push(x);
    }
  });

  //reverse the array as initially they where in ascending order and we need descending order
  topLossers.reverse();

  //defining rows for the table. taking only name and price change for table data
  let rows = [];

  topLossers?.forEach((x) => {
    const symbol = x.symbol;
    const pChange = x.pChange;

    rows.push({ symbol, pChange });
  });

  //defining columns headings
  const columns = [
    { id: "symbol", label: "Top\u00a0Lossers", minWidth: 50 },
    { id: "pChange", label: "%\u00a0Change", minWidth: 50 },
  ];

  //usestate for table page navigation

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //plotting table form given rows and columns.refer material ui table component
  return (
    <>
      <Paper
        sx={{ width: "100%", overflow: "hidden" }}
        style={{ maxWidth: 450 }}
      >
        <TableContainer sx={{ maxHeight: 320, maxWidth: 450 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.symbol}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default TopLossers;
