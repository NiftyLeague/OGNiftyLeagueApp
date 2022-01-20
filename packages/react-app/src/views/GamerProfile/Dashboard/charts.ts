import { Chart as ChartJS } from 'chart.js';

// ##############################
// // // Function that converts a hex color number to a RGB color number
// #############################
function hexToRGB(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return alpha ? `rgba(${r}, ${g}, ${b}, ${alpha})` : `rgba(${r}, ${g}, ${b})`;
}

// ##############################
// // // general constiables for charts
// #############################

const chartColor = '#FFFFFF';

// General configuration for the charts with Line gradientStroke
const gradientChartOptionsConfiguration = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  tooltips: {
    bodySpacing: 4,
    mode: 'nearest',
    intersect: 0,
    position: 'nearest',
    xPadding: 10,
    yPadding: 10,
    caretPadding: 10,
  },
  responsive: 1,
  scales: {
    yAxes: [
      {
        display: 0,
        ticks: {
          display: false,
        },
        gridLines: {
          zeroLineColor: 'transparent',
          drawTicks: false,
          display: false,
          drawBorder: false,
        },
      },
    ],
    xAxes: [
      {
        display: 0,
        ticks: {
          display: false,
        },
        gridLines: {
          zeroLineColor: 'transparent',
          drawTicks: false,
          display: false,
          drawBorder: false,
        },
      },
    ],
  },
  layout: {
    padding: { left: 0, right: 0, top: 15, bottom: 15 },
  },
};

const gradientChartOptionsConfigurationWithNumbersAndGrid = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  tooltips: {
    bodySpacing: 4,
    mode: 'nearest',
    intersect: 0,
    position: 'nearest',
    xPadding: 10,
    yPadding: 10,
    caretPadding: 10,
  },
  responsive: 1,
  scales: {
    yAxes: [
      {
        gridLines: {
          zeroLineColor: 'transparent',
          drawBorder: false,
        },
      },
    ],
    xAxes: [
      {
        display: 0,
        ticks: {
          display: false,
        },
        gridLines: {
          zeroLineColor: 'transparent',
          drawTicks: false,
          display: false,
          drawBorder: false,
        },
      },
    ],
  },
  layout: {
    padding: { left: 0, right: 0, top: 15, bottom: 15 },
  },
};

// ##############################
// // // Dashboard view - Hashrate chart
// #############################

// Chart for Dashboard view - Will be rendered in panel
export const dashboardPanelChart = {
  data: () => {
    // const ctx = canvas.getContext('2d');
    // const gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    // gradientStroke.addColorStop(0, '#80b6f4');
    // gradientStroke.addColorStop(1, chartColor);
    // const gradientFill = ctx.createLinearGradient(0, 200, 0, 50);
    // gradientFill.addColorStop(0, 'rgba(128, 182, 244, 0)');
    // gradientFill.addColorStop(1, 'rgba(255, 255, 255, 0.14)');

    return {
      labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
      datasets: [
        {
          label: 'Sol/s',
          borderColor: chartColor,
          pointBorderColor: chartColor,
          pointBackgroundColor: '#2c2c2c',
          pointHoverBackgroundColor: '#2c2c2c',
          pointHoverBorderColor: chartColor,
          pointBorderWidth: 1,
          pointHoverRadius: 7,
          pointHoverBorderWidth: 2,
          pointRadius: 5,
          fill: true,
          // backgroundColor: gradientFill,
          borderWidth: 2,
          data: [
            10243.4, 14898.5, 17458.1, 16986.5, 16288.3, 17340.6, 18467.2, 17486.3, 18579.8, 19563.3, 20288.3, 19784.9,
          ],
        },
      ],
    };
  },
  options: {
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: 0,
        bottom: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: '#fff',
      titleFontColor: '#333',
      bodyFontColor: '#666',
      bodySpacing: 4,
      xPadding: 12,
      mode: 'nearest',
      intersect: 0,
      position: 'nearest',
    },
    legend: {
      position: 'bottom',
      fillStyle: '#FFF',
      display: false,
    },
    // scales: {
    //   yAxes: [
    //     {
    //       ticks: {
    //         fontColor: 'rgba(255,255,255,0.4)',
    //         fontStyle: 'bold',
    //         beginAtZero: true,
    //         maxTicksLimit: 5,
    //         padding: 10,
    //       },
    //       gridLines: {
    //         drawTicks: true,
    //         drawBorder: false,
    //         display: true,
    //         color: 'rgba(255,255,255,0.1)',
    //         zeroLineColor: 'transparent',
    //       },
    //     },
    //   ],
    //   xAxes: [
    //     {
    //       gridLines: {
    //         display: false,
    //         color: 'rgba(255,255,255,0.1)',
    //       },
    //       ticks: {
    //         padding: 10,
    //         fontColor: 'rgba(255,255,255,0.4)',
    //         fontStyle: 'bold',
    //       },
    //     },
    //   ],
    // },
  },
};

