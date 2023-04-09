import { useEffect, useRef, useState } from "react";
import useApi from "../useApi";
import useApiRequest from "../useApiRequest";
import ReactPlayer from "react-player";


export function useActivityDetails(id) {
  const { data: activity, request: refreshActivity } = useApi(`/activities/${id.toString()}`, "GET");
  const { request } = useApiRequest()
  const { data: user, request: userRequest } = useApi('/user/signedInUser')
  const [timeLineVisablity, setTimeLineVisablity] = useState(false)
  const toast = useRef(null)
  const [unknownUser, setUnknownUser] = useState(false)

  useEffect(() => {
    if (!user) {
      setUnknownUser(true)
    }
    else {
      setUnknownUser(false)
    }
  }, [user])

  useEffect(() => {
    if (activity && user && user?.activities?.length > 0) {
      const res = checkIfStartedActivity()
      if (res) {
        setTimeLineVisablity(res)
      }
    }
  }, [user, activity])


  //checks if the user is created activity in the same day if he did it will return activity
  function checkIfStartedActivity() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const filteredActivities = user.activities.filter(act => act.activity === activity._id)
    const specificActivityByDate = filteredActivities.find(act => {
      const nowInActivity = new Date(act.createdAt);
      const todayInActivity = new Date(nowInActivity.getFullYear(), nowInActivity.getMonth(), nowInActivity.getDate());
      if (today.getTime() === todayInActivity.getTime()) {
        return act;
      }
    })
    return specificActivityByDate || false;
  }
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

  const itemTemplate = (item) => {
    return <img src={item.url} alt={item.id} style={{ width: '50vw', height: '50vh' }} />
  }

  const thumbnailTemplate = (item) => {
    return <img src={item.url} alt={item.id} style={{ width: '50vw', height: '10vh' }} />
  }
  const itemTemplateVideo = (item) => {
    return <ReactPlayer url={item.videoUrl} width='50vw' height='50vh' />
  }

  const thumbnailTemplateVideo = (item) => {
    return <img src={item.thumbnailUrl} alt={item.url} />
  }
  const acceptHandle = async () => {
    const res = await request(`/user/${user._id}`, 'PATCH', { status: 'Active' })

    const res2 = await request(`/user/updateUserActivity`, 'PUT', { userId: user._id, activityId: timeLineVisablity._id, activityStatus: 'Active' })
    console.log("updatedProgress", res2);
    if (res.error) {
      toast.current.show({ severity: 'error', summary: 'rejected', detail: `${error.message}`, life: 3000 });
    }
    refreshActivity()
    userRequest()
    toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
  };

  const rejectHandle = () => {
    toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
  };


  const handleApplyToActivity = async () => {
    setTimeLineVisablity(true);
    const res = await request("/user/assignActivityToUser", 'POST', { userId: user._id, activityId: activity._id })
    if (!res || res.error) {
      toast.current.show({ severity: 'err', summary: 'error', detail: 'activity rejected ', life: 3000 });
      return
    }
    userRequest()
    toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'activity applied ', life: 3000 });
    console.log(res);
  }
  return {
    responsiveOptions,
    itemTemplate,
    thumbnailTemplate,
    activity,
    user,
    timeLineVisablity,
    itemTemplateVideo,
    thumbnailTemplateVideo,
    toast,
    rejectHandle,
    acceptHandle,
    unknownUser,
    handleApplyToActivity,
    refreshActivity
  }
}