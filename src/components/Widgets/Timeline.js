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
    <Card sx={{ minWidth: 200 }}>
      <CardContent>
        <Typography sx={{ fontSize: 20 }} color="text.primary">
          Today
        </Typography>
        <Timeline position="alternate">
          {meetings.map((meeting) => (
            <TimelineItem>
              <TimelineOppositeContent color="text.secondary">
                {meeting.time}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color={meeting.priority} />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>{meeting.title}</TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
};

export default TimelineWidget;
