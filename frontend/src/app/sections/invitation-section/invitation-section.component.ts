import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {ConfirDialogComponent} from '../../shared/dialogs/confir-dialog/confir-dialog.component';
import {GameService} from '../../core/services/game.service';
import {RoundService} from '../../core/services/round.service';
import {SnackbarService} from '../../core/services/snackbar.service';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatFormField, MatFormFieldModule, MatHint, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatInput, MatInputModule} from '@angular/material/input';
import {RectanglebuttonComponent} from '../../shared/buttons/rectanglebutton/rectanglebutton.component';
import html2canvas from 'html2canvas';
import {MatButton} from '@angular/material/button';
import {
  MatDatepicker,
  MatDatepickerActions, MatDatepickerApply, MatDatepickerCancel,
  MatDatepickerInput, MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {DatePipe} from '@angular/common';
import {MatDivider} from '@angular/material/divider';
import { ColorPickerComponent } from "../../shared/color-picker/color-picker.component";
import { INVITATION_COLOR_PALETTES } from '../../core/models/InvitationColorPallete';
import { InvitationColorService } from '../../core/services/InvitationColorService';
import { PatternNameListComponent } from "../../shared/pattern-name-list/pattern-name-list.component";
import {Game} from '../../core/models/game';
import { MatSelectModule } from '@angular/material/select';
import { FrameSelectorComponent } from '../../shared/frame-selector/frame-selector.component';
import { WatermarkSelectorComponent } from '../../shared/watermark-selector/watermark-selector.component';
import {MatSliderModule} from '@angular/material/slider';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { AddFrameComponent } from "../../shared/add-frame/add-frame.component";
import { PatterColumnsListComponent } from '../../shared/patter-columns-list/patter-columns-list.component';
import { PatternMatixListComponent } from "../../shared/pattern-matix-list/pattern-matix-list.component";


type PaletteId = keyof typeof INVITATION_COLOR_PALETTES;


@Component({
  selector: 'app-invitation-section',
  imports: [
    FormsModule,
    MatCheckbox,
    MatFormField,
    MatInput,
    MatLabel,
    RectanglebuttonComponent,
    ReactiveFormsModule,
    MatHint,
    MatButton,
    MatDatepickerToggle,
    MatDatepickerCancel,
    MatDatepickerApply,
    MatDatepickerActions,
    MatDatepicker,
    MatDatepickerInput,
    MatSuffix,
    DatePipe,
    MatDivider,
    ColorPickerComponent,
    PatternNameListComponent,
    MatSelectModule,
    MatFormFieldModule,
    FrameSelectorComponent,
    WatermarkSelectorComponent,
    MatSliderModule,
    MatInputModule,
    MatSidenavModule,
    AddFrameComponent,
    PatterColumnsListComponent,
    PatternMatixListComponent
],
  providers: [
    provideNativeDateAdapter()
  ],
  templateUrl: './invitation-section.component.html',
  styleUrl: './invitation-section.component.scss'
})
export class InvitationSectionComponent implements OnInit {
  @ViewChild('colorPicker') colorPicker!: ColorPickerComponent;
  gameService = inject(GameService);
  roundService = inject(RoundService);
  snackBar = inject(SnackbarService);
  dialog = inject(MatDialog);
  router = inject(Router);

  currentFrameUrl: string | null = null;
  currentWatermarkUrl: string = 'Logo.png';
  displayFormat = new FormControl<'list' | 'columns' | 'matrix'>('list');

  formGroup: FormGroup | undefined;
  selectedElement: string | null = null;
  currentPalette: PaletteId = 'default';
  isColorPickerOpen = true;

  BackgroundColor = INVITATION_COLOR_PALETTES.default.backgroundColor;
  HeaderColor = INVITATION_COLOR_PALETTES.default.headerColor;
  PrizeColor = INVITATION_COLOR_PALETTES.default.prizeColor;
  RoundInfoColor = INVITATION_COLOR_PALETTES.default.roundInfoColor;
  OfferColor = INVITATION_COLOR_PALETTES.default.offerColor;

  watermarkOpacity = new FormControl<number>(50, {
    nonNullable: true,
    validators: [Validators.min(1), Validators.max(100)]
  });

  colorOptions = [
    { label: 'Background', value: 'BackgroundColor', currentColor: this.BackgroundColor },
    { label: 'Header', value: 'HeaderColor', currentColor: this.HeaderColor },
    { label: 'Prize', value: 'PrizeColor', currentColor: this.PrizeColor },
    { label: 'RoundInfo', value: 'RoundInfoColor', currentColor: this.RoundInfoColor },
    { label: 'Offer', value: 'OfferColor', currentColor: this.OfferColor }
  ];

  constructor(private fb: FormBuilder, private colorService: InvitationColorService) {
    this.formGroup = this.fb.group({
      color: ['#ffffff']
    });
  }

  dateForm = new FormControl<Date>(new Date(this.gameService.actualGame()?.targetStartDate!))
  gamePricesForm = new FormControl<number>(0)
  eventTimeForm = new FormControl<string>(
    this.parseTimeString(this.gameService.actualGame()?.targetStartDate!),
    Validators.pattern('^([01]?[0-9]|2[0-3]):[0-5][0-9]$'))
  withOfferForm = new FormControl<boolean>(false)
  invitationColors: { BackgroundColor: string; HeaderColor: string; PrizeColor: string; RoundInfoColor: string; OfferColor: string; } | undefined;

  ngOnInit() {
    this.colorService.colors$.subscribe(colors => {
      this.invitationColors = { ...colors };
    });
    this.roundService.getRounds();
  }

  getOpacityValue(): number {
    return this.watermarkOpacity.value / 100;
  }


  onFrameUrlChange(url: string | null): void {
    this.currentFrameUrl = url;
  }

  onFrameFileSelected(event: { file: File, dataUrl: string }) {
    this.currentFrameUrl = event.dataUrl;
    this.snackBar.success('Frame cargado exitosamente');
  }

  onWatermarkUrlChange(url: string): void {
    this.currentWatermarkUrl = url;
  }

  onWatermarkFileSelected(event: { file: File, dataUrl: string }) {
    this.currentWatermarkUrl = event.dataUrl;
    this.snackBar.success('Marca de agua cargada exitosamente');
  }

  parseTimeString(dateTimeString: string): string {
    let dateTime = new Date(dateTimeString);
    let result = ''
    if (dateTime.getHours() < 10) {
      result += '0' + dateTime.getHours();
    } else {
      result += dateTime.getHours();
    }
    result += ':'
    if (dateTime.getMinutes() < 10) {
      result += '0' + dateTime.getMinutes();
    } else {
      result += dateTime.getMinutes();
    }
    return result;
  }

  exportToImage() {
    const element = document.getElementById('content-to-export') as HTMLElement;

    html2canvas(element, { scale: 2}).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `invitation-game-${this.gameService.actualGame()?.id}.png`;
      link.href = imgData;
      link.click();
    });
  }

  startGame() {
    this.gameService.everyRoundHasAPattern().subscribe({
      next: result => {
        if(this.gameService.gameCards().length > 0
          && result)
        {
          let dialogRef = this.dialog.open(ConfirDialogComponent, {
            data: false
          })
          dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
              this.gameService.updateGame({
                finished: this.gameService.actualGame()!.finished,
                inProgress: true,
                id: this.gameService.actualGame()!.id,
                automaticRaffle: this.gameService.actualGame()!.automaticRaffle,
                sharePrizes: this.gameService.actualGame()!.sharePrizes,
                randomPatterns: this.gameService.actualGame()!.randomPatterns,
                targetStartDate:this.dateForm.value !== null && this.eventTimeForm.value !== null ? this.combineDateAndTime(this.dateForm.value, this.eventTimeForm.value).toISOString() : undefined
              })
              this.router.navigateByUrl('bingo/game')
            }
          })
        } else {
          this.snackBar.error('adjunte un serial y un patron para iniciar la partida')
        }
      }
    })
  }

  selectElement(element: string, currentColor: string): void {
    this.selectedElement = element;
    if (this.colorPicker) {
      this.colorPicker.updateSelectedElement(element, currentColor);
    }
  }

  get colorPalettes() {
    return Object.entries(INVITATION_COLOR_PALETTES).map(([key,value]) => ({
      id: key as PaletteId,
      ...value
    }));
  }

  applyPalette(paletteId: PaletteId) {
    const palette = INVITATION_COLOR_PALETTES[paletteId];
    if (palette) {
      this.currentPalette = paletteId;
      this.BackgroundColor = palette.backgroundColor;
      this.HeaderColor = palette.headerColor;
      this.PrizeColor = palette.prizeColor;
      this.RoundInfoColor = palette.roundInfoColor;
      this.OfferColor = palette.offerColor;

      this.colorOptions.forEach(option => {
        option.currentColor = palette[option.value as keyof typeof palette];
      });

      this.colorService.updateColors('palette', '', {
        BackgroundColor: palette.backgroundColor,
        HeaderColor: palette.headerColor,
        PrizeColor: palette.prizeColor,
        RoundInfoColor: palette.roundInfoColor,
        OfferColor: palette.offerColor
      });
    }
  }

  onColorChange(event: { color: string; element: string | null }): void {
    if (event.element && event.color) {
      (this as any)[event.element] = event.color;

      const option = this.colorOptions.find(opt => opt.value === event.element);
      if (option) {
        option.currentColor = event.color;
      }

      this.colorService.updateColors(event.element, event.color, { [event.element]: event.color });
    }
  }

  openColorPicker(element: string): void {
    this.isColorPickerOpen = true;
    this.selectElement(element, (this as any)[element]);
  }

  private combineDateAndTime(date: Date, time: string): Date {

    if (!date || !time) {
      return new Date()
    }

    const [hours, minutes] = time.split(":").map(Number);

    const combinedDate = new Date(date);

    combinedDate.setHours(hours, minutes, 0, 0);

    return combinedDate;
  }

  updateTargetStartDate() {

    if (this.dateForm.value && this.eventTimeForm.value) {

      const targetStartDate = this.combineDateAndTime(this.dateForm.value, this.eventTimeForm.value);


      const updateData: Game = {
        id: this.gameService.actualGame()!.id,
        targetStartDate: targetStartDate.toISOString(),
        inProgress: this.gameService.actualGame()!.inProgress,
        finished: this.gameService.actualGame()!.finished,
        automaticRaffle: this.gameService.actualGame()!.automaticRaffle,
        sharePrizes: this.gameService.actualGame()!.sharePrizes,
        randomPatterns: this.gameService.actualGame()!.randomPatterns,
      };

      this.gameService.updateGame(updateData)
    } else {
      this.snackBar.error('Debe seleccionar una fecha y una hora');
    }
  }


}
