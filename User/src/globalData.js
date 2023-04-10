export const API_URL = 'http://localhost:5003/api'
export const JWTSECRET = "bTQ2eEpJkFvR8sWp"
export const statuses = [
  "NotActive", "InProgress", "Active"
];
export const videos = [{
    id: 1,
    title: "Introduction to React",
    description: "Learn the basics of React and create your first app",
    videoUrl: "https://www.youtube.com/watch?v=Ke90Tje7VS0",
    thumbnailUrl: "https://example.com/thumbnail1.jpg"
  },
  {
    id: 2,
    title: "React Hooks Tutorial",
    description: "Learn how to use React Hooks to manage state and side effects",
    videoUrl: "https://www.youtube.com/watch?v=TNhaISOUy6Q",
    thumbnailUrl: "https://example.com/thumbnail2.jpg"
  },
  {
    id: 3,
    title: "Building a Full-Stack App with React and Node.js",
    description: "Learn how to build a full-stack app with React and Node.js",
    videoUrl: "https://www.youtube.com/watch?v=JnEH9tYLxLk",
    thumbnailUrl: "https://example.com/thumbnail3.jpg"
  }
];

export const PRODUCE_URL = 'http://localhost:5003/api/producer/sendLog'