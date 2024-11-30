// src/components/admin/AnalyticsDashboard.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    async function fetchAnalytics() {
      const response = await axios.get('/api/admin/reports', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      setAnalytics(response.data);
    }
    fetchAnalytics();
  }, []);

  if (!analytics) return <p>Loading analytics...</p>;

  return (
    <div>
      <h1>Platform Analytics</h1>
      <p>Total Users: {analytics.userAnalytics.totalUsers}</p>
      <p>Total Prompts: {analytics.promptAnalytics.totalPrompts}</p>
      <p>Total Revenue: ${analytics.transactionAnalytics.totalRevenue}</p>
    </div>
  );
};

export default AnalyticsDashboard;
