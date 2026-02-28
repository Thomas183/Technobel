import {Injectable} from '@angular/core';
import {SchemaTable} from "@models/api/schematic";
import {ReportService} from "@services/api/report.service";
import {FullChart} from "@models/api/view";
import {ViewService} from "@services/api/view.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DisplayViewService {


    chartList: Array<FullChart> = []
    private _displayedChart: BehaviorSubject<FullChart> = new BehaviorSubject<FullChart>(null)
    public displayedChart = this._displayedChart.asObservable();
    displayedChartIndex: number;
    reportId: string;

    chartColors = [
        '#FF6384', '#36A2EB', '#FFCE56',
        '#4BC0C0', '#F77825', '#9966FF',
        '#ADFF2F', '#FF4500', '#1E90FF',
        '#FFD700', '#8B008B', '#00FA9A'
    ];

    constructor(
        private _viewService: ViewService) {
    }

    getCharts(): void {
        this.chartList = [];
        this._viewService.getViews(0, 100, this.reportId).subscribe({
            next: (views) => {
                for (let view of views.data) {
                    this._viewService.getChartFromView(this.reportId, view.id).subscribe({
                        next: (chart) => {
                            this.chartList.push({...chart, type: view.chart, viewId: view.id})
                            this.addColorsToCharts()
                        },
                        complete: () => {
                            this._displayedChart.next(this.chartList[0])
                        }
                    })
                }
            }
        })
    }

    addColorsToCharts(): void {
        this.chartList.forEach(chart => {
            chart.datasets.forEach((dataset, datasetIndex) => {
                if (chart.type === 'PIE') {
                    // For pie charts, assign a unique color to each data point
                    dataset.backgroundColor = dataset.data.map((_, index) => this.chartColors[index % this.chartColors.length]);
                    dataset.borderColor = dataset.data.map((_, index) => this.chartColors[index % this.chartColors.length]);
                } else {
                    // For bar and radar charts, you might use one color per dataset
                    const color = this.chartColors[datasetIndex % this.chartColors.length];
                    dataset.backgroundColor = Array(dataset.data.length).fill(color);
                    dataset.borderColor = Array(dataset.data.length).fill(color);
                }
                // Set a default borderWidth if not already set
                if (dataset.borderWidth === undefined) {
                    dataset.borderWidth = 1;
                }
            });
        });
    }

    displayChart(index: number): void {
        this._displayedChart.next(this.chartList[index])
    }

    displayNextChart(displayedChartIndex: number): boolean {
        const nextIndex = displayedChartIndex + 1;
        if (nextIndex < 0 || nextIndex >= this.chartList.length) {
            this._displayedChart = null;
            return false;
        }

        this._displayedChart = null;
        setTimeout(() => {
            this._displayedChart.next(this.chartList[nextIndex]);
        }, 0);
        return true;
    }

    displayPreviousChart(displayedChartIndex: number): boolean {
        const prevIndex = displayedChartIndex - 1;
        if (prevIndex < 0 || prevIndex >= this.chartList.length) {
            this._displayedChart.next(null);
            return false;
        }

        this._displayedChart = null;
        setTimeout(() => {
            this._displayedChart.next(this.chartList[prevIndex]);
        }, 0);
        return true;
    }

}
