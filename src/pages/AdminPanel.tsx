import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from '../components/sidebar';

const AdminPanel = () => {
  return (
    <Container>
      <Sidebar />
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