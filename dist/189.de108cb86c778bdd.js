"use strict";(self.webpackChunknobleui_angular=self.webpackChunknobleui_angular||[]).push([[189],{9189:(J,w,v)=>{v.d(w,{O:()=>H,j:()=>R,ei:()=>Q,Pl:()=>u,GZ:()=>N});var i=v(5e3),c=v(9808);const g=["*"],h=function(t,n,e,r,a,o,d){return{vertical:t,horizontal:n,small:e,"large-filled":r,"large-filled-symbols":a,"large-empty":o,"large-empty-symbols":d}};function y(t,n){if(1&t&&i._UZ(0,"aw-wizard-navigation-bar",1),2&t){const e=i.oxw();i.Q6J("ngClass",i.Hh0(1,h,"left"==e.navBarLocation,"top"==e.navBarLocation,"small"==e.navBarLayout,"large-filled"==e.navBarLayout,"large-filled-symbols"==e.navBarLayout,"large-empty"==e.navBarLayout,"large-empty-symbols"==e.navBarLayout))}}function _(t,n){if(1&t&&i._UZ(0,"aw-wizard-navigation-bar",1),2&t){const e=i.oxw();i.Q6J("ngClass",i.Hh0(1,h,"right"==e.navBarLocation,"bottom"==e.navBarLocation,"small"==e.navBarLayout,"large-filled"==e.navBarLayout,"large-filled-symbols"==e.navBarLayout,"large-empty"==e.navBarLayout,"large-empty-symbols"==e.navBarLayout))}}const D=function(t,n){return{"wizard-steps":!0,vertical:t,horizontal:n}},m=function(t){return{wizardStep:t}};function C(t,n){if(1&t&&i.GkF(0,7),2&t){const e=i.oxw().$implicit;i.Q6J("ngTemplateOutlet",e.stepTitleTemplate.templateRef)("ngTemplateOutletContext",i.VKq(2,m,e))}}function x(t,n){if(1&t&&(i.ynx(0),i._uU(1),i.BQk()),2&t){const e=i.oxw().$implicit;i.xp6(1),i.Oqu(e.stepTitle)}}function B(t,n){if(1&t&&i.GkF(0,7),2&t){const e=i.oxw().$implicit;i.Q6J("ngTemplateOutlet",e.stepSymbolTemplate.templateRef)("ngTemplateOutletContext",i.VKq(2,m,e))}}function T(t,n){if(1&t&&(i.ynx(0),i._uU(1),i.BQk()),2&t){const e=i.oxw().$implicit;i.xp6(1),i.Oqu(e.navigationSymbol.symbol)}}const W=function(t,n,e,r,a,o){return{current:t,editing:n,done:e,optional:r,completed:a,navigable:o}},F=function(t){return{"font-family":t}};function M(t,n){if(1&t&&(i.TgZ(0,"li",1),i.TgZ(1,"a",2),i.TgZ(2,"div",3),i.YNc(3,C,1,4,"ng-container",4),i.YNc(4,x,2,1,"ng-container",5),i.qZA(),i.TgZ(5,"div",6),i.YNc(6,B,1,4,"ng-container",4),i.YNc(7,T,2,1,"ng-container",5),i.qZA(),i.qZA(),i.qZA()),2&t){const e=n.$implicit,r=i.oxw();i.Q6J("ngClass",i.HTZ(8,W,r.isCurrent(e),r.isEditing(e),r.isDone(e),r.isOptional(e),r.isCompleted(e),r.isNavigable(e))),i.uIk("id",e.stepId),i.xp6(1),i.Q6J("awGoToStep",e),i.xp6(2),i.Q6J("ngIf",e.stepTitleTemplate),i.xp6(1),i.Q6J("ngIf",!e.stepTitleTemplate),i.xp6(1),i.Q6J("ngStyle",i.VKq(15,F,e.stepSymbolTemplate?"":e.navigationSymbol.fontFamily)),i.xp6(1),i.Q6J("ngIf",e.stepSymbolTemplate),i.xp6(1),i.Q6J("ngIf",!e.stepSymbolTemplate)}}let E=(()=>{class t{constructor(e){this.templateRef=e}}return t.\u0275fac=function(e){return new(e||t)(i.Y36(i.Rgc))},t.\u0275dir=i.lG2({type:t,selectors:[["ng-template","awStepSymbol",""],["ng-template","awWizardStepSymbol",""]]}),t})(),I=(()=>{class t{constructor(e){this.templateRef=e}}return t.\u0275fac=function(e){return new(e||t)(i.Y36(i.Rgc))},t.\u0275dir=i.lG2({type:t,selectors:[["ng-template","awStepTitle",""],["ng-template","awWizardStepTitle",""]]}),t})(),s=(()=>{class t{constructor(){this.navigationSymbol={symbol:""},this.selected=!1,this.completed=!1,this.initiallyCompleted=!1,this.editing=!1,this.defaultSelected=!1,this.optional=!1,this.canEnter=!0,this.canExit=!0,this.stepEnter=new i.vpe,this.stepExit=new i.vpe}get hidden(){return!this.selected}static canTransitionStep(e,r){return"boolean"==typeof e?Promise.resolve(e):e instanceof Function?Promise.resolve(e(r)):Promise.reject(new Error(`Input value '${e}' is neither a boolean nor a function`))}enter(e){this.stepEnter.emit(e)}exit(e){this.stepExit.emit(e)}canEnterStep(e){return t.canTransitionStep(this.canEnter,e)}canExitStep(e){return t.canTransitionStep(this.canExit,e)}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275dir=i.lG2({type:t,contentQueries:function(e,r,a){if(1&e&&(i.Suo(a,I,5),i.Suo(a,E,5)),2&e){let o;i.iGM(o=i.CRH())&&(r.stepTitleTemplate=o.first),i.iGM(o=i.CRH())&&(r.stepSymbolTemplate=o.first)}},hostVars:1,hostBindings:function(e,r){2&e&&i.Ikx("hidden",r.hidden)},inputs:{navigationSymbol:"navigationSymbol",canEnter:"canEnter",canExit:"canExit",stepId:"stepId",stepTitle:"stepTitle"},outputs:{stepEnter:"stepEnter",stepExit:"stepExit"}}),t})(),l=(()=>{class t extends s{constructor(){super(...arguments),this.stepExit=new i.vpe,this.canExit=!1}enter(e){this.completed=!0,this.stepEnter.emit(e)}exit(e){this.completed=this.initiallyCompleted,this.stepExit.emit(e)}}return t.\u0275fac=function(){let n;return function(r){return(n||(n=i.n5z(t)))(r||t)}}(),t.\u0275dir=i.lG2({type:t,features:[i.qOj]}),t})();var p=(()=>{return(t=p||(p={}))[t.Forwards=0]="Forwards",t[t.Backwards=1]="Backwards",t[t.Stay=2]="Stay",p;var t})();class z extends class{canGoToStep(n,e){const r=n.hasStep(e),a=n.getMovingDirection(e);return Promise.resolve(r).then(f=>f&&this.canTransitionToStep(n,e)).then(f=>f&&n.currentStep.canExitStep(a)).then(f=>f&&n.getStepAtIndex(e).canEnterStep(a))}canTransitionToStep(n,e){return this.isNavigable(n,e)}goToStep(n,e,r,a){this.canGoToStep(n,e).then(o=>{if(o){const d=n.getMovingDirection(e);r&&r.emit(),n.currentStep.completed=!0,n.currentStep.exit(d),n.currentStep.editing=!1,n.currentStep.selected=!1,this.transition(n,e);const S=n.completed||n.currentStep.completed;n.currentStep.enter(d),n.currentStep.selected=!0,S&&(n.currentStep.editing=!0),a&&a.emit()}else n.currentStep.exit(p.Stay),n.currentStep.enter(p.Stay)})}transition(n,e){n.currentStepIndex=e}reset(n){this.ensureCanReset(n),n.wizardSteps.forEach(e=>{e.completed=e.initiallyCompleted,e.selected=!1,e.editing=!1}),n.currentStepIndex=n.defaultStepIndex,n.currentStep.selected=!0,n.currentStep.enter(p.Forwards)}ensureCanReset(n){if(!n.hasStep(n.defaultStepIndex))throw new Error(`The wizard doesn't contain a step with index ${n.defaultStepIndex}`)}}{constructor(n=null,e=null){super(),this.navigateBackward=n,this.navigateForward=e,this.navigateBackward=this.navigateBackward||"allow",this.navigateForward=this.navigateForward||"deny"}canTransitionToStep(n,e){return!!this.isNavigable(n,e)||n.wizardSteps.filter((r,a)=>a<e&&a!==n.currentStepIndex).every(r=>r.completed||r.optional)}transition(n,e){"deny"===this.navigateForward&&n.wizardSteps.filter((r,a)=>n.currentStepIndex>e&&a>e).forEach(r=>r.completed=!1),super.transition(n,e)}isNavigable(n,e){const r=n.getStepAtIndex(e);if(r instanceof l&&!n.wizardSteps.filter((o,d)=>d<e).every(o=>o.completed||o.optional||o.selected))return!1;if(e<n.currentStepIndex)switch(this.navigateBackward){case"allow":return!0;case"deny":return!1;default:throw new Error(`Invalid value for navigateBackward: ${this.navigateBackward}`)}else{if(!(e>n.currentStepIndex))return!1;switch(this.navigateForward){case"allow":return!0;case"deny":return!1;case"visited":return r.completed;default:throw new Error(`Invalid value for navigateForward: ${this.navigateForward}`)}}}ensureCanReset(n){if(super.ensureCanReset(n),n.getStepAtIndex(n.defaultStepIndex)instanceof l&&1!==n.wizardSteps.length)throw new Error(`The default step index ${n.defaultStepIndex} references a completion step`)}}let u=(()=>{class t{constructor(){this.navBarLocation="top",this.navBarLayout="small",this.navBarDirection="left-to-right",this._defaultStepIndex=0,this.disableNavigationBar=!1,this._navigation=new z,this._wizardSteps=[],this.currentStepIndex=-1}get defaultStepIndex(){const e=this.wizardSteps.find(r=>r.defaultSelected);return e?this.getIndexOfStep(e):this._defaultStepIndex}set defaultStepIndex(e){this._defaultStepIndex=e}get horizontalOrientation(){return"top"===this.navBarLocation||"bottom"===this.navBarLocation}get verticalOrientation(){return"left"===this.navBarLocation||"right"===this.navBarLocation}ngAfterContentInit(){this.wizardStepsQueryList.changes.subscribe(e=>{this.updateWizardSteps(e.toArray())}),this.updateWizardSteps(this.wizardStepsQueryList.toArray()),setTimeout(()=>this.reset())}get currentStep(){return this.hasStep(this.currentStepIndex)?this.wizardSteps[this.currentStepIndex]:null}get completed(){return this.wizardSteps.every(e=>e.completed||e.optional)}get wizardSteps(){return this._wizardSteps}updateWizardSteps(e){this.wizardSteps.length>0&&this.currentStepIndex>-1&&(this.currentStepIndex=e.indexOf(this.wizardSteps[this.currentStepIndex])),this._wizardSteps=e}get navigation(){return this._navigation}set navigation(e){this._navigation=e}hasStep(e){return this.wizardSteps.length>0&&0<=e&&e<this.wizardSteps.length}hasPreviousStep(){return this.hasStep(this.currentStepIndex-1)}hasNextStep(){return this.hasStep(this.currentStepIndex+1)}isLastStep(){return this.wizardSteps.length>0&&this.currentStepIndex===this.wizardSteps.length-1}getStepAtIndex(e){if(!this.hasStep(e))throw new Error(`Expected a known step, but got stepIndex: ${e}.`);return this.wizardSteps[e]}getIndexOfStepWithId(e){return this.wizardSteps.findIndex(r=>r.stepId===e)}getIndexOfStep(e){return this.wizardSteps.indexOf(e)}getMovingDirection(e){let r;return r=e>this.currentStepIndex?p.Forwards:e<this.currentStepIndex?p.Backwards:p.Stay,r}canGoToStep(e){return this.navigation.canGoToStep(this,e)}goToStep(e,r,a){return this.navigation.goToStep(this,e,r,a)}goToPreviousStep(e,r){return this.navigation.goToStep(this,this.currentStepIndex-1,e,r)}goToNextStep(e,r){return this.navigation.goToStep(this,this.currentStepIndex+1,e,r)}isNavigable(e){return this.navigation.isNavigable(this,e)}reset(){this.navigation.reset(this)}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=i.Xpm({type:t,selectors:[["aw-wizard"]],contentQueries:function(e,r,a){if(1&e&&i.Suo(a,s,5),2&e){let o;i.iGM(o=i.CRH())&&(r.wizardStepsQueryList=o)}},hostVars:4,hostBindings:function(e,r){2&e&&i.ekj("horizontal",r.horizontalOrientation)("vertical",r.verticalOrientation)},inputs:{navBarLocation:"navBarLocation",navBarLayout:"navBarLayout",navBarDirection:"navBarDirection",disableNavigationBar:"disableNavigationBar",defaultStepIndex:"defaultStepIndex"},ngContentSelectors:g,decls:4,vars:6,consts:[[3,"ngClass",4,"ngIf"],[3,"ngClass"]],template:function(e,r){1&e&&(i.F$t(),i.YNc(0,y,1,9,"aw-wizard-navigation-bar",0),i.TgZ(1,"div",1),i.Hsn(2),i.qZA(),i.YNc(3,_,1,9,"aw-wizard-navigation-bar",0)),2&e&&(i.Q6J("ngIf","top"==r.navBarLocation||"left"==r.navBarLocation),i.xp6(1),i.Q6J("ngClass",i.WLB(3,D,"left"==r.navBarLocation||"right"==r.navBarLocation,"top"==r.navBarLocation||"bottom"==r.navBarLocation)),i.xp6(2),i.Q6J("ngIf","bottom"==r.navBarLocation||"right"==r.navBarLocation))},directives:function(){return[c.O5,c.mk,O]},encapsulation:2}),t})(),O=(()=>{class t{constructor(e){this.wizard=e}get wizardSteps(){return"right-to-left"===this.wizard.navBarDirection?this.wizard.wizardSteps.slice().reverse():this.wizard.wizardSteps}get numberOfWizardSteps(){return this.wizard.wizardSteps.length}isCurrent(e){return e.selected}isEditing(e){return e.editing}isDone(e){return e.completed}isOptional(e){return e.optional}isCompleted(e){return e instanceof l&&this.wizard.completed}isNavigable(e){return!e.selected&&!this.wizard.disableNavigationBar&&this.wizard.isNavigable(this.wizard.getIndexOfStep(e))}}return t.\u0275fac=function(e){return new(e||t)(i.Y36(u))},t.\u0275cmp=i.Xpm({type:t,selectors:[["aw-wizard-navigation-bar"]],decls:2,vars:4,consts:[[3,"ngClass",4,"ngFor","ngForOf"],[3,"ngClass"],[3,"awGoToStep"],[1,"label"],[3,"ngTemplateOutlet","ngTemplateOutletContext",4,"ngIf"],[4,"ngIf"],[1,"step-indicator",3,"ngStyle"],[3,"ngTemplateOutlet","ngTemplateOutletContext"]],template:function(e,r){1&e&&(i.TgZ(0,"ul"),i.YNc(1,M,8,17,"li",0),i.qZA()),2&e&&(i.Gre("steps-indicator steps-",r.numberOfWizardSteps,""),i.xp6(1),i.Q6J("ngForOf",r.wizardSteps))},directives:function(){return[c.sg,c.mk,P,c.O5,c.PC,c.tP]},encapsulation:2}),t})(),N=(()=>{class t extends s{}return t.\u0275fac=function(){let n;return function(r){return(n||(n=i.n5z(t)))(r||t)}}(),t.\u0275cmp=i.Xpm({type:t,selectors:[["aw-wizard-step"]],features:[i._Bn([{provide:s,useExisting:(0,i.Gpc)(()=>t)}]),i.qOj],ngContentSelectors:g,decls:1,vars:0,template:function(e,r){1&e&&(i.F$t(),i.Hsn(0))},encapsulation:2}),t})(),P=(()=>{class t{constructor(e,r){this.wizard=e,this.wizardStep=r,this.preFinalize=new i.vpe,this.postFinalize=new i.vpe}get finalize(){return this.preFinalize}set finalize(e){this.preFinalize=e}get destinationStep(){let e;if(function(t){return t.hasOwnProperty("stepIndex")}(this.targetStep))e=this.targetStep.stepIndex;else if(function(t){return t.hasOwnProperty("stepId")&&!(t instanceof s)}(this.targetStep))e=this.wizard.getIndexOfStepWithId(this.targetStep.stepId);else if(function(t){return t.hasOwnProperty("stepOffset")}(this.targetStep)&&null!==this.wizardStep)e=this.wizard.getIndexOfStep(this.wizardStep)+this.targetStep.stepOffset;else{if(!(this.targetStep instanceof s))throw new Error("Input 'targetStep' is neither a WizardStep, StepOffset, StepIndex or StepId");e=this.wizard.getIndexOfStep(this.targetStep)}return e}onClick(){this.wizard.goToStep(this.destinationStep,this.preFinalize,this.postFinalize)}}return t.\u0275fac=function(e){return new(e||t)(i.Y36(u),i.Y36(s,8))},t.\u0275dir=i.lG2({type:t,selectors:[["","awGoToStep",""]],hostBindings:function(e,r){1&e&&i.NdJ("click",function(){return r.onClick()})},inputs:{targetStep:["awGoToStep","targetStep"]},outputs:{preFinalize:"preFinalize",postFinalize:"postFinalize",finalize:"finalize"}}),t})(),R=(()=>{class t{constructor(e){this.wizard=e,this.preFinalize=new i.vpe,this.postFinalize=new i.vpe}get finalize(){return this.preFinalize}set finalize(e){this.preFinalize=e}onClick(){this.wizard.goToNextStep(this.preFinalize,this.postFinalize)}}return t.\u0275fac=function(e){return new(e||t)(i.Y36(u))},t.\u0275dir=i.lG2({type:t,selectors:[["","awNextStep",""]],hostBindings:function(e,r){1&e&&i.NdJ("click",function(){return r.onClick()})},outputs:{preFinalize:"preFinalize",postFinalize:"postFinalize",finalize:"finalize"}}),t})(),Q=(()=>{class t{constructor(e){this.wizard=e,this.preFinalize=new i.vpe,this.postFinalize=new i.vpe}get finalize(){return this.preFinalize}set finalize(e){this.preFinalize=e}onClick(){this.wizard.goToPreviousStep(this.preFinalize,this.postFinalize)}}return t.\u0275fac=function(e){return new(e||t)(i.Y36(u))},t.\u0275dir=i.lG2({type:t,selectors:[["","awPreviousStep",""]],hostBindings:function(e,r){1&e&&i.NdJ("click",function(){return r.onClick()})},outputs:{preFinalize:"preFinalize",postFinalize:"postFinalize",finalize:"finalize"}}),t})(),H=(()=>{class t{static forRoot(){return{ngModule:t,providers:[]}}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=i.oAB({type:t}),t.\u0275inj=i.cJS({imports:[[c.ez]]}),t})()}}]);