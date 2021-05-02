import React from "react";

export default function About() {
  return (
    <div className="mx-4 my-4">
      <h1>Welcome to MNML news reader!</h1>
      <br></br>
      <p>
        MNML news reader is a basic reddit client, for desktop, tablet and
        mobile web. It allows you to add any of your favorite subreddits and use
        them as your news feed.
      </p>
      <br></br>
      <p className="my-2">
        Here are some suggested subreddits for your news feed.
      </p>
      <br></br>
      <ul>
        <li className="my-2">News</li>
        <li className="my-2">WorldNews</li>
        <li className="my-2">Nutrition</li>
        <li className="my-2">UpliftingNews</li>
        <li className="my-2">Technology</li>
        <li className="my-2">Futurology</li>
        <li className="my-2">TodayILearned</li>
      </ul>
    </div>
  );
}
