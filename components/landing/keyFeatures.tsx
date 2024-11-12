import { Feature } from "./Feature";

export function KeyFeatures() {
  const features = [
    {
      id: 0,
      title: "1. Create New Study Group with Deposit System",
      description:
        "Quickly set up a new study group with customizable settings, including title, description, private mode (accessible only with an invitation link), and a deposit system. You can adjust the deposit amount and deduction based on your preferences.",
      video_link:
        "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzBrcTVoMjl6NHFxMjAweXA4M2theGZrNGg2dGFhY3Jma3psOWlleSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/soVAoyg1E4UgTpVYBl/giphy.gif",
    },
    {
      id: 1,
      title: "2. Share Group Rules",
      description:
        "Easily share group rules and instruction using markdown language for clear communication with all members.",
      video_link:
        "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzBrcTVoMjl6NHFxMjAweXA4M2theGZrNGg2dGFhY3Jma3psOWlleSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/soVAoyg1E4UgTpVYBl/giphy.gif",
    },
    {
        id: 2,
        title: "3. Manage and Track Participation",
        description:
          "Transparently keep track of group members' assignments, participation, and deposit status. All members can monitor their status, which is managed by the group admin.",
        video_link:
          "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzBrcTVoMjl6NHFxMjAweXA4M2theGZrNGg2dGFhY3Jma3psOWlleSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/soVAoyg1E4UgTpVYBl/giphy.gif",
      },
    {
      id: 3,
      title: "4. Schedule New Events - Admin",
      description:
        "As an admin, schedule new group study sessions with details on topics, assignments, and Zoom links for online meetings.",
      video_link:
        "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzBrcTVoMjl6NHFxMjAweXA4M2theGZrNGg2dGFhY3Jma3psOWlleSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/soVAoyg1E4UgTpVYBl/giphy.gif",
    },
    {
        id: 4,
        title: "5. Submit Assignments - Group Member",
        description:
          "Submit your assignments for each event to ensure your participation is tracked and assessed.",
        video_link:
          "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHZrNjRxMzMzdXMxd3BlbGY0aHBtYTc2dDI5MW5ocjVveGdwdWJpayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pim1eL3RGSckLNk0va/giphy.gif",
      },
      {
        id: 5,
        title: "6. Explore others Assignments",
        description:
          "Gain insights by sharing your assignments and browsing others' work to learn from fellow group members.",
        video_link:
          "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmdpZjEzMHhkN3JseXE0Mmoxem5qNGMxcXB6eGQ2eHA0MnRtd2hqYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5REags7lnyRPF6cVAP/giphy.gif",
      },
  ];

  return (
    <div>
        {features.map(feature => <Feature title={feature.title} description={feature.description} video_link={feature.video_link} flip={feature.id % 2 === 0 ? true : false} />)}
    </div>
  );
}
