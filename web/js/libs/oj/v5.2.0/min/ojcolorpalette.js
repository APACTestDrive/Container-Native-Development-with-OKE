/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";define(["ojs/ojcore","jquery","ojs/ojcomponentcore","ojs/ojarraytabledatasource","ojs/ojcolor","ojs/ojlistview","ojs/ojeditablevalue"],function(t,e){var i={properties:{describedBy:{type:"string"},disabled:{type:"boolean",value:!1},displayOptions:{type:"object",properties:{converterHint:{type:"Array<string>|string",value:["placeholder","notewindow"]},helpInstruction:{type:"Array<string>|string",value:["notewindow"]},messages:{type:"Array<string>|string",value:["inline"]},validatorHint:{type:"Array<string>|string",value:["notewindow"]}}},help:{type:"object",properties:{instruction:{type:"string"}}},helpHints:{type:"object",properties:{definition:{type:"string",value:""},source:{type:"string",value:""}}},labelDisplay:{type:"string",enumValues:["auto","off"],value:"off"},labelHint:{type:"string",value:""},labelledBy:{type:"string"},layout:{type:"string",enumValues:["grid","list"],value:"grid"},messagesCustom:{type:"Array<Object>",writeback:!0,value:[]},palette:{type:"Array<Object>"},swatchSize:{type:"string",enumValues:["lg","sm","xs"],value:"lg"},translations:{type:"object",value:{},properties:{labelNone:{type:"string"}}},valid:{type:"string",writeback:!0,enumValues:["invalidHidden","invalidShown","pending","valid"],readOnly:!0},value:{type:"oj.Color",writeback:!0}},methods:{setProperty:{},getProperty:{},setProperties:{},refresh:{},reset:{},showMessages:{},getNodeBySubId:{},getSubIdByNode:{}},events:{ojAnimateStart:{},ojAnimateEnd:{}},extension:{}};t.__registerWidget("oj.ojColorPalette",e.oj.editableValue,{widgetEventPrefix:"oj",defaultElement:"<input>",options:{labelledBy:null,palette:null,swatchSize:"lg",labelDisplay:"off",layout:"grid",value:null},getNodeBySubId:function(t){if(null==t)return this.element?this.element[0]:null;var e,i=t.subId,a=t.index,s=this._super(t);if(!s)switch(i){case"oj-palette-entry":(e=this._$LV.find(".oj-listview-item")).length&&a<e.length&&(s=e[a])}return s},getSubIdByNode:function(t){var i,a,s=e(t),o=null,l=-1,n=null;return s.is("li")&&s.hasClass("oj-listview-item-element")&&(o="oj-palette-entry",i=s.attr("id"),a=this._$LV.find(".oj-listview-item"),e.each(a,function(t,a){if(e(a).attr("id")===i)return l=t,!1})),o&&(n={subId:o},l>=0&&(n.index=l)),null==n&&(n=this._super(t)),n},add:function(e){var i=null;e instanceof t.Color?i={color:e}:"object"==typeof e&&e.color instanceof t.Color&&(i=e),i&&(this._setPaletteBusyContext("The swatch add is being animated in the palette (id="+this.element.attr("id")+")."),i.id=this._getNewSwatchId(),this._opStack||(this._opStack=[]),this._opStack.push({op:"a",obj:i}),this._palDataSource.add(i),this._waitForLV())},remove:function(e){var i,a,s=null;"number"==(i=typeof e)?e>=0&&e<this._palette.length?s=this._palette[e].id:t.Logger.error("JET Color Palette (id='"+this.element.attr("id")+"'): Invalid index for remove ("+e+")"):"object"===i&&(a=e instanceof t.Color?e:e.color,s=this._findSwatchIdOfColorInPalette(a)),s&&(e={id:s},this._setPaletteBusyContext("The removed swatch is being animated in the palette (id="+this.element.attr("id")+")."),this._opStack||(this._opStack=[]),this._opStack.push({op:"r",obj:e}),this._palDataSource.remove(e),this._waitForLV())},whenReady:function(){var t=this;return new Promise(function(e,i){t._$LV.ojListView("whenReady").then(function(t){e(!0)})})},_destroy:function(){this._resolvePaletteBusyContext(),this._$LV&&(this._opStack=[],this._$LV.ojListView("destroy")),this._palDataSource=null,this._$paletteContainer.remove(),this._$boundElem.removeClass("oj-colorpalette"),this._clear(),this._super()},_ComponentCreate:function(){this._super(),this._initPalette()},_AfterCreate:function(){var e;if(this._super(),this._updateLabelledBy(null,this.options.labelledBy,this._$LV),this._IsCustomElement()||(e=this._GetLabelElement()),e){var i=e.attr("id");i?this._$LV.attr("aria-labelledby",i):t.Logger.warn("JET Color Palette: The label for this component needs an id in order to be accessible")}else{var a=this.element.attr("aria-label");a&&this._$LV.attr("aria-label",a)}},_setOption:function(t,e,i){var a=this.options.labelledBy,s=!1;switch(t){case"value":s=this._setOptValue(e);break;case"palette":this._setOptPalette(e);break;case"swatchSize":this._setOptSwatchSize(e);break;case"layout":this._setOptLayout(e);break;case"labelDisplay":this._setOptLabelDisplay(e);break;case"disabled":this._setOptDisabled(e,!0);break;case"labelledBy":this._updateLabelledBy(a,e,this._$LV)}s||this._super(t,e,i)},_updateLabelledBy:t.EditableValueUtils._updateLabelledBy,_onLVOptionChange:function(t,e){"selection"===e.option&&this._selected(t,e)},_waitForLV:function(){if(!this._LVResolve){var e=this;this._LVResolve=t.Context.getContext(this._$LV[0]).getBusyContext(),this._LVResolve.whenReady().then(function(){var t,i,a,s,o,l;if(e._LVResolve=null,e._resolvePaletteBusyContext(),e._opStack){for(a=!1,o=0;o<e._opStack.length;o++)i=(t=e._opStack[o]).obj,"a"!==t.op&&"r"!==t.op||(a=!0,s||(s=e._palette.slice(0)),"a"===t.op?s.push(i):"r"===t.op&&(l=e._findIndexOfSwatchById(s,i.id),s.splice(l,1),t.index=l));if(a)for(e._fireOptionChangeEvent("palette",s,null);e._opStack.length;)i=(t=e._opStack.shift()).obj,"a"===t.op?e._palette.push(i):"r"===t.op&&e._palette.splice(t.index,1)}},function(){t.Logger.error("JET Color Palette (id='"+e.element.attr("id")+"'): ListView timed out."),e._opStack=[]})}},_compareColorValues:function(e,i){var a=e instanceof t.Color,s=i instanceof t.Color,o=!1;return a&&s&&(o=e.isEqual(i)),o},_fireOptionChangeEvent:function(t,e,i){"palette"===t&&this.option(t,e,{_context:{originalEvent:i,internalSet:!0},changed:!0})},_findColorInPalette:function(t){var e,i,a=-1,s=this._palette,o=s.length;for(e=0;e<o;e++)if(i=s[e],t.isEqual(i.color)){a=e;break}return a},_findSwatchIdOfColorInPalette:function(t){var e,i,a=null,s=this._palette,o=s.length;for(e=0;e<o;e++)if(i=s[e],t.isEqual(i.color)){a=i.id;break}return a},_findIndexOfSwatchById:function(t,e){var i,a=-1,s=t.length;for(i=0;i<s;i++)if(t[i].id===e){a=i;break}return a},_setPaletteBusyContext:function(e){if(!this._resolve){var i=t.Context.getContext(this.element[0]).getBusyContext();this._resolve=i.addBusyState({description:e})}},_resolvePaletteBusyContext:function(){this._resolve&&(this._resolve(),this._resolve=null)},_renderer:function(e){var i,a,s,o,l,n;(i=e.data.color)instanceof t.Color||(i=t.Color.BLACK,t.Logger.warn("JET Color Palette (id='"+this.element.attr("id")+"'): Substituting oj.Color.BLACK for an object that is not an instance of oj.Color")),a=s=e.data.label,o="auto"===this._labelDisplay&&"list"===this._layout&&"sm"===this._swatchSize||"auto"===this._labelDisplay&&"grid"===this._layout&&"lg"===this._swatchSize,null!=i&&(n=a||this._convHex.format(i),o?(a=n||this._convHex.format(i),a=s?a:a.toUpperCase()):a=null,l=!!(this._isTransparent(i)||a&&"none"===a.toLowerCase()));var r,h="";return this._initSelection===e.data.id&&(h="oj-selected",this._initSelection=-1,this._selectedParent=e.parentElement),r="list"===this._layout?"oj-colorpalette-swatchsize-"+this._swatchSize+(l?" oj-colorpalette-swatch-none":""):this._swatchClass+(l?" oj-colorpalette-swatch-none":""),l?this._renderNone(o,a,n,r,h):this._renderStandard(i,o,a,n,r,h)},_renderStandard:function(t,i,a,s,o,l){var n;return n="<div class='oj-colorpalette-swatch-entry "+o+(i?" oj-colorpalette-swatch-showlabel":"")+"'><div class='oj-colorpalette-swatch-container'><div class='oj-colorpalette-swatch "+l+"' style='background-color:"+t.toString()+"'"+(a?"":" title='"+s+"'")+"></div></div>",a&&(n+="<span class='oj-colorpalette-swatch-text'>"+a+"</span>"),e(n+="</div>")[0]},_renderNone:function(t,i,a,s,o){var l;return l="<div class='oj-colorpalette-swatch-entry "+s+(t?" oj-colorpalette-swatch-showlabel":"")+"'><div class='oj-colorpalette-swatch-container'><div class='oj-colorpalette-swatch "+o+"'"+(i?"":" title='"+a+"'")+"><div class='oj-colorpalette-swatch-none-icon'></div></div></div>",i&&(l+="<span class='oj-colorpalette-swatch-text'>"+i+"</span>"),e(l+="</div>")[0]},_selected:function(t,i){var a,s,o=null;if((a=e(i.items[0]).find(".oj-colorpalette-swatch")).addClass("oj-selected"),s=this._selectedSwatch,this._selectedSwatch=a,s||this._selectedParent&&(s=e(this._selectedParent).find(".oj-colorpalette-swatch"),this._selectedParent=null),s&&s.removeClass("oj-selected"),1===i.value.length){for(var l=0;l<this._palette.length;l++)if(this._palette[l].id===i.value[0]){o=this._palette[l].color;break}this._SetValueReturnBoolean(o,t),this._value=o}},_setOptDisabled:function(t,i){var a,s;(!i||i&&t!==this._disabled)&&(this._$LV&&this._$LV.ojListView("option","disabled",t),a=e(".oj-colorpalette-container .oj-colorpalette-swatch"),s=this,t?(this._disabledBG=[],e.each(a,function(t,e){s._disabledBG.push(e.style.backgroundColor),e.style.backgroundColor="#eee"})):(this._disabledBG&&this._disabledBG.length&&e.each(a,function(t,e){e.style.backgroundColor=s._disabledBG[t]}),this._disabledBG=null),this._disabled=t)},_setOptValue:function(e){var i=-1,a=[];if(this._palette.length>0&&e instanceof t.Color&&!this._compareColorValues(this._value,e)){if((i=this._findColorInPalette(e))>=0&&null!=this._palette[i].id){var s=this._palette[i].id;a.push(s)}this._$LV.ojListView("option","selection",a),this._value=e}return a.length>0},_setOptPalette:function(t){e.isArray(t)&&(this._isPaletteEqual(t,this._palette)||(this._setPaletteBusyContext("The palette (id="+this.element.attr("id")+") option change in progress."),this._opStack=[],this._palette=t.slice(0),this._initSelection=this._findColorInPalette(this._value),this._setData(t,this._initSelection,!0),this._waitForLV()))},_setOptSwatchSize:function(t){"string"==typeof t&&t!==this._swatchSize&&(this._swatchSize=t,this._swatchClass="oj-colorpalette-swatchsize-"+("lg"===t?"lg":"sm"===t?"sm":"xs"),this._$LV.ojListView("refresh"))},_setOptLabelDisplay:function(t){"string"==typeof t&&t!==this._labelDisplay&&("auto"!==t&&"off"!==t||(this._labelDisplay=t,this._$LV.ojListView("refresh")))},_setOptLayout:function(t){"string"==typeof t&&t!==this._layout&&(this._layout=t,this._setDisplayFormat(),this._$LV.ojListView("refresh"))},_setDisplayFormat:function(){var t="grid"===this._layout,e=t?"oj-colorpalette-grid":"oj-colorpalette-list";this._$LV.removeClass("oj-colorpalette-grid oj-colorpalette-list oj-listview-card-layout"),this._$LV.addClass(e),t&&this._$LV.addClass("oj-listview-card-layout")},_setData:function(e,i,a){this._addIdsToPalette(e),this._palDataSource=new t.ArrayTableDataSource(e,{idAttribute:"id"}),i>=0&&(this._palette[i].id&&(i=this._palette[i].id),0===this._palInitSelected.length?this._palInitSelected.push(i):this._palInitSelected[0]=i),a&&this._$LV.ojListView("option","data",this._palDataSource)},_initPalette:function(){this._setPaletteBusyContext("Palette (id="+this.element.attr("id")+") is initializing."),this._initData(),this._setup()},_setup:function(){this._$boundElem.append(this._markup),this._$boundElem.addClass("oj-colorpalette"),this._$paletteContainer=this._$boundElem.find(".oj-colorpalette-container"),this._$LV=this._$paletteContainer.find(":first"),this._$LV.attr("data-oj-context",""),this._value&&this._value instanceof t.Color&&(this._initSelection=this._findColorInPalette(this._value)),this._swatchId=0,this._setData(this._palette,this._initSelection,!1),this._$LV.ojListView({data:this._palDataSource,item:{renderer:this._renderer.bind(this)},optionChange:this._onLVOptionChange.bind(this),selectionMode:"single",selection:this._palInitSelected,rootAttributes:{style:"height:100%;width:100%"}}).attr("data-oj-internal","");var e=this;t.Context.getContext(this._$LV[0]).getBusyContext().whenReady().then(function(){if(e._$LV.ojListView("option","translations.msgNoData",""),e._setOptDisabled(e._disabled),e._$LV[0].scrollWidth>e._$LV[0].clientWidth){var t=e._getScrollbarWidth(),i="rtl"===e._GetReadingDirection();e._$LV.css(i?"padding-left":"padding-right",t+1)}e._resolvePaletteBusyContext()})},_initData:function(){var e;this._applyOptions(),this._converterFactory=t.Validation.converterFactory(t.ConverterFactory.CONVERTER_TYPE_COLOR),this._convHex=this._converterFactory.createConverter({format:"hex"}),this._labelNone=this.getTranslatedString("labelNone"),e="grid"===this._layout?"oj-colorpalette-grid oj-listview-card-layout":"oj-colorpalette-list",this._markup=["<div class='oj-colorpalette-container'>","<ul class='"+e+"'/>","</div>"].join("")},_applyOptions:function(){var i,a=this.options;this._doc=this.element[0].ownerDocument,this._body=this._doc.body,this._$boundElem=e(this.element),this._disabled=!1,this._palInitSelected=[],this._palDataSource=null,"string"==typeof(i=a.swatchSize)&&"lg"!==(i=i.toLowerCase())&&"sm"!==i&&"xs"!==i&&(i="lg"),this._swatchSize=i,this._swatchClass="oj-colorpalette-swatchsize-"+i,"string"==typeof(i=a.labelDisplay)&&"auto"!==(i=i.toLowerCase())&&"off"!==i&&(i="auto"),this._labelDisplay=i,"string"==typeof(i=a.layout)&&("grid"!==(i=i.toLowerCase())&&"list"!==i&&(i="grid"),"grid"!==i&&"xs"===this._swatchSize&&(i="grid")),this._layout=i,(i=a.value)instanceof t.Color||(i=null),this._value=i||t.Color.BLACK,i=a.palette,e.isArray(i)||(i=[]),this._palette=i.slice(0),"boolean"==typeof(i=a.disabled)&&(this._disabled=i)},_isTransparent:function(t){var e=t.getRed(),i=t.getGreen(),a=t.getBlue(),s=t.getAlpha();return 0===e&&0===i&&0===a&&0===s},_isPaletteEqual:function(t,e){var i,a,s,o,l=t.length;if(o=!1,l===e.length){for(s=0;s<l&&(i=t[s],a=e[s],!this._compareColorValues(i.color,a.color)||i.label===a.label);s++);o=s>=l}return o},_addIdsToPalette:function(t){var e,i=t.length;for(e=0;e<i;e++)t[e].id=this._getNewSwatchId()},_getNewSwatchId:function(){var t=this._swatchId.toString();return this._swatchId++,t},_clear:function(){this._converterFactory=this._convHex=this._markup=this._$LV=null},_getScrollbarWidth:function(){var t=e("<div style='overflow: scroll; width: 100px; height: 100px; position: absolute; visibility: hidden;'><div style='width: 100%; height: 100%;'></div></div>");this.element.append(t);var i=t[0].offsetWidth,a=t.children()[0].offsetWidth;return t.remove(),i-a},_GetMessagingLauncherElement:function(){return this.element},_GetContentElement:function(){return this._$LV},_GetElementValue:function(){return this._value},_SetDisplayValue:function(e){e?this._value="string"==typeof e?new t.Color(e):e:(this._value=t.Color.BLACK,t.Logger.warn("JET Color Palette (id='"+this.element.attr("id")+"'): Substituting oj.Color.BLACK since display value is not defined."))},_GetDisplayValue:function(){return this._value.toString()},_GetDefaultStyleClass:function(){return"oj-colorpalette"}}),i.extension._WIDGET_NAME="ojColorPalette",t.CustomElementBridge.registerMetadata("oj-color-palette","editableValue",i),t.CustomElementBridge.register("oj-color-palette",{metadata:t.CustomElementBridge.getMetadata("oj-color-palette")})});