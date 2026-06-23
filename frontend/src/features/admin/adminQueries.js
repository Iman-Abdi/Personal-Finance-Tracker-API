import { useQuery } from "@tanstack/react-query";

import { getAdminOverview } from "../../api/adminApi";

export const useAdminOverview =
  () => {
    return useQuery({
      queryKey: ["admin"],

      queryFn:
        getAdminOverview,
    });
  };