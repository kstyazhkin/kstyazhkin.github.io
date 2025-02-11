document.addEventListener('DOMContentLoaded', () => {
    // Данные для графика
    const activityData = {
        publications: {
            all: {
                labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
                data: [2, 3, 4, 3, 5, 3]
            },
            five: {
                labels: ['2020', '2021', '2022', '2023', '2024'],
                data: [3, 4, 3, 5, 3]
            },
            three: {
                labels: ['2022', '2023', '2024'],
                data: [3, 5, 3]
            }
        },
        citations: {
            all: {
                labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
                data: [5, 8, 12, 15, 20, 25]
            },
            five: {
                labels: ['2020', '2021', '2022', '2023', '2024'],
                data: [8, 12, 15, 20, 25]
            },
            three: {
                labels: ['2022', '2023', '2024'],
                data: [15, 20, 25]
            }
        },
        projects: {
            all: {
                labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
                data: [1, 2, 2, 3, 2, 3]
            },
            five: {
                labels: ['2020', '2021', '2022', '2023', '2024'],
                data: [2, 2, 3, 2, 3]
            },
            three: {
                labels: ['2022', '2023', '2024'],
                data: [3, 2, 3]
            }
        }
    };

    // Настройки графика
    const chartConfig = {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Активность',
                data: [],
                borderColor: '#8B0000',
                backgroundColor: 'rgba(139, 0, 0, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: 'white',
                    bodyColor: 'white',
                    borderColor: '#8B0000',
                    borderWidth: 1
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    };

    // Инициализация графика
    const ctx = document.getElementById('activityChart').getContext('2d');
    const chart = new Chart(ctx, chartConfig);

    // Обработчики кнопок
    let currentType = 'publications';
    let currentPeriod = 'five';

    document.querySelectorAll('.chart-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.chart-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentType = btn.getAttribute('data-type');
            updateChart();
        });
    });

    document.querySelectorAll('.year-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.year-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentPeriod = btn.getAttribute('data-period') === 'all' ? 'all' : 
                          btn.getAttribute('data-period') === '5' ? 'five' : 'three';
            updateChart();
        });
    });

    // Функция обновления графика
    function updateChart() {
        const data = activityData[currentType][currentPeriod];
        chart.data.labels = data.labels;
        chart.data.datasets[0].data = data.data;
        
        // Обновляем заголовок графика
        const titles = {
            publications: 'Публикации',
            citations: 'Цитирования',
            projects: 'Проекты'
        };
        chart.options.plugins.title = {
            display: true,
            text: titles[currentType],
            font: {
                size: 16,
                weight: 'bold'
            }
        };
        
        chart.update();
    }

    // Первичная отрисовка графика
    updateChart();
});