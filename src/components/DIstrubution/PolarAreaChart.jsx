import React from 'react';
import ReactApexChart from 'react-apexcharts';

const PolarAreaChart = () => {
    const series = [14, 23, 21, 17, 15, 10];
    const options = {
        chart: {
            type: 'polarArea',
        },
        stroke: {
            colors: ['#fff'],
        },
        fill: {
            opacity: 1,
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 300,
                    },
                    legend: {
                        position: 'bottom',
                    },
                },
            },
        ],
        labels: ['Series 1', 'Series 2', 'Series 3', 'Series 4', 'Series 5', 'Series 6'],
        legend: {
            labels: {
                colors: Array(9).fill('#fff'),
            },
        },
        dataLabels: {
            style: {
                colors: Array(9).fill('#fff'),
            },
        },
    };

    return (
        <div className='chartpie'>
            <div id="chart" className='max-[600px]:!w-[100%]'>
                <ReactApexChart options={options} series={series} type="polarArea" />
            </div>
            <div id="html-dist"></div>
        </div>
    );
};

export default PolarAreaChart;
