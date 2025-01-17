import { Routes } from '@angular/router';
import {SerialsBasePageComponent} from "./serials/serials-base-page/serials-base-page.component";
import {SerialsBasePageContentComponent} from "./serials/serials-base-page-content/serials-base-page-content.component";
import {GenerateSerialContentComponent} from "./serials/generate-serial-content/generate-serial-content.component";
import {AttachSerialContentComponent} from "./serials/attach-serial-content/attach-serial-content.component";
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LobbyPage } from './pages/lobby-page/lobby-page';
import { InstructionsComponent } from './pages/instructions/instructions.component';
import {PatternListComponentComponent} from "./patterns/pattern-list-component/pattern-list-component.component";

export const routes: Routes = [
    { path: "serials", component: SerialsBasePageComponent, children: [
        { path: "", component: SerialsBasePageContentComponent },
        { path: "generate", component: GenerateSerialContentComponent },
        { path: "attach", component: AttachSerialContentComponent },
        ]},
    { path: "", component: HomePageComponent, pathMatch: 'full'},
    {path: "lobby", component: LobbyPage},
    {path: "instructions", component: InstructionsComponent},
    {path: "patterns", component: PatternListComponentComponent},
    {path: "**", redirectTo: ""},
];
