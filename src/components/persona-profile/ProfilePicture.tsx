interface ProfilePictureProps {
    image: string,
    name: string,
    onOpenFullScreen: () => void,
    online: boolean
}
export default function ProfilePicture({ image, name, onOpenFullScreen, online }:ProfilePictureProps) {
    return (
      <div className="relative">
        <div
          className="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-md cursor-pointer"
          onClick={onOpenFullScreen}
        >
          <img
            src={image || "/placeholder.svg?height=200&width=200&query=profile picture"}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        {online !== undefined && (
          <div
            className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white ${online ? "bg-green-500" : "bg-gray-400"}`}
          ></div>
        )}
      </div>
    )
  }
  