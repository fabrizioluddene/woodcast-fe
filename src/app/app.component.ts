import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { Subject, filter, takeUntil } from 'rxjs';
import { EventMessage, EventType, InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'woodcast';
  isIframe = false;
  loginDisplay = false;
  push: any;
  private readonly _destroying$ = new Subject<void>();


  constructor(
    private router: Router,

  ) { }

  ngOnInit() {
    let json = localStorage.getItem("login");
    if (!json) {
      this.router.navigate(['auth/sso']);
    }

  }




  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
