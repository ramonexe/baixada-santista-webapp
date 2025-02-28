import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const AdminPanel = () => {
  return (
    <Container>
      <Content>
        <Outlet />
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  padding: 1rem;
`;

export default AdminPanel;