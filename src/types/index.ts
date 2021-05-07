export type View = "home" | "sources" | "about";

export type Theme = "light" | "dark";

export interface AppState {
  app: {
    view: "home" | "about" | "sources";
    theme: "dark" | "light";
    subreddits: Array<"technology" | "worldnews" | string>;
  }
}
