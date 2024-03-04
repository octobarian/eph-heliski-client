<template>
    <div class="zaui-status-info">
      <h2>Zaui Response Time</h2>
      <div>
        <button @click="fetchStatuses('hourly')">Hourly Data</button>
        <button @click="fetchStatuses('daily')">Daily Data</button>
      </div>
      <!-- Chart Goes Here -->
      <line-chart v-if="chartData" :chart-data="chartData" :key="chartKey"></line-chart>
    </div>
  </template>
  
  <script>
  import ZauiDataService from "@/services/ZauiDataService.js";
  import { Line } from "vue-chartjs";
  
  export default {
    name: "ZauiStatusInformation",
    components: {
        'line-chart': {
        extends: Line,
            props: ['chartData'],
                mounted() {
                    this.renderChart(this.chartData, { responsive: true, maintainAspectRatio: false });
                }
        }
    },
    data() {
      return {
        chartData: null,
        chartKey: 0,
      };
    },
    mounted(){
        this.fetchStatuses('hourly');
    },
    methods: {
        fetchStatuses(interval) {
            ZauiDataService.getStatuses(interval)
                .then(response => {
                    this.chartData = this.processChartData(response.data, interval);
                    this.chartKey++; // Increment key to force update
                })
                .catch(error => {
                    console.error('Error fetching Zaui statuses:', error);
                });
        },

        processChartData(data, interval) {
            if (interval === 'hourly') {
                return this.processHourlyData(data);
            } else if (interval === 'daily') {
                return this.processDailyData(data);
            }
        },

        processHourlyData(data) {
            const theselabels = data.map(item => new Date(item.createdat).toLocaleTimeString());
            const responseTimes = data.map(item => item.responsetime);
            
            // Customizing points
            const pointBackgroundColors = responseTimes.map(time => time > 1000 ? 'red' : 'rgb(75, 192, 192)');

            return {
                labels: theselabels,
                datasets: [
                {
                    label: 'Response Time (ms)',
                    data: responseTimes,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                    pointBackgroundColor: pointBackgroundColors, // Apply the custom colors
                    pointRadius: 5 // You can adjust the radius to make points more visible
                }
                ]
            };
        },


        processDailyData(data) {
            const theselabels = data.map(item => item.date);
            const averageResponseTimes = data.map(item => item.averageResponseTime);

            return {
            labels: theselabels,
            datasets: [
                {
                label: 'Average Daily Response Time (ms)',
                data: averageResponseTimes,
                fill: false,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1
                }
            ]
            };
        },
    }
  };
  </script>
  
  <style scoped>
  /* Your CSS here */
  </style>
  