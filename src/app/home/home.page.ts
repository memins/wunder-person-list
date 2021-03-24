import { Component, OnInit } from '@angular/core';
import { DataService, Message } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  data: any;

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.data = this.dataService.getAll();
  }

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }


  goToUserDetailPage(data): void {
    this.router.navigate(['./user-detail'], {
      relativeTo: this.route,
      queryParams: { user: JSON.stringify(data) },
    });
  }
}
