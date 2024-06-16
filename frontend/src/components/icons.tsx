import {
  Eye,
  EyeOff,
  HeartIcon,
  Loader,
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
};
