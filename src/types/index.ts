export type View = "home" | "sources" | "about";

export type Theme = "light" | "dark";

export interface AppState {
  view: "home" | "about" | "sources";
  theme: "dark" | "light";
  subreddits: Array<"technology" | "worldnews">;
}
