import { useParams } from 'react-router';
import { Galleria } from 'primereact/galleria';
import { useActivityDetails } from '../../../hooks/activity/ActivityDetails'
import { Button } from 'primereact/button';
import { TimeLine } from '../timeLine/TimeLine';
import { videos } from '../../../globalData';
import { Badge } from 'primereact/badge';
import { getBadgeColor } from '../../../utils/getBadgeColor';
import { Confirm } from '../../confirm/Confirm';
import { useRef } from 'react';
import { Toast } from 'primereact/toast';
import { Comment } from '../comment/Comment';
import AddFeedback from '../FeedBack/AddFB';
export const ActivityDetails = () => {
  const { id } = useParams();
  const { itemTemplate, responsiveOptions, thumbnailTemplate,
    activity, user, timeLineVisablity, itemTemplateVideo,
    thumbnailTemplateVideo, toast,
    rejectHandle,
    acceptHandle,
    handleApplyToActivity,
    refreshActivity,
    hideComplete
  } = useActivityDetails(id)
  if (!user) {
    return <h1>usre not logged in</h1>
  }
  if (!activity) {
    return <h1>Loading...</h1>
  }
  const badgeColor = getBadgeColor(user.status)


  return (
    <>
      {!timeLineVisablity &&
        <div>
          < Button label='apply to Activity' onClick={handleApplyToActivity} />
        </div>
      }
      {timeLineVisablity &&
        <div>
          <div>
            {timeLineVisablity.activityStatus !== 'Active' && < Confirm severityColor="danger" lableMessage={"Mark Complete"} message={"are you sure that you complete it"} accept={acceptHandle} reject={rejectHandle} />
            }          </div>
          <Badge value={user.status} className={`p-badge-${badgeColor}`} />
        </div>
      }
      <div>
        <TimeLine progress={timeLineVisablity.activityStatus || user.status} />
      </div>
      {activity.photos.length > 0 && <div>
        <h1>Add image related to this activity</h1>
        <div className="card">
          <Galleria value={activity.photos} responsiveOptions={responsiveOptions} numVisible={5} style={{ maxWidth: '50vw' }}
            item={itemTemplate} thumbnail={thumbnailTemplate} />
        </div>
      </div>}
      {activity.photos.length > 0 || videos &&
        <div div >
          <h1>addVideo related to this activity</h1>
          <div className="card">
            <Galleria value={videos} responsiveOptions={responsiveOptions} numVisible={5} style={{ maxWidth: '640px' }}
              item={itemTemplateVideo} thumbnail={thumbnailTemplateVideo} />
          </div>
        </div >

      }
      <div>
        {
          (user && activity)
          &&
          <>
            <AddFeedback activity={activity} userId={user._id} activityId={activity._id} onAdd={refreshActivity} />

            {activity.feedback.map((fb) =>
              < Comment key={fb._id} rate={fb.rate} description={fb.description} name={fb.createdBy.fullName || 'name'} />
            )}
          </>


        }
      </div >
      <Toast ref={toast} />
    </>

  )
}
