import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Panel } from 'primereact/panel';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ScrollPanel } from 'primereact/scrollpanel';
import useApi from '../../hooks/useApi';
import { useParams } from 'react-router';

export const UserProfile = () => {
  const { id } = useParams();
  const { data: user } = useApi(`/user/${id}`);
  if (!id || !user) {
    return <h1>loading....</h1>
  }
  return (
    <>
      <Card title={user.fullName} subTitle={user.status} >
        <img src={`https://i.pravatar.cc/300?u=${user._id}`} alt={user.fullName} />
      </Card>
      <Panel header="Personal Details" toggleable>
        <Divider />
        <div>
          <ul>
            <li>National ID: {user.nationalId}</li>
            <li>Email: {user.email}</li>
            <li>Phone: {user.phone}</li>
            <li>Address: {user.address}</li>
            <li>Gender: {user.gender}</li>
            <li>Birthdate: {new Date(user.birthdate).toLocaleDateString()}</li>
          </ul>
        </div>
        <Divider />
      </Panel>
      <Panel header="Doctor Details" toggleable>
        <ul>
          <li>Name: {user?.doctor?.name}</li>
          <li>Age: {user.doctor.age}</li>
          <li>Phone: {user.doctor.phone}</li>
          <li>Email: {user.doctor.email}</li>
        </ul>
      </Panel>
      <Panel header="Activity Status" toggleable>
        <ScrollPanel style={{ height: '30vh' }}>
          <DataTable value={user.activities}>
            <Column field="activity" header="Activity" />
            <Column field="activityStatus" header="Status" />
          </DataTable>
        </ScrollPanel>
      </Panel>
    </>
  );
};
