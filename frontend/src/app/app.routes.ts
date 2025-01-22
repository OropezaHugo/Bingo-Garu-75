import { Routes } from '@angular/router';
import {AttachSerialContentComponent} from "./sections/serial-section/attach-serial-content/attach-serial-content.component";
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LobbyPage } from './pages/lobby-page/lobby-page';
import { InstructionsComponent } from './pages/instructions/instructions.component';
import {PatternListComponentComponent} from "./sections/pattern-section/pattern-list-component/pattern-list-component.component";
import {GamePageComponent} from './pages/game/game-page/game-page.component';
import {PrizesBoardComponent} from './pages/end-game/prizes-board/prizes-board.component';
import {HistoryComponent} from './pages/history/history.component';

export const routes: Routes = [
    { path: "serials", component: AttachSerialContentComponent },
    { path: "", component: HomePageComponent, pathMatch: 'full'},
    {path: "lobby", component: LobbyPage},
    {path: "instructions", component: InstructionsComponent},
    {path: "patterns", component: PatternListComponentComponent},
    {path: "game", component: GamePageComponent},
    {path: "prizes", component: PrizesBoardComponent},
  {path: "history", component: HistoryComponent},
    {path: "**", redirectTo: ""},
];
