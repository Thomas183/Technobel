import {Component} from '@angular/core';
import {User} from '@models/api/users';
import {AuthService} from '@services/api/auth.service';
import {ReportService} from '@services/api/report.service';
import {Report} from '@models/api/report';
import {Router, RouterModule} from '@angular/router';
import {DisplayViewService} from "@services/displayView.service";

@Component({
    selector: 'app-my-reports',
    templateUrl: './my-reports.component.html',
    styleUrls: ['./my-reports.component.scss']
})
export class MyReportsComponent {
    connectedUser: User | undefined;
    listReports: Report[] = [];
    listReportsFinish: any[] = [];
    listReportsUnfinish: any[] = [];

    constructor(private _authService: AuthService,
                private _reportService: ReportService,
                private _routeur: Router) {
    }

    ngOnInit(): void {

        //obj : afficher les rapports et récupérer l'id qd on clique dessus
        //rajouter des pages et updater le numéro de la page pr afficher les autres dossiers
        let page: number = 0;
        let size: number = 30;
        this._reportService.getReports(page, size).subscribe({
            next: (goldorak) => {
                this.listReports = goldorak.data
                //pour chaque rapport, voir si il est public ou non et le classé dans la bonne catégorie
                this.listReports.forEach((report: Report) => {
                    if (report.isPublic && report.log.createdBy == "Devs.PanoraMix@hotmail.com") {
                        this.listReportsFinish.push(report);
                    } else {
                        this.listReportsUnfinish.push(report);
                    }
                });
            }
        })
    }

    quoicoubeh(id: string) {
        this._routeur.navigate(['/report/editReport', id]);
    }

    protected readonly scroll = scroll;
}
