import * as React from "react";

import { Card, CardContent, Typography } from "@mui/material";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";

import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { meetings } from "../../helpers/widgetHelper";

const TimelineWidget = () => {
  return (
    <Card sx={{ minWidth: 270, overflow: "scroll" }}>
      <CardContent>
        <Typography sx={{ fontSize: "2rem" }} color="text.primary">
          Today
        </Typography>
        <Timeline position="alternate">
          {meetings.map((meeting, index) => (
            <TimelineItem key={index}>
              <TimelineOppositeContent
                sx={{ fontSize: "1.5rem" }}
                color="text.secondary"
              >
                {meeting.time}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color={meeting.priority} />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ fontSize: "1.5rem" }}>
                {meeting.title}
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
};

export default TimelineWidget;
