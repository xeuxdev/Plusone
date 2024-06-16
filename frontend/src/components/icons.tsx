import {
  Eye,
  EyeOff,
  HeartIcon,
  Image,
  Loader,
  MoveLeftIcon,
  PlusIcon,
  Search,
  Trash,
} from "lucide-react";

export const Icons = {
  eye: Eye,
  eyeOff: EyeOff,
  spinner: () => <Loader className="animate-spin" />,
  search: Search,
  likes: HeartIcon,
  trash: Trash,
  add: PlusIcon,
  image: Image,
  arrowLeft: MoveLeftIcon,
};
