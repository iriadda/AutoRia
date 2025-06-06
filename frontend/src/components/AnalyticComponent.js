import { useEffect, useState } from "react";
import AnalyticService from "../services/analyticService";

const AnalyticComponent = ({ carId }) => {
  const [analytics, setAnalytics] = useState(null);
  const id = carId.id;

  useEffect(() => {
    AnalyticService.get(id)
      .then(({ data }) => setAnalytics(data))
  }, [id]);

  if (!analytics) {
    return <p>Loading analytics...</p>;
  }

  const { views, pricing } = analytics;

  const formatNumber = (num) => (num !== null && num !== undefined ? num.toLocaleString() : 'N/A');
  return (
    <div>
      <h2>Analytics for Vehicle ID: {id}</h2>

      <h3>Views</h3>
      <ul>
        <li>Total: {views?.total !== undefined ? views.total : 'N/A'}</li>
        <li>Day: {views?.day !== undefined ? views.day : 'N/A'}</li>
        <li>Week: {views?.week !== undefined ? views.week : 'N/A'}</li>
        <li>Month: {views?.month !== undefined ? views.month : 'N/A'}</li>
      </ul>

      <h3>Pricing</h3>
      <ul>
        <li>Region: {pricing?.region }</li>
        <li>Average Price in Region USD: {(pricing?.average_price_region_usd)}</li>
        <li>Average Price in Ukraine USD: {(pricing?.average_price_ua_usd)}</li>
      </ul>
    </div>
  );
};

export default AnalyticComponent;
