import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";

export const Budget = (props) => (
  <Card>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography
            style={{ fontSize: "1.5rem" }}
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            TIME IN MEETINGS
          </Typography>
          <Typography color="textPrimary" variant="h4">
            10 hours
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: "error.main",
              height: 56,
              width: 56,
            }}
          >
            <MeetingRoomIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          pt: 2,
          display: "flex",
          alignItems: "center",
        }}
      >
        <ArrowUpwardIcon color="error" />
        <Typography
          style={{ fontSize: "1.5rem" }}
          color="error"
          sx={{
            mr: 1,
          }}
          variant="body2"
        >
          1%
        </Typography>
        <Typography
          style={{ fontSize: "1.5rem" }}
          color="textSecondary"
          variant="caption"
        >
          Since last week
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

export default Budget;
