import {
  Box,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import CircleIcon from "@mui/icons-material/Circle";
import { makeStyles } from "@material-ui/core/styles";
import { requests } from "../../helpers/widgetHelper";

const LatestRequests = () => {
  return (
    <Card>
      <CardHeader
        titleTypographyProps={{ variant: "h4" }}
        title="Latest Requests"
      />
      <Box sx={{ width: "800", overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow
              style={{
                backgroundColor: "#f5f5f5",
              }}
            >
              <TableCell sx={{ fontSize: "1.5rem" }}>Project</TableCell>
              <TableCell sx={{ fontSize: "1.5rem" }}>From</TableCell>
              <TableCell sx={{ fontSize: "1.5rem" }}>Date</TableCell>
              <TableCell sx={{ fontSize: "1.5rem" }}>Assignee</TableCell>
              <TableCell sx={{ fontSize: "1.5rem" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => (
              <TableRow hover key={request.id}>
                <TableCell sx={{ fontSize: "1.5rem" }}>{request.ref}</TableCell>
                <TableCell sx={{ fontSize: "1.5rem" }}>
                  {request.from.name}
                </TableCell>
                <TableCell sx={{ fontSize: "1.5rem" }}>
                  {request.createdAt}
                </TableCell>
                <TableCell sx={{ fontSize: "1.5rem" }}>
                  {request.assignee}
                </TableCell>
                <TableCell sx={{ fontSize: "1.5rem" }}>
                  <CircleIcon
                    style={{
                      fontSize: "1rem",
                      color:
                        request.status === "active"
                          ? "lightblue"
                          : request.status === "blocked"
                          ? "red"
                          : request.status === "forwarded"
                          ? "purple"
                          : "lightgreen",
                    }}
                  />
                  {"  "}
                  {request.status.charAt(0).toUpperCase()}
                  {request.status.slice(1)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
};

export default LatestRequests;
