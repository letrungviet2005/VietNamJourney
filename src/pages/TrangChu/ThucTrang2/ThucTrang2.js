import React, { useEffect, useRef, useState } from 'react';
import classNames from "classnames/bind";
import style from './ThucTrang2.module.scss';
import ApexCharts from 'apexcharts';

const cx = classNames.bind(style);

function ThucTrang2() {
    const chartRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
    ];
    
    const hiddenElementsRef = useRef([]);
    const [chartRendered, setChartRendered] = useState(Array(7).fill(false));

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const index = hiddenElementsRef.current.indexOf(entry.target);
                if (entry.isIntersecting && !chartRendered[index]) {
                    entry.target.classList.add(style.show);
                    if (chartRefs[index].current) {
                        loadChart(chartRefs[index].current, getSeriesData(index)); // Chỉ gọi nếu chartRef.current tồn tại
                        setChartRendered((prev) => {
                            const newRendered = [...prev];
                            newRendered[index] = true;
                            return newRendered;
                        });
                    }
                }
            });
        });
    
        hiddenElementsRef.current.forEach((el) => {
            if (el) observer.observe(el);
        });
    
        return () => {
            hiddenElementsRef.current.forEach((el) => {
                if (el) observer.unobserve(el);
            });
        };
    }, [chartRendered]);

    const loadChart = (chartRef, series) => {
        if (chartRef.chart) return;

        const options = {
            series,
            chart: {
                width: 180,
                type: 'donut',
            },
            colors: ['#009245', '#CACACA'],
            plotOptions: {
                pie: {
                    startAngle: 0,
                    endAngle: 360
                }
            },
            dataLabels: {
                enabled: true
            },
            fill: {
                type: 'gradient',
            },
            legend: {
                show: false,
            },
            tooltip: {
                y: {
                    formatter: function(value) {
                        return `${value} %`;
                    }
                },
                marker: {
                    show: true
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 160
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        };

        const chart = new ApexCharts(chartRef, options);
        chart.render();

        return () => {
            chart.destroy();
            chartRef.chart = null;
        };
    };

    const getSeriesData = (index) => {
        const seriesData = [
            [23, 77],
            [22, 78],
            [14, 86],
            [13, 87],
            [10, 90],
            [10, 90],
            [8, 92]
        ];
        return seriesData[index];
    };

    return (
        <div className={cx('ThucTrang2')}>
            <div className={cx('top')}>
                <p>KHỐI LƯỢNG CHẤT THẢI RẮN SINH HOẠT PHÁT SINH NĂM 2023</p> 
            </div>
            <div className={cx('items')}>
                {Array.from({ length: 7 }).map((_, index) => (
                    <div key={index} className={cx('item', `item-${index + 1}`)} ref={el => hiddenElementsRef.current[index] = el}>
                        <div className={cx('number')}>
                            {index === 0 ? "14.500" : index === 1 ? "13.800" : index === 2 ? "8.900" : index === 3 ? "8.700" : index === 4 ? "6.500" : index === 5 ? "6.200" : "5.100"} <span>tấn/ngày</span>
                        </div>
                        <hr/>
                        <div className={cx('chart')} ref={chartRefs[index]}></div>
                        <div className={cx('title')}>
                            {index === 0 ? "Đồng bằng Sông Hồng" : index === 1 ? "Đông Nam Bộ" : index === 2 ? "Tây Nguyên" : index === 3 ? "Trung du và miền núi Bắc Bộ" : index === 4 ? "Bắc Trung Bộ" : index === 5 ? "Duyên Hải Miền Trung" : "Đồng Bằng sông Cửu Long"}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ThucTrang2;
