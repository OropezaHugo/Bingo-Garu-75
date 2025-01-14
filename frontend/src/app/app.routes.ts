import { Routes } from '@angular/router';
import {SerialsBasePageComponent} from "./serials/serials-base-page/serials-base-page.component";
import {SerialsBasePageContentComponent} from "./serials/serials-base-page-content/serials-base-page-content.component";
import {GenerateSerialContentComponent} from "./serials/generate-serial-content/generate-serial-content.component";
import {AttachSerialContentComponent} from "./serials/attach-serial-content/attach-serial-content.component";

export const routes: Routes = [
    { path: "serials", component: SerialsBasePageComponent, children: [
        { path: "", component: SerialsBasePageContentComponent },
        { path: "generate", component: GenerateSerialContentComponent },
        { path: "attach", component: AttachSerialContentComponent },
        ]}
];
