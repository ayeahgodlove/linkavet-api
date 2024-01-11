import { IBanner, IBannerResponse, IBannerResponses } from "models/banner";
import { requestType } from ".";

export const bannerService = {
  list: (): Promise<IBannerResponses> => requestType.get("/api/banners"),
  details: (code: string): Promise<IBannerResponse> =>
    requestType.get(`/api/banners/${code}`),
  create: async (banner: IBanner): Promise<IBannerResponse> =>
    requestType.post(`/api/banners`, banner),
  update: (banner: IBanner): Promise<IBannerResponse> =>
    requestType.put(`/api/banners/${banner.id}`, banner),
  delete: (banner: IBanner): Promise<IBannerResponse> =>
    requestType.del(`/api/banners/${banner.id}`, banner),
};
