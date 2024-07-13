import styles from "./ThucTrang.module.css";
import React, { useEffect, useRef, useState } from "react";
import ApexCharts from "apexcharts";

function CoThucTrang() {
  const hiddenElementsRef = useRef([]);
  const chartRef = useRef(null);
  const [chartRendered, setChartRendered] = useState(false); // Cờ để kiểm tra xem biểu đồ đã được render chưa

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !chartRendered) {
          entry.target.classList.add(styles.show);
          loadChart();
          setChartRendered(true); // Đánh dấu rằng biểu đồ đã được render
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

  const loadChart = () => {
    const colors = [
      "#3AB137",
      "#3AB137",
      "#3AB137",
      "#3AB137",
      "#3AB137",
      "#3AB137",
    ];

    const options = {
      series: [
        {
          data: [285.1, 299.3, 293.7, 316.2, 328.5, 336.1],
        },
      ],
      chart: {
        height: 350,
        type: "bar",
      },
      colors: colors,
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true,
        },
      },
      dataLabels: {
        enabled: true,
      },
      tooltip: {
        y: {
          formatter: function (value) {
            return `${value} tỷ tấn`;
          },
        },
        marker: {
          show: true,
        },
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: [2018, 2019, 2020, 2021, 2022, 2023],
        labels: {
          style: {
            colors: colors,
            fontSize: "14px",
            fontWeight: 700,
          },
        },
      },
      responsive: [
        {
          breakpoint: 776,
          options: {
            chart: {
              height: 250,
            },
            plotOptions: {
              bar: {
                columnWidth: "55%",
              },
            },
            xaxis: {
              labels: {
                style: {
                  fontSize: "12px",
                },
              },
            },
          },
        },
        {
          breakpoint: 576,
          options: {
            chart: {
              height: 200,
            },
            plotOptions: {
              bar: {
                columnWidth: "65%",
              },
            },
            xaxis: {
              labels: {
                style: {
                  fontSize: "10px",
                },
              },
            },
          },
        },
      ],
    };
    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    return () => {
      chart.destroy();
    };
  };

  return (
    <div className={styles.main}>
      <div className={styles.div1}>
        <h2
          className={styles.hidden}
          ref={(el) => hiddenElementsRef.current.push(el)}
        >
          Thực trạng môi trường hiện nay
        </h2>
        {/* <p
          className={styles.hidden}
          ref={(el) => hiddenElementsRef.current.push(el)}
        >
          Hãy cùng nhau nhìn những con số mà chúng tôi đã tổng hợp về thực trạng
          ô nhiễm môi trường và tác động của nó đến Việt Nam hiện nay.
        </p> */}
      </div>

      <div
        className={styles.div2}
        ref={(el) => hiddenElementsRef.current.push(el)}
      >
        <div className={styles.div2_1} ref={chartRef}>
          {/* Biểu đồ sẽ được chèn vào đây */}
        </div>

        <div className={styles.div2_2}>
          <p>
            Lượng phát thải khí nhà kính của Việt Nam đang có xu hướng gia tăng
            qua các năm, phản ánh sự phát triển kinh tế-xã hội và sự gia tăng
            phát thải từ các hoạt động công nghiệp, giao thông vận tải, nông
            nghiệp,... Việt Nam đang tích cực triển khai các chính sách và giải
            pháp nhằm giảm thiểu phát thải khí nhà kính trong các lĩnh vực then
            chốt.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CoThucTrang;
