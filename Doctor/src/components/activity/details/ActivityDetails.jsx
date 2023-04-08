import { useParams } from 'react-router';
import useApi from '../../../hooks/useApi';
import { useEffect, useState } from 'react';
import { Galleria } from 'primereact/galleria';
import { useActivityDetails } from '../../../hooks/activity/ActivityDetails'
import ReactPlayer from 'react-player';
import { Button } from 'primereact/button';
import { TimeLine } from '../timeLine/TimeLine';
export const ActivityDetails = () => {
  const { id } = useParams();

  const { itemTemplate, responsiveOptions, thumbnailTemplate, activity } = useActivityDetails(id)
  const [timeLineVisablity, setTimeLineVisablity] = useState(false)
  if (!activity) {
    return <h1>Loading...</h1>
  }


  const itemTemplateVideo = (item) => {
    return <ReactPlayer url={item.videoUrl} width='50vw' height='50vh' />
  }

  const thumbnailTemplateVideo = (item) => {
    return <img src={item.thumbnailUrl} alt={item.url} />
  }
  const videos = [
    {
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

  return (
    <>
      <Button label='apply to Activity' onClick={() => { setTimeLineVisablity(true) }} />
      {timeLineVisablity &&
        <div>
          <TimeLine />
        </div>
      }
      <h1>Add image related to this activity</h1>
      <div className="card">
        <Galleria value={activity.photos} responsiveOptions={responsiveOptions} numVisible={5} style={{ maxWidth: '50vw' }}
          item={itemTemplate} thumbnail={thumbnailTemplate} />
      </div>
      <h1>addVideo related to this activity</h1>
      <div className="card">
        <Galleria value={videos} responsiveOptions={responsiveOptions} numVisible={5} style={{ maxWidth: '640px' }}
          item={itemTemplateVideo} thumbnail={thumbnailTemplateVideo} />
      </div>
    </>

  )
}
