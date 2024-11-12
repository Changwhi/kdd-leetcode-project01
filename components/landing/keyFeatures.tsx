import { Feature } from "./Feature";

export function KeyFeatures() {
  const features = [
    {
      id: 0,
      title: "1. Create a Study Group",
      description:
        "Easily set up a new study group with customizable settings and a private mode that only allows access to those with invitation link.",
      video_link:
        "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzBrcTVoMjl6NHFxMjAweXA4M2theGZrNGg2dGFhY3Jma3psOWlleSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/soVAoyg1E4UgTpVYBl/giphy.gif",
    },
    {
      id: 1,
      title: "1. Create A Study Group",
      description:
        "Easily set up a new study group with customizable settings and a private mode that only allows access to those with invitation link.",
      video_link:
        "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzBrcTVoMjl6NHFxMjAweXA4M2theGZrNGg2dGFhY3Jma3psOWlleSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/soVAoyg1E4UgTpVYBl/giphy.gif",
    },
    {
      id: 2,
      title: "1. Create A Study Group",
      description:
        "Easily set up a new study group with customizable settings and a private mode that only allows access to those with invitation link.",
      video_link:
        "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzBrcTVoMjl6NHFxMjAweXA4M2theGZrNGg2dGFhY3Jma3psOWlleSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/soVAoyg1E4UgTpVYBl/giphy.gif",
    },
    {
      id: 3,
      title: "1. Create A Study Group",
      description:
        "Easily set up a new study group with customizable settings and a private mode that only allows access to those with invitation link.",
      video_link:
        "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzBrcTVoMjl6NHFxMjAweXA4M2theGZrNGg2dGFhY3Jma3psOWlleSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/soVAoyg1E4UgTpVYBl/giphy.gif",
    },
  ];

  return (
    <div>
        {features.map(feature => <Feature title={feature.title} description={feature.description} video_link={feature.video_link} flip={feature.id % 2 === 0 ? true : false} />)}
    </div>
  );
}
