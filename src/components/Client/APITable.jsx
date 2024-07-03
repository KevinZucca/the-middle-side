import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, Collapse, Typography } from "@mui/material";
import { useOrders } from "../../contexts/OrdersContext";

function Row({ company, deleteUrlSection }) {
  const [openRows, setOpenRows] = React.useState([]);
  const excludedKeys = ["id", "apiName", "url"];
  const { url, setUrl, selectedButtons, setSelectedButtons } = useOrders();

  const handleToggle = (index) => {
    const currentIndex = openRows.indexOf(index);
    const newOpenRows = [...openRows];
    if (currentIndex === -1) {
      newOpenRows.push(index);
    } else {
      newOpenRows.splice(currentIndex, 1);
    }
    setOpenRows(newOpenRows);
  };

  const handleButtonClick = (value, category, id, index) => {
    if (!url.includes(value)) {
      if (url.length > 4) {
        return;
      }
      setUrl((prevValue) => {
        const newValue = [...prevValue, value];
        setSelectedButtons((prevState) => ({
          ...prevState,
          [category]: { ...(prevState[category] || {}), [id]: true },
        }));
        return newValue;
      });
    }
  };

  const handleDeleteButtonClick = (value, category, id, index) => {
    const newUrl = url.filter((el) => el !== value);
    setUrl(newUrl);
    setSelectedButtons((prevState) => ({
      ...prevState,
      [category]: { ...(prevState[category] || {}), [id]: false },
    }));
  };

  const renderTableRow = (value, category, id, index) => (
    <TableRow key={index}>
      <TableCell component="th" scope="row">
        {value}
      </TableCell>
      <TableCell component="th" scope="row" align="right">
        <button
          onClick={() => handleButtonClick(value, category, id, index)}
          className={`border p-2 ${
            selectedButtons[category]?.[id] ? "bg-black/75 text-white" : ""
          }`}
        >
          Select
        </button>
        <button
          onClick={() => handleDeleteButtonClick(value, category, id, index)}
          className="border p-2 bg-red-500/50"
        >
          X
        </button>
      </TableCell>
    </TableRow>
  );

  return (
    <React.Fragment>
      {Object.keys(company).map((key, index) =>
        excludedKeys.includes(key) ? null : (
          <React.Fragment key={index}>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
              <TableCell className="w-[10px]">
                <IconButton size="small" onClick={() => handleToggle(index)}>
                  {openRows.includes(index) ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </IconButton>
              </TableCell>
              <TableCell
                className="capitalize w-full"
                component="th"
                scope="row"
              >
                {key}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                style={{ paddingBottom: 0, paddingTop: 0 }}
                colSpan={6}
              >
                <Collapse
                  in={openRows.includes(index)}
                  timeout="auto"
                  unmountOnExit
                >
                  <Box sx={{ margin: 1 }}>
                    <Typography
                      className="capitalize"
                      variant="h6"
                      gutterBottom
                      component="div"
                    >
                      {key}
                    </Typography>
                    <Table size="small" aria-label="purchases">
                      <TableBody>
                        {key === "Domain"
                          ? renderTableRow(company.Domain, key, "domain", index)
                          : null}
                        {key === "endpoints"
                          ? company[key].map((endpoint, idx) =>
                              renderTableRow(endpoint, key, idx, index)
                            )
                          : null}
                        {key === "queries"
                          ? company[key].map((query, idx) =>
                              renderTableRow(query.url, key, idx, index)
                            )
                          : null}
                        {key === "params"
                          ? company[key].map((params, idx) =>
                              renderTableRow(params.value, key, idx, index)
                            )
                          : null}
                      </TableBody>
                    </Table>
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
          </React.Fragment>
        )
      )}
    </React.Fragment>
  );
}

export default function APITable({ company, deleteUrlSection }) {
  return (
    <TableContainer
      component={Paper}
      style={{ height: "auto", maxHeight: "75vh", overflowY: "auto" }}
    >
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Documentation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <Row company={company} />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
