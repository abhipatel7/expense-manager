import AuthGuard from '@/guards/authGuard';

const Dashboard = () => <AuthGuard>Dashboard</AuthGuard>;

export default Dashboard;
