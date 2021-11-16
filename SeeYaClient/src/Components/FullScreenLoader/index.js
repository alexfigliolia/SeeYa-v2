import { memo } from 'react';
import { useSelector } from 'react-redux';
import Loader from 'Components/Loader';
import './_FullScreenLoader.scss';

function FullScreenLoader() {
  const { height, width } = useSelector(({ Screen }) => Screen);
  return (
    <div
      className='full-screen-loader'
      style={{
        height,
        width
      }}>
      <Loader />
    </div>
  );
}

export default memo(FullScreenLoader);