import{a as J,b as K}from"./chunk-OUIBNN2C.js";import"./chunk-FK6H3RFT.js";import"./chunk-2X63TOLZ.js";import{E as W}from"./chunk-P2K7FNZD.js";import"./chunk-LTQGHVNP.js";import{X as q}from"./chunk-4VZRQQ4V.js";import"./chunk-VRPWBVGA.js";import"./chunk-2PPFUFFT.js";import{$ as k,$b as H,Ab as F,Bb as _,Cb as V,Cc as x,Db as G,Gb as g,Ha as R,Hb as b,Jb as h,Kb as v,Lb as o,Mb as s,Nb as m,Rb as $,Ub as j,Wb as f,Ya as i,Z as E,Za as I,_b as L,ac as U,ca as c,cb as D,fc as y,gc as Z,hc as Q,ka as O,kb as l,la as T,lb as S,pb as z,qb as p,ua as A,va as B,ya as X,yc as Y,zb as N}from"./chunk-42JAANS2.js";import{a as oe}from"./chunk-AJIQVFNV.js";import{e as ie}from"./chunk-C6Q5SG76.js";var ae=ie(oe());function me(r,n){r&1&&m(0,"div",2)}var ce=new k("MAT_PROGRESS_BAR_DEFAULT_OPTIONS");var re=(()=>{class r{_elementRef=c(X);_ngZone=c(B);_changeDetectorRef=c(Y);_renderer=c(D);_cleanupTransitionEnd;_animationMode=c(R,{optional:!0});constructor(){let e=c(ce,{optional:!0});this._isNoopAnimation=this._animationMode==="NoopAnimations",e&&(e.color&&(this.color=this._defaultColor=e.color),this.mode=e.mode||this.mode)}_isNoopAnimation=!1;get color(){return this._color||this._defaultColor}set color(e){this._color=e}_color;_defaultColor="primary";get value(){return this._value}set value(e){this._value=ee(e||0),this._changeDetectorRef.markForCheck()}_value=0;get bufferValue(){return this._bufferValue||0}set bufferValue(e){this._bufferValue=ee(e||0),this._changeDetectorRef.markForCheck()}_bufferValue=0;animationEnd=new A;get mode(){return this._mode}set mode(e){this._mode=e,this._changeDetectorRef.markForCheck()}_mode="determinate";ngAfterViewInit(){this._ngZone.runOutsideAngular(()=>{this._cleanupTransitionEnd=this._renderer.listen(this._elementRef.nativeElement,"transitionend",this._transitionendHandler)})}ngOnDestroy(){this._cleanupTransitionEnd?.()}_getPrimaryBarTransform(){return`scaleX(${this._isIndeterminate()?1:this.value/100})`}_getBufferBarFlexBasis(){return`${this.mode==="buffer"?this.bufferValue:100}%`}_isIndeterminate(){return this.mode==="indeterminate"||this.mode==="query"}_transitionendHandler=e=>{this.animationEnd.observers.length===0||!e.target||!e.target.classList.contains("mdc-linear-progress__primary-bar")||(this.mode==="determinate"||this.mode==="buffer")&&this._ngZone.run(()=>this.animationEnd.next({value:this.value}))};static \u0275fac=function(t){return new(t||r)};static \u0275cmp=l({type:r,selectors:[["mat-progress-bar"]],hostAttrs:["role","progressbar","aria-valuemin","0","aria-valuemax","100","tabindex","-1",1,"mat-mdc-progress-bar","mdc-linear-progress"],hostVars:10,hostBindings:function(t,a){t&2&&(N("aria-valuenow",a._isIndeterminate()?null:a.value)("mode",a.mode),G("mat-"+a.color),V("_mat-animation-noopable",a._isNoopAnimation)("mdc-linear-progress--animation-ready",!a._isNoopAnimation)("mdc-linear-progress--indeterminate",a._isIndeterminate()))},inputs:{color:"color",value:[2,"value","value",x],bufferValue:[2,"bufferValue","bufferValue",x],mode:"mode"},outputs:{animationEnd:"animationEnd"},exportAs:["matProgressBar"],features:[z],decls:7,vars:5,consts:[["aria-hidden","true",1,"mdc-linear-progress__buffer"],[1,"mdc-linear-progress__buffer-bar"],[1,"mdc-linear-progress__buffer-dots"],["aria-hidden","true",1,"mdc-linear-progress__bar","mdc-linear-progress__primary-bar"],[1,"mdc-linear-progress__bar-inner"],["aria-hidden","true",1,"mdc-linear-progress__bar","mdc-linear-progress__secondary-bar"]],template:function(t,a){t&1&&(o(0,"div",0),m(1,"div",1),p(2,me,1,0,"div",2),s(),o(3,"div",3),m(4,"span",4),s(),o(5,"div",5),m(6,"span",4),s()),t&2&&(i(),_("flex-basis",a._getBufferBarFlexBasis()),i(),g(a.mode==="buffer"?2:-1),i(),_("transform",a._getPrimaryBarTransform()))},styles:[`.mat-mdc-progress-bar{display:block;text-align:start}.mat-mdc-progress-bar[mode=query]{transform:scaleX(-1)}.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-dots,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__secondary-bar,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__bar-inner.mdc-linear-progress__bar-inner{animation:none}.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-bar{transition:transform 1ms}.mdc-linear-progress{position:relative;width:100%;transform:translateZ(0);outline:1px solid rgba(0,0,0,0);overflow-x:hidden;transition:opacity 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);height:max(var(--mdc-linear-progress-track-height, 4px),var(--mdc-linear-progress-active-indicator-height, 4px))}@media(forced-colors: active){.mdc-linear-progress{outline-color:CanvasText}}.mdc-linear-progress__bar{position:absolute;top:0;bottom:0;margin:auto 0;width:100%;animation:none;transform-origin:top left;transition:transform 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);height:var(--mdc-linear-progress-active-indicator-height, 4px)}.mdc-linear-progress--indeterminate .mdc-linear-progress__bar{transition:none}[dir=rtl] .mdc-linear-progress__bar{right:0;transform-origin:center right}.mdc-linear-progress__bar-inner{display:inline-block;position:absolute;width:100%;animation:none;border-top-style:solid;border-color:var(--mdc-linear-progress-active-indicator-color, var(--mat-sys-primary));border-top-width:var(--mdc-linear-progress-active-indicator-height, 4px)}.mdc-linear-progress__buffer{display:flex;position:absolute;top:0;bottom:0;margin:auto 0;width:100%;overflow:hidden;height:var(--mdc-linear-progress-track-height, 4px);border-radius:var(--mdc-linear-progress-track-shape, var(--mat-sys-corner-none))}.mdc-linear-progress__buffer-dots{-webkit-mask-image:url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' enable-background='new 0 0 5 2' xml:space='preserve' viewBox='0 0 5 2' preserveAspectRatio='xMinYMin slice'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/svg%3E");mask-image:url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' enable-background='new 0 0 5 2' xml:space='preserve' viewBox='0 0 5 2' preserveAspectRatio='xMinYMin slice'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/svg%3E");background-repeat:repeat-x;flex:auto;transform:rotate(180deg);animation:mdc-linear-progress-buffering 250ms infinite linear;background-color:var(--mdc-linear-progress-track-color, var(--mat-sys-surface-variant))}@media(forced-colors: active){.mdc-linear-progress__buffer-dots{background-color:ButtonBorder}}[dir=rtl] .mdc-linear-progress__buffer-dots{animation:mdc-linear-progress-buffering-reverse 250ms infinite linear;transform:rotate(0)}.mdc-linear-progress__buffer-bar{flex:0 1 100%;transition:flex-basis 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);background-color:var(--mdc-linear-progress-track-color, var(--mat-sys-surface-variant))}.mdc-linear-progress__primary-bar{transform:scaleX(0)}.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar{left:-145.166611%}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar{animation:mdc-linear-progress-primary-indeterminate-translate 2s infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar>.mdc-linear-progress__bar-inner{animation:mdc-linear-progress-primary-indeterminate-scale 2s infinite linear}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar{animation-name:mdc-linear-progress-primary-indeterminate-translate-reverse}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar{right:-145.166611%;left:auto}.mdc-linear-progress__secondary-bar{display:none}.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar{left:-54.888891%;display:block}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar{animation:mdc-linear-progress-secondary-indeterminate-translate 2s infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar>.mdc-linear-progress__bar-inner{animation:mdc-linear-progress-secondary-indeterminate-scale 2s infinite linear}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar{animation-name:mdc-linear-progress-secondary-indeterminate-translate-reverse}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar{right:-54.888891%;left:auto}@keyframes mdc-linear-progress-buffering{from{transform:rotate(180deg) translateX(calc(var(--mdc-linear-progress-track-height, 4px) * -2.5))}}@keyframes mdc-linear-progress-primary-indeterminate-translate{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(83.67142%)}100%{transform:translateX(200.611057%)}}@keyframes mdc-linear-progress-primary-indeterminate-scale{0%{transform:scaleX(0.08)}36.65%{animation-timing-function:cubic-bezier(0.334731, 0.12482, 0.785844, 1);transform:scaleX(0.08)}69.15%{animation-timing-function:cubic-bezier(0.06, 0.11, 0.6, 1);transform:scaleX(0.661479)}100%{transform:scaleX(0.08)}}@keyframes mdc-linear-progress-secondary-indeterminate-translate{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(37.651913%)}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(84.386165%)}100%{transform:translateX(160.277782%)}}@keyframes mdc-linear-progress-secondary-indeterminate-scale{0%{animation-timing-function:cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971);transform:scaleX(0.08)}19.15%{animation-timing-function:cubic-bezier(0.152313, 0.196432, 0.648374, 1.004315);transform:scaleX(0.457104)}44.15%{animation-timing-function:cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);transform:scaleX(0.72796)}100%{transform:scaleX(0.08)}}@keyframes mdc-linear-progress-primary-indeterminate-translate-reverse{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(-83.67142%)}100%{transform:translateX(-200.611057%)}}@keyframes mdc-linear-progress-secondary-indeterminate-translate-reverse{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(-37.651913%)}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(-84.386165%)}100%{transform:translateX(-160.277782%)}}@keyframes mdc-linear-progress-buffering-reverse{from{transform:translateX(-10px)}}`],encapsulation:2,changeDetection:0})}return r})();function ee(r,n=0,e=100){return Math.max(n,Math.min(e,r))}var ne=(()=>{class r{static \u0275fac=function(t){return new(t||r)};static \u0275mod=S({type:r});static \u0275inj=E({imports:[q]})}return r})();var le=["cardsGrid"];function pe(r,n){if(r&1){let e=$();o(0,"button",4),j("click",function(){let a=O(e).$index,d=f();return T(d.exportToPDF(a))}),y(1),s()}if(r&2){let e=n.$index;i(),Q(" Export Page ",e+1," ")}}function ge(r,n){if(r&1&&(o(0,"p"),y(1),s(),m(2,"mat-progress-bar",5)),r&2){let e=f();i(),Z(e.statusMessage)}}function fe(r,n){if(r&1&&m(0,"app-personal-bingo-card",3),r&2){let e=n.$implicit,t=n.$index,a=f();F("card",e)("serialId",a.currentPage*a.cardsPerPage+t+1)}}var te=class r{constructor(n){this.gameService=n}cardsGrid;cardsArray=[];paginatedCards=[];cardsPerPage=100;currentPage=0;isExporting=!1;statusMessage="";ngOnInit(){this.cardsArray=this.gameService.gameCards().map(n=>({cardNumber:n.cardNumber,content:n.contentMatrix.map(e=>({number:e,marked:!1}))})),this.paginateCards()}paginateCards(){this.paginatedCards=[];for(let n=0;n<this.cardsArray.length;n+=this.cardsPerPage)this.paginatedCards.push(this.cardsArray.slice(n,n+this.cardsPerPage))}changePage(n){this.currentPage=n}exportToPDF(n){this.isExporting=!0,this.statusMessage="Generando PDF...",this.currentPage=n,setTimeout(()=>{let e=this.cardsGrid.nativeElement;(0,ae.default)(e,{scale:1}).then(t=>{let a=t.toDataURL("image/png"),d=new K("p","mm","a4"),C=210,P=297,M=t.height*C/t.width,u=M,w=0;for(;u>0;)d.addImage(a,"PNG",0,w,C,M),u-=P,w-=P,u>0&&d.addPage();d.save(`bingo-cards-page-${n+1}.pdf`),this.isExporting=!1})},100)}static \u0275fac=function(e){return new(e||r)(I(W))};static \u0275cmp=l({type:r,selectors:[["app-exportation-section"]],viewQuery:function(e,t){if(e&1&&L(le,5),e&2){let a;H(a=U())&&(t.cardsGrid=a.first)}},decls:8,vars:1,consts:[["cardsGrid",""],[1,"pagination"],[1,"card-grid"],[3,"card","serialId"],[3,"click"],["mode","indeterminate","color","primary"]],template:function(e,t){e&1&&(o(0,"div",1),h(1,pe,2,1,"button",null,b),s(),p(3,ge,3,1),o(4,"div",2,0),h(6,fe,1,2,"app-personal-bingo-card",3,b),s()),e&2&&(i(),v(t.paginatedCards),i(2),g(t.isExporting?3:-1),i(3),v(t.paginatedCards[t.currentPage]))},dependencies:[J,ne,re],styles:[".pagination[_ngcontent-%COMP%]{display:flex;justify-content:center;gap:1rem;margin-bottom:1.5rem}.pagination[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{padding:.5rem 1rem;font-size:1rem;color:#fff;background-color:#007bff;border:none;border-radius:4px;cursor:pointer;transition:background-color .3s ease}.pagination[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{background-color:#0056b3}.pagination[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:focus{outline:none;box-shadow:0 0 0 3px #007bff80}.mat-progress-bar[_ngcontent-%COMP%]{margin:20px auto;width:80%}.card-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(3,1fr)}app-personal-bingo-card[_ngcontent-%COMP%]{width:100%;max-width:200px;aspect-ratio:1}.export-progress[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center;margin-bottom:2rem}.export-progress[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0 0 .5rem;font-size:1.2rem;font-weight:700;color:#333;text-align:center}.export-progress[_ngcontent-%COMP%]   mat-progress-bar[_ngcontent-%COMP%]{width:100%;max-width:500px}"]})};export{te as ExportationPageComponent};
