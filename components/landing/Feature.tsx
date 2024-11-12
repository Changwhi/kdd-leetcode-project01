interface FeatureProps {
  title: string;
  description: string;
  video_link: string;
  flip: boolean;
}

export function Feature({
  title,
  description,
  video_link,
  flip,
}: FeatureProps) {
  const containerClass = flip
    ? " bg-muted space-y-12 mt-6 p-6 md:p-8"
    : " space-y-12 mt-6 p-6 md:p-8";

  return (
    <div className={containerClass}>
      {flip && (
        <div className="mx-auto grid items-center gap-8 sm:max-w-4xl grid-cols-[3fr,2fr] md:gap-12 lg:max-w-5xl lg:grid-cols-[3fr,2fr]">
          <div className="grid gap-8">
            <h3 className="text-2xl font-bold">{title}</h3>
            <p className="text-lg text-muted-foreground">{description}</p>
          </div>
          <div className="grid gap-1 ">
            <img src={video_link} className="rounded-2xl" />
          </div>
        </div>
      )}

      {!flip && (
        <div className="mx-auto grid items-center gap-8 sm:max-w-4xl grid-cols-[2fr,3fr] md:gap-12 lg:max-w-5xl lg:grid-cols-[2fr,3fr]">
          <div className="grid gap-1 ">
            <img src={video_link} className="rounded-2xl" />
          </div>
          <div className="grid gap-8">
            <h3 className="text-2xl font-bold">{title}</h3>
            <p className="text-lg text-muted-foreground">{description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
