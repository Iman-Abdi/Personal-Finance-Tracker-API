import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import {
  useNavigate,
} from "react-router-dom";

import useAuthStore from "../../store/authStore";
import { useProfile } from "../../features/auth/authQueries";

export default function UserMenu() {
  const navigate =
    useNavigate();

  const logout =
    useAuthStore(
      (state) =>
        state.logout
    );

  const { data: user } =
    useProfile();

  const handleLogout =
    () => {
      logout();

      navigate(
        "/login"
      );
    };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="ring-2 ring-white shadow-sm">
          <AvatarFallback>
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() =>
            navigate(
              "/profile"
            )
          }
        >
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={
            handleLogout
          }
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
