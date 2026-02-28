import {TableService} from "@services/api/table.service";
import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-explore-data',
    templateUrl: './explore-data.component.html',
    styleUrls: ['./explore-data.component.scss']
})
export class ExploreDataComponent implements OnInit {

    tables: Array<{tableId: string, name: string}> = [];

    constructor(private _tableService: TableService) {
    }

    ngOnInit() {
        this.getTables();

    }

    getTables() {
        this._tableService.getTables(0, 100).subscribe({
            next: (tables) => {
                for (let table of tables.data) {
                    this.tables.push({tableId: table.id, name: table.table});
                }
            }
        })
    }
}
