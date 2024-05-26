export declare namespace ApiRequest {}

export declare namespace ApiResponse {
  export type App = {
    bundleId?: string;
    iconUrl: string;
    id: string;
    name: string;
    url: string;
    description?: string;
    bannerUrl?: string;
  };

  export type AppCategory = {
    apps: App[];
    id: string;
    name: string;
  };

  export type AppStore = {
    version: string;
    url: string;
    categories: AppCategory[];
  };
}
