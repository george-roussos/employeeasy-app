import { v4 as uuid } from "uuid";

export const meetings = [
  {
    time: "09:30AM",
    title: "Pipeline Progress",
    priority: "secondary",
  },
  {
    time: "10:00AM",
    title: "All Hands",
    priority: "success",
  },
  {
    time: "11:00AM",
    title: "Debrief",
    priority: "error",
  },
  {
    time: "13:00AM",
    title: "Biweekly Update",
    priority: "primary",
  },
];

export const requests = [
  {
    id: uuid(),
    ref: "PARROT",
    from: {
      name: "Anna Exempelsson",
    },
    createdAt: "2022-05-01",
    assignee: "Malin Åkesson",
    status: "active",
  },
  {
    id: uuid(),
    ref: "ZEBRA",
    from: {
      name: "Sebastian Erenholt",
    },
    createdAt: "2022-04-01",
    assignee: "Hans Bergström",
    status: "active",
  },
  {
    id: uuid(),
    ref: "CAMEL",
    from: {
      name: "Elsa Jonsson",
    },
    createdAt: "2022-04-23",
    assignee: "Jimmy Björk",
    status: "delivered",
  },
  {
    id: uuid(),
    ref: "CAT",
    from: {
      name: "Anna Lindh",
    },
    createdAt: "2022-02-01",
    assignee: "Oline Eriksson",
    status: "blocked",
  },
  {
    id: uuid(),
    ref: "DOG",
    from: {
      name: "David Hansberg",
    },
    createdAt: "2022-03-01",
    assignee: "Linnéa Dahlberg",
    status: "forwarded",
  },
];
