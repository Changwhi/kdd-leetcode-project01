interface FeatureProps {
  title: string;
  description: string;
  video_link: string;
  filp: boolean;
}

export function Feature({ title, description, video_link, filp }: FeatureProps) {
  return (
    <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-2">
      <div className="grid gap-1">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      <div className="grid gap-1">
        <img src={video_link}></img>
      </div>
    </div>
  );
}
