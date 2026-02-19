import { Routes } from '@angular/router';
import {AttachSerialContentComponent} from "./sections/serial-section/attach-serial-content/attach-serial-content.component";
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LobbyPage } from './pages/lobby-page/lobby-page';
import { InstructionsComponent } from './pages/instructions/instructions.component';
import {GamePageComponent} from './pages/game/game-page/game-page.component';
import {PrizesBoardComponent} from './pages/end-game/prizes-board/prizes-board.component';
import {HistoryComponent} from './pages/history/history.component';
import {PatternsComponent} from './pages/patterns/patterns.component';
import {LoginComponent} from './pages/login/login.component';
import {authGuard} from './core/guards/auth.guard';

export const routes: Routes = [
  { path: "", component: HomePageComponent, pathMatch: 'full'},
  {path: "bingo", canActivate: [authGuard], children: [
      { path: "serials", component: AttachSerialContentComponent },
      {path: "lobby", component: LobbyPage},
      {path: "instructions", component: InstructionsComponent},
      {path: "patterns", component: PatternsComponent},
      {path: "game", component: GamePageComponent},
      {path: "prizes", component: PrizesBoardComponent},
      {path: "history", component: HistoryComponent},
    ]},
    {path: "**", redirectTo: ""},
];
