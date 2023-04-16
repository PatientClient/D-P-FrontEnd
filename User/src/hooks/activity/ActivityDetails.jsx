import { useEffect, useRef, useState } from "react";
import useApi from "../useApi";
import useApiRequest from "../useApiRequest";
import ReactPlayer from "react-player";
import { PRODUCE_URL } from "../../globalData";
import useProduceApi from "../producerApi";


export function useActivityDetails(id) {
  const { data: activity, request: refreshActivity } = useApi(`/activities/${id.toString()}`, "GET");
  const { request } = useApiRequest()
  const { data: user, request: userRequest } = useApi('/user/signedInUser')
  const [timeLineVisablity, setTimeLineVisablity] = useState(false)
  const toast = useRef(null)
  const [unknownUser, setUnknownUser] = useState(false)
  const { produce } = useProduceApi()
  const [Loading, setLoading] = useState(false)
  useEffect(() => {
    if (!user) {
      setUnknownUser(true)
      setLoading(true)
    }
    else {
      setUnknownUser(false)
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (activity && user && user?.activities?.length > 0) {
      const res = checkIfStartedActivity()
      if (res) {
        setTimeLineVisablity(res)
      }
      else {
        notActiveStatus()
      }
    }
  }, [])


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
    return <img src={item.url} alt={item.id} style={{ width: '30vw' }} />
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
    await refreshActivity()
    await userRequest()
  };

  const rejectHandle = () => {
    toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
  };

  async function NotifyDoctor() {
    const lastCreatedActivity = user.activities.length > 0 ? user.activities.reduce((prev, current) => {
      return new Date(current.createdAt) > new Date(prev.createdAt) ? current : prev;
    }) : null;

    let userStatus = ''
    let BadgeColor = ''
    const currentDate = new Date();
    const lastActivityDate = lastCreatedActivity ? new Date(lastCreatedActivity.createdAt) : null;

    const currentHour = currentDate.getHours()
    const lastHour = lastActivityDate ? lastActivityDate.getHours() : null;

    if (!lastHour && currentHour) {
      userStatus = `did for the first time @${currentHour} o'clock`
      BadgeColor = 'info'
    }
    else if (currentHour === lastHour) {
      userStatus = `did on Time @ ${currentHour} o'clock`
      BadgeColor = 'success'
    }
    else if (lastHour && lastHour !== currentHour) {
      userStatus = `not on Time, hour changed to be @ ${currentHour} o'clock`
      BadgeColor = 'warn'
    }

    //message to Doctor Dashboard
    if (userStatus && BadgeColor) {
      const Pres = await produce({ logType: 'UL', message: { userId: user._id, status: 'InProgress', userStatus, BadgeColor } })
      console.log("Doctor Alert", Pres);
    }
  }

  const handleApplyToActivity = async () => {
    setTimeLineVisablity(true);
    const res = await request("/user/assignActivityToUser", 'POST', { userId: user._id, activityId: activity._id })
    if (!res || res.error) {
      toast.current.show({ severity: 'err', summary: 'error', detail: 'activity rejected ', life: 3000 });
      return
    }
    await userRequest()
    toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'activity applied ', life: 3000 });
    console.log(res);
    const Pres = await produce({ logType: 'UP', message: { userId: user._id, status: 'InProgress' } })
    console.log("produceStatus", Pres);

    //Check if on time or not and send notification to DashBoard
    NotifyDoctor()
  }

  const notActiveStatus = () => {
    const res = request(`/user/${user._id}`, 'PATCH', { status: 'NotActive' })
    userRequest();
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
    refreshActivity,
    Loading
  }
}