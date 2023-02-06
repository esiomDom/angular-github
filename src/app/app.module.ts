import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { LayoutModule } from './views/layout/layout.module';
import { AuthGuard } from './core/guard/auth.guard';

import { AppComponent } from './app.component';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';

import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { NgxHorizontalTimelineModule } from 'ngx-horizontal-timeline';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';

const dbConfig: DBConfig = {
  name: 'MyDb',
  version: 1,
  objectStoresMeta: [{
    store: 'scoring',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'noteCa', keypath: 'noteCa', options: { unique: false } },
      { name: 'noteCroissanceCa', keypath: 'noteCroissanceCa', options: { unique: false } },
      { name: 'noteRentabiliteCA', keypath: 'noteRentabiliteCA', options: { unique: false } },
      { name: 'noteEbeCa', keypath: 'noteEbeCa', options: { unique: false } },
      { name: 'noteCafgCa', keypath: 'noteCafgCa', options: { unique: false } },
      { name: 'noteCapaciteRemboursement', keypath: 'noteCapaciteRemboursement', options: { unique: false } },
      { name: 'noteCapitauxPropre', keypath: 'noteCapitauxPropre', options: { unique: false } },
      { name: 'noteRentabilite', keypath: 'noteRentabilite', options: { unique: false } },
      { name: 'noteFrasFin', keypath: 'noteFrasFin', options: { unique: false } },
      { name: 'noteLiquiditeGeneral', keypath: 'noteLiquiditeGeneral', options: { unique: false } },
      { name: 'noteMoyenneCa', keypath: 'noteMoyenneCa', options: { unique: false } },
      { name: 'noteMoyenneEntreprise', keypath: 'noteMoyenneEntreprise', options: { unique: false } },
      { name: 'notePondereeCa', keypath: 'notePondereeCa', options: { unique: false } },
      { name: 'notePondereeEntreprise', keypath: 'notePondereeEntreprise', options: { unique: false } },
      { name: 'noteFinale', keypath: 'noteFinale', options: { unique: false } },
      { name: 'dateCreation', keypath: 'dateCreation', options: { unique: false } },
    ]
  }]
};

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxHorizontalTimelineModule,
    LayoutModule,
    NgxIndexedDBModule.forRoot(dbConfig)
  ],
  providers: [
    AuthGuard,
    {
      provide: HIGHLIGHT_OPTIONS, // https://www.npmjs.com/package/ngx-highlightjs
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          xml: () => import('highlight.js/lib/languages/xml'),
          typescript: () => import('highlight.js/lib/languages/typescript'),
          scss: () => import('highlight.js/lib/languages/scss'),
        }
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
