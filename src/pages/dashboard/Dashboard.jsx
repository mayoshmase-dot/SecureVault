import { } from '@mui/material';
import StatCard from '../../components/statCard/StatCard';
import VaultControl from '../../components/vaultControl/VaultControl';
import Credentials from '../../components/credentials/Credentials';
import PasswordExpiryBanner from '../../components/banner/PasswordExpiryBanner';

export default function Dashboard() {
  return (
    <>
    <PasswordExpiryBanner />
      <StatCard />
      <VaultControl />
      <Credentials />
    </>
  );
}