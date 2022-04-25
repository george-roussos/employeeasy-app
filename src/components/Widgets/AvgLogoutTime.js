import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";

export const TotalProfit = (props) => (
  <Card {...props}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography
            style={{ fontSize: "1.5rem" }}
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            AVG LOGOUT TIME
          </Typography>
          <Typography color="textPrimary" variant="h4">
            17:15
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: "primary.main",
              height: 56,
              width: 56,
            }}
          >
            <LogoutIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default TotalProfit;
