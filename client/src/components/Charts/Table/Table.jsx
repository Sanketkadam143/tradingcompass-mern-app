import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import { Container} from "@mui/material";
import { Avatar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "./Table.css";
import TableContainer from "@mui/material/TableContainer";
import { useStateContext } from "../../../Contexts/ContextProvider";

const useStyles = makeStyles(() => ({
  tcontainer: {
    width: "100%",
    alignItems: "center",
  },
  table_cell: {
    fontWeight: 600,
    fontFamily: "'Poppins', sans-serif",
    letterSpacing: ".00625em",
    fontSize: "1rem",
    textAlign: "center",
  },
  table_row: {
    fontWeight: 600,
    backgroundColor: "white",
    boxShadow: "rgba(0, 0, 0, 0.09)  3px 3px 2px",
    borderColor: "1px solid white",
  },
  profit_cell: {
    color: "#137333",
    background: "#e6f4ea",
    padding: "14px",
    borderRadius: "5px",
    fontWeight: 600,
  },
}));

const CustomTable = (props) => {
  const { leaderboard } = useStateContext();
  const ranking = leaderboard.slice(3);
  const symbol = "₹";

  const classes = useStyles();
  return (
    <>
      <section>
        <Container maxWidth="70%">
          <Typography
            variant="h6"
            sx={{
              marginTop: "20px",
              marginLeft: "20px",
              fontFamily: "sans-serif",
            }}
            fontFamily="revert-layer"
            color="black
        "
            gutterBottom
          >
            All Users
          </Typography>

          <div className={classes.tcontainer}>
            <TableContainer>
              <Table
                sx={{
                  borderCollapse: "separate",
                  borderSpacing: "0px 10px",
                  borderRadius: "60px",
                }}
              >
                <TableHead
                  sx={{
                    backgroundColor: "white",
                    padding: "20px",
                    boxShadow: "rgba(0, 0, 0, 0.09)  3px 3px 2px",
                  }}
                >
                  <TableRow>
                    {[
                      "Rank",
                      "Avatar",
                      " Name",
                      "Invested",
                      "Current",
                      "PnL",
                      "Percent Gain",
                      "Total PnL",
                    ].map((data) => (
                      <TableCell
                        style={{
                          color: "black",
                          fontWeight: "600",
                          textAlign: "center",
                          fontSize: "18px",
                          padding: "10px 6px 6px 15px",
                        }}
                        key={data}
                      >
                        {data}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody className="table_body">
                  {ranking.map((user, index) => {
                    const current = user?.margin + user?.investedProfit;
                    const percentGain =
                      user.margin === 0
                        ? 0
                        : ((user?.investedProfit / user?.margin) * 100).toFixed(
                            2
                          );
                    return (
                      <TableRow className={classes.table_row} key={user?.id}>
                        {/* Ranking*/}
                        <TableCell
                          align="center"
                          className={classes.table_cell}
                          style={{ fontWeight: "500" }}
                        >
                          {index + 4}
                        </TableCell>

                        {/* Profile picture */}
                        <TableCell
                          align="center"
                          className={classes.table_cell}
                        >
                          <Avatar
                            className={classes.purple}
                            alt={user?.name}
                            src={user?.picture}
                            style={{ margin: "auto" }}
                          >
                            {user?.name?.charAt(0)}
                          </Avatar>
                        </TableCell>
                        {/* Name*/}
                        <TableCell
                          align="center"
                          className={classes.table_cell}
                          style={{ fontWeight: "500" }}
                        >
                          {user?.name}
                        </TableCell>
                        {/* Invested Amount*/}
                        <TableCell
                          align="center"
                          className={classes.table_cell}
                        >
                          {symbol}
                          {user?.margin}
                        </TableCell>

                        {/* Current */}
                        <TableCell
                          align="center"
                          className={classes.table_cell}
                          style={{
                            color:
                              current >= user?.margin ? "#137333" : "#a50e0e",
                          }}
                        >
                          {symbol}
                          {current}
                        </TableCell>

                        {/* PnL */}
                        <TableCell
                          className={classes.table_cell}
                          align="center"
                          style={{
                            color:
                              user?.investedProfit >= 0 ? "#137333" : "#a50e0e",
                          }}
                        >
                          {symbol}
                          {user?.investedProfit}
                        </TableCell>

                        {/* Percent Gain */}
                        <TableCell
                          className={classes.table_cell}
                          align="center"
                          style={{
                            padding: "10px",
                            width: "110px",
                            fontFamily: "'Poppins', sans-serif",
                          }}
                        >
                          <div
                            className={classes.profit_cell}
                            style={{
                              color: percentGain >= 0 ? "#137333" : "#a50e0e",
                              background:
                                percentGain >= 0 ? "#e6f4ea" : "#fce8e6",
                            }}
                          >
                            <span style={{ marginRight: "6px" }}>
                              {percentGain > 0 ? (
                                <i class="fas fa-solid fa-arrow-up"></i>
                              ) : (
                                <i class="fas fa-regular fa-arrow-down"></i>
                              )}
                            </span>
                            {percentGain}%
                          </div>
                        </TableCell>

                        {/* Total PnL */}
                        <TableCell
                          className={classes.table_cell}
                          align="center"
                          style={{
                            color:
                              user?.totalProfit >= 0 ? "#137333" : "#a50e0e",
                          }}
                        >
                          {symbol}
                          {user?.totalProfit}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Container>
      </section>
    </>
  );
};

export default CustomTable;
