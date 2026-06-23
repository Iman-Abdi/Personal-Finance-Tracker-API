import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";

import {
  registerUser,
  loginUser,
  getProfile,
} from "../../api/authApi";

export const useRegister =
  () => {
    return useMutation({
      mutationFn:
        registerUser,
    });
  };

export const useLogin =
  () => {
    return useMutation({
      mutationFn:
        loginUser,
    });
  };

export const useProfile =
  () => {
    return useQuery({
      queryKey: [
        "profile",
      ],

      queryFn:
        getProfile,
    });
  };