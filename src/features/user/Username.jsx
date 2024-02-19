import { useSelector } from "react-redux";

export default function Username() {
  const username = useSelector((state) => state.user.username);

  if (!username) return null;

  return (
    <div>
      <div className="text-sm font-semibold max-md:hidden">{username}</div>
    </div>
  );
}
