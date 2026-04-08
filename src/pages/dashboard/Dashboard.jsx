import { } from '@mui/material';
import StatCard from '../../components/statCard/StatCard';
import VaultControl from '../../components/vaultControl/VaultControl';
import Category from '../../components/category/Category';

export default function Dashboard() {
  return (
    <>
      <StatCard />
      <VaultControl />
      <Category />
    </>
  );
}