/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';

import { Card, CardHeader, CardContent, Grid } from '@material-ui/core';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';

import {
  dashboardPanelChart,
  dashboardShippedProductsChart,
  dashboardAllProductsChart,
  dashboard24HoursPerformanceChart,
} from './charts';

import './dashboard.css';

ChartJS.register(BarElement, CategoryScale, Legend, LinearScale, LineElement, PointElement, Title, Tooltip);

const PanelHeader = ({ content, size }: { content: JSX.Element; size: string }) => {
  return <div className={'panel-header ' + (size !== undefined ? 'panel-header-' + size : '')}>{content}</div>;
};

const Stats = ({ children }: { children: { i: string; t: string }[] }) => {
  const stats: (JSX.Element | string)[] = [];
  for (let i = 0; i < children.length; i++) {
    stats.push(<i className={children[i].i} key={i} />);
    stats.push(' ' + children[i].t);
    if (i !== children.length - 1) {
      stats.push(<br />);
    }
  }
  return <div className="stats">{stats}</div>;
};

const Dashboard = (): JSX.Element => {
  const chartRef = React.useRef<ChartJS>(null);
  const headerData = dashboardPanelChart.data();

  return (
    <section className="dashboard pt-4">
      <div>
        <h2>Average Hashrate</h2>
        <PanelHeader size="lg" content={<Line data={headerData} options={dashboardPanelChart.options} />} />
        <div className="content">
          <Grid container spacing={3} className="my-5">
            <Grid item xs={12} md={4}>
              <Card className="card-chart">
                <CardHeader title="Hash Dificulty" subheader="Current Coin: ZEC" />
                <CardContent>
                  <div className="chart-area">
                    {/* <Line data={dashboardShippedProductsChart.data} options={dashboardShippedProductsChart.options} /> */}
                  </div>
                </CardContent>
                <Stats>{[{ i: 'now-ui-icons arrows-1_refresh-69', t: 'Past 12 Hours' }]}</Stats>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card className="card-chart">
                <CardHeader title="Hash Dificulty" subheader="Current Coin: ZEC" />
                <CardContent>
                  <div className="chart-area">
                    {/* <Line data={dashboardAllProductsChart.data} options={dashboardAllProductsChart.options} /> */}
                  </div>
                </CardContent>
                <Stats>{[{ i: 'now-ui-icons arrows-1_refresh-69', t: 'Just Updated' }]}</Stats>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card className="card-chart">
                <CardHeader title="Hash Dificulty" subheader="Current Coin: ZEC" />
                <CardContent>
                  <div className="chart-area">
                    {/* <Bar
                      data={dashboard24HoursPerformanceChart.data}
                      options={dashboard24HoursPerformanceChart.options}
                    /> */}
                  </div>
                </CardContent>
                <Stats>{[{ i: 'now-ui-icons ui-2_time-alarm', t: 'Past Day' }]}</Stats>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
