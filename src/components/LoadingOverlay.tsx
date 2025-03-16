import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingOverlay = () => {
  return (
    <OverlayContainer>
      <CircularProgress />
    </OverlayContainer>
  );
};

const OverlayContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 9999;
`;

export default LoadingOverlay;