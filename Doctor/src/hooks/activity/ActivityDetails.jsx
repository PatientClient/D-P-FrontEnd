import { useState } from "react";
import useApi from "../useApi";













export function useActivityDetails(id) {
  console.log("id From customhook",id);
  const { data: activity } = useApi(`/activities/${id.toString()}`, "GET");

  const responsiveOptions = [
    {
      breakpoint: '991px',
      numVisible: 4
    },
    {
      breakpoint: '767px',
      numVisible: 3
    },
    {
      breakpoint: '575px',
      numVisible: 1
    }
  ];

  const videos = [
    {
      id: 1,
      title: "Introduction to React",
      description: "Learn the basics of React and create your first app",
      videoUrl: "https://www.youtube.com/watch?v=Ke90Tje7VS0"
    },
    {
      id: 2,
      title: "React Hooks Tutorial",
      description: "Learn how to use React Hooks to manage state and side effects",
      videoUrl: "https://www.youtube.com/watch?v=TNhaISOUy6Q"
    },
    {
      id: 3,
      title: "Building a Full-Stack App with React and Node.js",
      description: "Learn how to build a full-stack app with React and Node.js",
      videoUrl: "https://www.youtube.com/watch?v=JnEH9tYLxLk"
    }
  ];
  
  const itemTemplate = (item) => {
    return <img src={item.url} alt={item.id} style={{ width: '50vw', height: '50vh' }} />
  }

  const thumbnailTemplate = (item) => {
    return <img src={item.url} alt={item.id} style={{ width: '50vw', height: '10vh' }} />
  }
  return {
    responsiveOptions,
    itemTemplate,
    thumbnailTemplate,
    activity,
  }
}