import {BrowserModule} from '@angular/platform-browser';
import {NgModule, LOCALE_ID} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundRouterComponent} from './components/public/page-not-found-router/page-not-found-router.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {HttpClient} from './http-client';
import {ProfileService} from './service/profile.service';
import {TokenService} from './service/token.service';
import {LogoutComponent} from './components/public/logout/logout.component';
import {RegistrationService} from './service/registration.service';
import {ProfileComponent} from './components/protected/profile/profile/profile.component';
import {SkillComponent} from './components/protected/profile/skill/skill.component';
import {WorkComponent} from './components/protected/profile/work/work.component';
import {EducationComponent} from './components/protected/profile/education/education.component';
import {ProfileprojectComponent} from './components/protected/profile/profileproject/profileproject.component';
import {RegistrationComponent} from './components/public/registration/registration/registration.component';
import {RegistrationprofileComponent} from './components/public/registration/registrationprofile/registrationprofile.component';
import {CountryService} from './service/country.service';
import {CityService} from './service/city.service';
import {RegistrationeducationComponent} from './components/public/registration/registrationeducation/registrationeducation.component';
import {ModalModule} from 'ngx-bootstrap';
import {EducationService} from './service/education.service';
import {CourseService} from './service/course.service';
import {RegistrationworkComponent} from './components/public/registration/registrationwork/registrationwork.component';
import {RegistrationskillComponent} from './components/public/registration/registrationskill/registrationskill.component';
import {WorkplaceService} from './service/workplace.service';
import {DirectionService} from './service/direction.service';
import {SkillService} from './service/skill.service';
import {SecurityService} from './service/security.service';
import {LoginComponent} from './components/public/login/login.component';
import {IndexComponent} from './components/public/index/index.component';
import {ContactService} from './service/contact.service';
import {RegistrationprojectComponent} from './components/protected/registrationproject/registrationproject.component';
import {CategoryService} from './service/category.service';
import {LanguageService} from './service/language.service';
import {ProjectService} from './service/project.service';
import {ProjectComponent} from './components/protected/project/project.component';
import {SearchpersonComponent} from './components/protected/searchperson/searchperson.component';
import {VacancyService} from "./service/vacancy.service";

const appRoutes: Routes = [
  { path: 'profile/:id', component: ProfileComponent },
  {path: 'profile', component: ProfileComponent},
  { path: 'login/:error', component: LoginComponent  },
  { path: 'login', component: LoginComponent  },
  {path: 'logout', component: LogoutComponent},
  { path: 'register', component: RegistrationComponent},
  { path: 'register/profile', component: RegistrationprofileComponent},
  { path: 'register/education', component: RegistrationeducationComponent},
  { path: 'register/work', component: RegistrationworkComponent},
  { path: 'register/skill', component: RegistrationskillComponent},
  { path: 'project/create', component: RegistrationprojectComponent},
  { path: 'project/:id', component: ProjectComponent},
  { path: 'search/profile', component: SearchpersonComponent},

  {
    path: '',
    component: IndexComponent,
    data: { title: 'Welcome to Starter' }
  },
  { path: 'index',
    redirectTo: ''
  },
  { path: '**', component: PageNotFoundRouterComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    PageNotFoundRouterComponent,
    LogoutComponent,
    ProfileComponent,
    SkillComponent,
    WorkComponent,
    EducationComponent,
    ProfileprojectComponent,
    RegistrationComponent,
    RegistrationprofileComponent,
    RegistrationeducationComponent,
    RegistrationworkComponent,
    RegistrationskillComponent,
    LoginComponent,
    RegistrationprojectComponent,
    ProjectComponent,
    SearchpersonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru-RU' },
    ProfileService, TokenService, HttpClient,
    RegistrationService, CountryService, CityService, EducationService,
    CourseService, WorkplaceService, DirectionService, SkillService, SecurityService,
  ContactService, CategoryService, LanguageService, ProjectService, VacancyService],

  bootstrap: [AppComponent]


})
export class AppModule { }
