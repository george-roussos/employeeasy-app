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
import { requests } from "../../helpers/widgetHelper";

export const LatestRequests = () => (
  <Card>
    <CardHeader title="Latest Requests" />
    <Box sx={{ width: "700", height: "300px", overflow: "auto" }}>
      <Table
        sx={{ width: "max-content", height: "max-content", overflow: "auto" }}
      >
        <TableHead>
          <TableRow
            style={{
              backgroundColor: "#f5f5f5",
            }}
          >
            <TableCell>Project</TableCell>
            <TableCell>From</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Assignee</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map((request) => (
            <TableRow hover key={request.id}>
              <TableCell>{request.ref}</TableCell>
              <TableCell>{request.from.name}</TableCell>
              <TableCell>{request.createdAt}</TableCell>
              <TableCell>{request.assignee}</TableCell>
              <TableCell>
                <CircleIcon
                  style={{
                    fontSize: "10px",
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

export default LatestRequests;
