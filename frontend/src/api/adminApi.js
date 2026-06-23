import api from "./axios";

export const getAdminOverview =
  async () => {
    const response =
      await api.get(
        "/admin/overview"
      );

    return response.data;
  };