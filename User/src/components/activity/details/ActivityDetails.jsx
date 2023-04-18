import { useParams } from 'react-router';
import { Galleria } from 'primereact/galleria';
import { useActivityDetails } from '../../../hooks/activity/ActivityDetails'
import { Button } from 'primereact/button';
import { TimeLine } from '../timeLine/TimeLine';
import { Badge } from 'primereact/badge';
import { getBadgeColor } from '../../../utils/getBadgeColor';
import { Confirm } from '../../confirm/Confirm';
import { useRef } from 'react';
import { Toast } from 'primereact/toast';
import { Comment } from '../comment/Comment';
import AddFeedback from '../FeedBack/AddFB';
import { Rating } from 'primereact/rating';
export const ActivityDetails = () => {
  const { id } = useParams();
  const { itemTemplate, responsiveOptions, thumbnailTemplate,
    activity, user, timeLineVisablity, itemTemplateVideo,
    thumbnailTemplateVideo, toast,
    rejectHandle,
    acceptHandle,
    handleApplyToActivity,
    refreshActivity,
    loading
  } = useActivityDetails(id)
  if (!activity || activity.length === 0 || loading) {
    return <h1>Loading...</h1>
  }


  if (!user) {
    return <h1>usre not logged in</h1>
  }
  const badgeColor = getBadgeColor(user.status)
  return (
    <>

      <div className=" flex flex-column  ">
        <div>

          <div className="user-image p-mr-3">
            <img className='w-2' src={activity?.photos[activity?.photos.length - 1]?.url || `https://argauto.lv/application/modules/themes/views/default/assets/images/image-placeholder.png`} />
          </div>
          <div className="user-info p-d-flex p-flex-column p-jc-between">
            <div className="user-header p-d-flex p-ai-center">
              <h1 className="p-m-0">{activity.name}</h1>
            </div>
            <div className="user-body">
              <p>{activity.description}</p>
            </div>
            <div className="user-footer p-d-flex p-jc-between p-ai-center">
              <h1 className="p-m-0">Time: {activity.duration}hr</h1>
              <Rating value={activity.rate} readOnly cancel={false} />
            </div>
          </div>
        </div>
        <div>
          {!timeLineVisablity &&
            <div>
              < Button label='apply to Activity' onClick={handleApplyToActivity} />
            </div>
          }
          {timeLineVisablity &&
            <div>
              <div>
                {user.status !== 'ative' && < Confirm severityColor="danger" lableMessage={"Mark Complete"} message={"are you sure that you complete it"} accept={acceptHandle} reject={rejectHandle} />
                }          </div>
              <div>
                <TimeLine progress={timeLineVisablity.activityStatus || user.status} />
              </div>
            </div>
          }

        </div>
      </div>
      {activity.photos.length > 0 &&
        <div className='flex flex-column align-items-center justify-content-center '>
          <div className="card">
            <Galleria value={activity.photos} responsiveOptions={responsiveOptions} numVisible={5} style={{ maxWidth: '50vw' }}
              item={itemTemplate} thumbnail={thumbnailTemplate} />
          </div>
        </div>}

      <div>
        {user && <AddFeedback activity={activity} userId={user._id} activityId={activity._id} onAdd={refreshActivity} />
        }        {
          (user && activity.feedback.length)
          &&
          <>
            {activity.feedback.map((fb) => {
              if (fb.createdBy !== null) {
                return < Comment key={fb._id} rate={fb.rate} description={fb.description} name={fb.createdBy.fullName} />
              }
            }
            )}
          </>
        }
      </div >
      <Toast ref={toast} />
    </>

  )
}
