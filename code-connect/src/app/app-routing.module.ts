import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "landing",
    pathMatch: "full"
  },
  {
    path: "landing",
    component: LandingPageComponent
  },
  {
    path: "about",
    component: LandingPageComponent
  },
  {
    path: "program",
    component: LandingPageComponent
  },
  {
    path: "events",
    component: LandingPageComponent
  },
  {
    path: "get-involved",
    component: LandingPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
