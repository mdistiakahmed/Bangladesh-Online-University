type Props = {
  title: string;
  youtubeVideoId?: string;
  locked?: boolean;
  lockedTitle?: string;
  lockedSubtitle?: string;
};

export default function VideoPlayer({
  title,
  youtubeVideoId = "CSCnZdSLoA4",
  locked = false,
  lockedTitle = "This lesson is locked",
  lockedSubtitle = "Enroll to unlock all video lessons.",
}: Props) {
  const embedUrl = `https://www.youtube.com/embed/${youtubeVideoId}`;

  return (
    <div className="relative aspect-video bg-black">
      {!locked ? (
        <iframe
          className="w-full h-full"
          src={embedUrl}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-gray-900 to-black">
          <div className="text-center px-6">
            <div className="text-white text-xl sm:text-2xl font-bold mb-2">{lockedTitle}</div>
            <div className="text-gray-300 text-sm sm:text-base">{lockedSubtitle}</div>
          </div>
        </div>
      )}
    </div>
  );
}