import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";
import useApi from "../useApi";
import { useState } from "react";
import { useNavigate } from "react-router";
import useApiRequest from "../useApiRequest";
import { useRef } from "react";




export function useActivityView() {
  const { data: activities, request: refresh } = useApi("/activities");
  const { request: deleteRequest } = useApiRequest();
  const navigate = useNavigate()
  const toast = useRef(null)

  const getSeverity = (duration) => {
    const durationn = Number(duration)
    switch (durationn) {
      case 0:
      case 1:
        return 'success';

      case 2:
      case 3:
        return 'warning';

      case 4 || durationn > 4:
        return 'danger';

      default:
        return null;
    }
  };


  const gridItem = (activity) => {

    const handleDelete = async (e) => {
      try {
        const res = await deleteRequest(`/activities/${e}`, 'DELETE');
        if (!res || res.error) {
          throw new Error(res.error || 'failed to delete activity');
        }
        else if (res && !res.error) {
          refresh();
          toast.current.show({ severity: 'success', summary: 'success', detail: 'activity deleted.', life: 3000 });
        }
      } catch (error) {
        toast.current.show({ severity: 'danger', summary: 'Error', detail: `${error.message}`, life: 3000 });
      }
    }

    return (
      <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
        <div className="p-4 border-1 surface-border surface-card border-round ">
          <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <div className="flex align-items-center gap-2">
              <i className="pi pi-tag"></i>
              <span className="font-semibold">{activity?.createdBy?.name}</span>
            </div>
            <Tag value={"Time: " + activity?.duration + "hr"} severity={getSeverity(activity?.duration)}></Tag>
          </div>
          <div className="flex flex-column align-items-center gap-3 py-5">
            <div className="text-2xl font-bold">{activity.name}</div>
            <img className="w-9 shadow-2 border-round" style={{height:"30vh"}} src={activity?.photos[0]?.url || "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"} alt={activity.name} />
            <Rating value={activity?.rate} readOnly cancel={false}></Rating>
            <div className="text-2xl font-bold">{activity?.description}</div>
          </div>
          <div className="flex align-items-center justify-content-between">
            <Button icon="pi pi-sign-in" severity='success' label='join' onClick={() => { navigate(`/activity/details/${activity._id}`) }} className="p-button-rounded"></Button>
          </div>
        </div>
      </div>
    );
  };


  const itemTemplate = (activity) => {
    if (!activity) {
      return;
    }
    return gridItem(activity);
  };

  const header = () => {
    return (
      <div className="flex justify-content-between ">
        <div></div>
        <div className='text-2xl font-bold'>list of activities</div>
        <div className='pr-2  '>

        </div>
      </div>
    );
  };



  return {
    getSeverity,
    gridItem,
    itemTemplate,
    header,
    activities,
    toast
  }
}