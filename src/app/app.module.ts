import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { AppRoutingModule,routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkMenuModule } from '@angular/cdk/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';
import { provideRouter, RouterLink, RouterModule, RouterOutlet, withEnabledBlockingInitialNavigation, 
  withHashLocation, withInMemoryScrolling, withRouterConfig, withViewTransitions } from '@angular/router';

import { DropdownModule,HeaderNavComponent,HeaderTogglerDirective, 
  AvatarComponent,BreadcrumbRouterComponent,ColorModeService,
  DropdownComponent,DropdownDividerDirective, DropdownHeaderDirective,
   SidebarToggleDirective, SidebarModule, ContainerComponent,
   DropdownItemDirective,DropdownMenuDirective,DropdownToggleDirective,
    HeaderComponent, NavLinkDirective,NavItemComponent ,  ShadowOnScrollDirective,
  SidebarBrandComponent, SidebarComponent,SidebarFooterComponent,
  SidebarHeaderComponent, SidebarNavComponent,SidebarTogglerDirective } from '@coreui/angular';

import { IconDirective, IconSetService } from '@coreui/icons-angular';
// import { AuthInterceptor } from './auth/auth.interceptor';

///components

import {TypographyComponent } from './views/theme/typography.component';
import { ColorsComponent} from './views/theme/colors.component';
import {UsersComponent } from './views/users/users.component';
import { VendorsComponent} from './views/vendors/vendors.component';

import {AmcosComponent } from './views/amcos/amcos.component';
import { FarmersComponent} from './views/farmers/farmers.component';
import {LoanActionsComponent } from './views/loans/loan-actions/loan-actions.component';
import { LoansComponent} from './views/loans/loans.component';

import {MaishaComponent } from './views/maisha/maisha.component';
import { MarketsComponent} from './views/markets/markets.component';
import {RegisterMarketComponent } from './views/markets/register-market/register-market.component';
import { NgScrollbar } from 'ngx-scrollbar';
import { DefaultFooterComponent, DefaultHeaderComponent } from './layout';
 

@NgModule({
  declarations: [
    RegisterMarketComponent,
    MarketsComponent,
    MaishaComponent,
    LoansComponent,
    LoanActionsComponent,
    FarmersComponent,
    AmcosComponent,
    VendorsComponent,
    UsersComponent,
    ColorsComponent,
    TypographyComponent,
    AvatarComponent,
    BreadcrumbRouterComponent,
    ColorModeService,
    ContainerComponent,
    DropdownComponent,
    DropdownDividerDirective,
    DropdownHeaderDirective,
    DropdownItemDirective,
    DropdownMenuDirective,
    DropdownToggleDirective,
    HeaderComponent,
    HeaderNavComponent,
    HeaderTogglerDirective,
    NavItemComponent,
    NavLinkDirective,
    SidebarToggleDirective,
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarBrandComponent,
   
    SidebarNavComponent,
    SidebarFooterComponent,
    SidebarToggleDirective,
    SidebarTogglerDirective,
    ShadowOnScrollDirective,
    ContainerComponent,
    RouterOutlet,
    DefaultFooterComponent,
    DefaultHeaderComponent,

  ],
  imports: [
    BrowserModule,
    IconDirective,
    NgScrollbar,
    AppRoutingModule,
    BrowserAnimationsModule,
    OverlayModule,
    CdkMenuModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatTableModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatMenuModule,
    MatDialogModule,
    RouterModule,
    MatGridListModule,
    MatProgressBarModule,
    DropdownModule,
    SidebarModule,
    ContainerComponent,
    HeaderTogglerDirective,
    SidebarToggleDirective,
    CommonModule,
    MatMenuModule,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes,
      withRouterConfig({
        onSameUrlNavigation: 'reload'
      }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled'
      }),
      withEnabledBlockingInitialNavigation(),
      withViewTransitions(),
      withHashLocation()
    ),
    IconSetService,
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
