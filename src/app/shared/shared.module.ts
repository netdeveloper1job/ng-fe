import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsAreaComponent } from './components/charts-area/charts-area.component';
import { ChartsBarComponent } from './components/charts-bar/charts-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgxCaptchaModule } from 'ngx-captcha';
import { DeleteComponent } from './components/delete/delete.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ColumnFilterPipe } from './filters/column-filter.pipe';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { JsonPipe } from '@angular/common';
import { RangeFilterPipe } from './filters/range-filter.pipe';
import { NgwWowModule } from 'ngx-wow';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    ChartsAreaComponent,
    ChartsBarComponent,
    DeleteComponent,

    PaginationComponent,
    ColumnFilterPipe,
    RangeFilterPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    NgbDropdownModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AngularSvgIconModule.forRoot(),
    NgxCaptchaModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgbDatepickerModule,
    JsonPipe,
    NgwWowModule,
    NgSelectModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DecimalPipe],
  exports: [
    FontAwesomeModule,
    NgbDropdownModule,
    ChartsAreaComponent,
    ChartsBarComponent,
    NgbModule,
    ReactiveFormsModule,
    DeleteComponent,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    FormsModule,
    PaginationComponent,
    ColumnFilterPipe,
    NgbDatepickerModule,
    JsonPipe,
    RangeFilterPipe,
    NgwWowModule,
    NgSelectModule,
  ],
})
export class SharedModule {}
