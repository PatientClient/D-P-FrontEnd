import { Avatar } from 'primereact/avatar';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import useApi from '../../../hooks/useApi';

export function Comment({ name, description, rate }) {
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem', borderRadius: '10px', backgroundColor: '#f5f5f5' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar image="https://i.pravatar.cc/150?img=3" size="xlarge" shape="circle" style={{ marginBottom: '0.5rem' }} />
        <div style={{ display: 'flex', flexDirection: "column", gap: '1rem' }}>
          <Tag value={name} className="p-mr-2" />
          <div>
            <Rating
              value={rate}
              cancel={false}
              readOnly={true}
            />
          </div>
        </div>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <p style={{ textAlign: 'center', lineHeight: '1.5', fontSize: '1rem' }}>{description}</p>
      </div>
    </div>
  );
}
