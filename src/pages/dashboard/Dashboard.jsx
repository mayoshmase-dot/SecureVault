import { } from '@mui/material';
import StatCard from '../../components/statCard/StatCard';
import VaultControl from '../../components/vaultControl/VaultControl';
import Credentials from '../../components/credentials/Credentials';

export default function Dashboard() {
  return (
    <>
      <StatCard />
      <VaultControl />
      <Credentials />
    </>
  );
}