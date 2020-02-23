import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpellCheckerModule } from 'ngx-spellchecker';
import { SpellCheckerComponent } from '@components/spell-checker/spell-checker.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ContentEditableFormDirective } from '@directives/content-editable-model.directive';
import { DictionaryService } from '@providers/dictionary.service';

import { SpellCheckerService } from 'ngx-spellchecker';

@NgModule({
  declarations: [
    AppComponent,
    SpellCheckerComponent,
    ContentEditableFormDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SpellCheckerModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [SpellCheckerService, DictionaryService,
    {
      provide: ContentEditableFormDirective, useClass: DictionaryService
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