// ##############################
// // // Dashboard view - Hash Difficulty
// #############################

// Chart for Dashboard view - Shipped Products Card
export const dashboardShippedProductsChart = {
  data: canvas => {
    const ctx = canvas.getContext('2d');
    const gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, '#80b6f4');
    gradientStroke.addColorStop(1, chartColor);
    const gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
    gradientFill.addColorStop(0, 'rgba(128, 182, 244, 0)');
    gradientFill.addColorStop(1, 'rgba(249, 99, 59, 0.40)');
    return {
      labels: ['12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM'],
      datasets: [
        {
          label: 'M Hashes',
          borderColor: '#f96332',
          pointBorderColor: '#FFF',
          pointBackgroundColor: '#f96332',
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          fill: true,
          backgroundColor: gradientFill,
          borderWidth: 2,
          data: [542, 480, 430, 550, 530, 453, 380, 434, 568, 610, 700, 630],
        },
      ],
    };
  },
  options: gradientChartOptionsConfiguration,
};

// ##############################
// // // Dashboard view - Revenue
// #############################

// Chart for Dashboard view - All products Card
export const dashboardAllProductsChart = {
  data: canvas => {
    const ctx = canvas.getContext('2d');
    const gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, '#18ce0f');
    gradientStroke.addColorStop(1, chartColor);
    const gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
    gradientFill.addColorStop(0, 'rgba(128, 182, 244, 0)');
    gradientFill.addColorStop(1, hexToRGB('#18ce0f', 0.4));
    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'USD',
          borderColor: '#18ce0f',
          pointBorderColor: '#FFF',
          pointBackgroundColor: '#18ce0f',
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          fill: true,
          backgroundColor: gradientFill,
          borderWidth: 2,
          data: [40, 650, 1230, 2300, 3560, 4040, 5430, 6320, 7854, 9103, 10790, 12221],
        },
      ],
    };
  },
  options: gradientChartOptionsConfigurationWithNumbersAndGrid,
};

// ##############################
// // // Dashboard view - Payouts
// #############################

// Chart for Dashboard view - 24 Hours Performance Card
export const dashboard24HoursPerformanceChart = {
  data: canvas => {
    const ctx = canvas.getContext('2d');
    const gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
    gradientFill.addColorStop(0, 'rgba(128, 182, 244, 0)');
    gradientFill.addColorStop(1, hexToRGB('#2CA8FF', 0.6));
    return {
      labels: ['12PM', '2PM', '4PM', '6PM', '8PM', '10PM', '12AM', '2AM', '4AM', '6AM', '8AM', '10AM'],
      datasets: [
        {
          label: 'ZEC',
          backgroundColor: gradientFill,
          borderColor: '#2CA8FF',
          pointBorderColor: '#FFF',
          pointBackgroundColor: '#2CA8FF',
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          fill: true,
          borderWidth: 1,
          data: [0.0342, 0.0108, 0.0208, 0.0119, 0.0211, 0.0217, 0.0123, 0.0215, 0.012, 0.0321, 0.0177, 0.0214],
        },
      ],
    };
  },
  options: {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    tooltips: {
      bodySpacing: 4,
      mode: 'nearest',
      intersect: 0,
      position: 'nearest',
      xPadding: 10,
      yPadding: 10,
      caretPadding: 10,
    },
    responsive: 1,
    scales: {
      yAxes: [
        {
          gridLines: {
            zeroLineColor: 'transparent',
            drawBorder: false,
          },
        },
      ],
      xAxes: [
        {
          display: 0,
          ticks: {
            display: false,
          },
          gridLines: {
            zeroLineColor: 'transparent',
            drawTicks: false,
            display: false,
            drawBorder: false,
          },
        },
      ],
    },
    layout: {
      padding: { left: 0, right: 0, top: 15, bottom: 15 },
    },
  },
};
