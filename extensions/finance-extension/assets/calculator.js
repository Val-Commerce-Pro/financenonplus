"use strict";

//	value: {
//		product_amount
//		period_min
//		period_step
//		period_zero_interest
//		period					(array)
//		rate					(array)
//		selected_index
//		legal_text
// }

var finance_calculator = (function (value) {
  if (window.finance_calculator) {
    window.finance_calculator.update(value);

    return window.finance_calculator;
  }

  var fc = {};

  fc.properties = {};

  var valid_properties = [
    "product_amount",
    "period_min",
    "period_step",
    "period_zero_interest",
    "period",
    "rate",
    "selected_index",
    "legal_text",
  ];
  var period_rate_data = [];
  var default_legal_text = [];

  fc._launch_value = value;

  //////////////////////// FUNCTIONS CALLED EXCLUSIVELY BY THE GENERATOR:

  fc.write_template = function () {
    var table = [
      "	<style>",
      "		.table-container		{ width: 100%; position: relative; min-height: 1px; padding-left: 15px; padding-right: 15px; box-sizing: border-box; color: rgb(45, 41, 38); font-family: Arial, Helvetica, sans-serif; }",
      "		.table-container *		{ box-sizing: border-box; }",
      "		.table-container h2		{ font-size: 18px; font-weight: 700; line-height: 20px; margin-bottom: 10px; margin-top: 30px; }",
      "		#value-table			{ border-collapse: collapse; border-spacing: 0px 0px;color: rgb(29, 29, 27); font-size: 14px; line-height: 18px; margin-bottom: 50px; width: 100%; }",
      "		#value-table tr th,",
      "		#value-table tr td		{ text-align: center; padding-top: 18px; padding-bottom: 18px; border-bottom: 1px solid #cccccc; border-right: 1px solid #cccccc; }",
      "		#value-table tr th		{ background-color: #f2f2f2; }",
      "		#value-table tr th:last-child{ border-right-width: 0; }",
      "	</style>",
      '	<div class="table-container">',
      "		<h2>Tabellarische Darstellung</h2>",
      '		<table id="value-table">',
      "			<thead>",
      "			<tr>",
      "				<th>Laufzeit (in Monaten)</th>",
      "				<th>Monatliche Rate</th>",
      '				<th class="last-col">Sollzins (jährlich, gebunden)</th>',
      "			</tr>",
      "			</thead>",
      "			<tbody></tbody>",
      "		</table>",
      "	</div>",
    ];

    var template =
      '<div class="calculator"><div class="calculator-wrapper"><div class="calculator-title"> Ihr möglicher <span class="nowrap">Finanzierungsplan<sup>1</sup></span></div><div class="finance-amount"><div class="finance-amount-label">Finanzierungsbetrag</div><div class="finance-amount-value"><input class="autosize" value="00.00" title="Finanzierungsbetrag"><span class="unit">&euro;</span></div><div class="ubernehmen-button"><input class="btn btn-change-value submit" type="submit" value="Übernehmen"></div></div><div class="duration"><div class="duration-label"> GEWÜNSCHTE <span class="nowrap">ANZAHL AN RATEN</span></div><div class="duration-value"><button class="prev-month"><span class="arrow-icon left"/></button><button class="month">1</button><button class="month selected">2</button><button class="month">3</button><button class="next-month"><span class="arrow-icon right"/></button></div></div><div class="more-months-switch"><div class="more-month-label"> Zusätzliche Monatsraten anzeigen</div><div class="more-month-button-wrapper"><div class="button"><div class="button-label">Nein</div><div class="button-label on">Ja</div></div></div></div><div class="financial-box"><div class="monthly-rate"><div class="monthly-rate-label"> Monatliche Rate <span class="nowrap">für Ihren Einkauf</span></div><div class="monthly-rate-value-wrapper"><span class="unit">&euro;</span><span class="monthly-rate-value">00,00</span></div></div><!-- less months --><div class="show-on-less-month"><div class="interest-rate financial-box-detail"><div class="interest-rate-label detail-label"> Sollzinssatz für diesen Einkauf <span class="nowrap"> für <span class="months">0</span> Monate (jährl., gebunden):</span></div><div class="interest-rate-value detail-value nowrap">0,00 %</div></div><div class="interest-value financial-box-detail"><div class="interest-value-label detail-label"> Mögliche Sollzinsen <span class="nowrap"> für diesen Einkauf:</span></div><div class="interest-value-value detail-value nowrap">0,00 &euro;</div></div></div><!-- more month --><div class="show-on-more-month"><div class="interest-rate financial-box-detail"><div class="interest-rate-label detail-label"> Sollzinssatz für <span class="months">0</span> Monate (jährl., gebunden): </div><div class="interest-rate-value detail-value nowrap">0,00 %</div></div><div class="eff-interest-rate financial-box-detail"><div class="detail-label">Effektiver Jahreszinssatz:</div><div class="eff-interest-rate-value detail-value nowrap">0,00 %</div></div><div class="amount financial-box-detail"><div class="detail-label">Nettodarlehensbetrag:</div><div class="amount-value detail-value nowrap">0,00 €</div></div><div class="interest-value financial-box-detail"><div class="detail-label">Sollzinsen:</div><div class="interest-value-value detail-value nowrap">0,00 %</div></div><div class="total financial-box-detail"><div class="detail-label">Gesamtbetrag:</div><div class="total-value detail-value nowrap">0,00 €</div></div></div></div></div><div class="legal-text"></div></div>';

    var data_str = "{}";

    try {
      data_str = JSON.stringify(this.properties);
    } catch (e) {
      console.log("ERROR creating Data from: ", this.properties);
    }

    var required_functions = [
      "apply_properties",
      "generate_rate_list",
      "render_table",
      "make_row",
      "init",
      "update_selection",
      "make_arrow_click",
      "update",
    ];
    var required_private = [
      precisionRound,
      formatNumberOutput,
      sanitize_num,
      update_legal,
      _calcMonthlyRates,
    ];

    var legal_text = this._container.querySelector(".legal-text")
      ? String(this._container.querySelector(".legal-text").innerHTML)
          .replaceAll("\n", "")
          .replaceAll("\r", "")
          .replaceAll('"', '\\"')
      : "";

    var code = [
      "<!-- calculator scripts & styles -->",
      '<style>.calculator{/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */ display: flex; flex-flow: row; }.calculator html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}.calculator body{margin:0}.calculator article,.calculator aside,.calculator details,.calculator figcaption,.calculator figure,.calculator footer,.calculator header,.calculator hgroup,.calculator main,.calculator menu,.calculator nav,.calculator section,.calculator summary{display:block}.calculator audio,.calculator canvas,.calculator progress,.calculator video{display:inline-block;vertical-align:baseline}.calculator audio:not([controls]){display:none;height:0}.calculator [hidden],.calculator template{display:none}.calculator a{background-color:transparent}.calculator a:active,.calculator a:hover{outline:0}.calculator abbr[title]{border-bottom:1px dotted}.calculator b,.calculator strong{font-weight:700}.calculator dfn{font-style:italic}.calculator h1{font-size:2em;margin:.67em 0}.calculator mark{background:#ff0;color:#000}.calculator small{font-size:80%}.calculator sub,.calculator sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}.calculator sup{top:-.5em}.calculator sub{bottom:-.25em}.calculator img{border:0}.calculator svg:not(:root){overflow:hidden}.calculator figure{margin:1em 40px}.calculator hr{box-sizing:content-box;height:0}.calculator pre{overflow:auto}.calculator code,.calculator kbd,.calculator pre,.calculator samp{font-family:monospace,monospace;font-size:1em}.calculator button,.calculator input,.calculator optgroup,.calculator select,.calculator textarea{color:inherit;font:inherit;margin:0}.calculator button{overflow:visible}.calculator button,.calculator select{text-transform:none}.calculator button,.calculator html input[type=button],.calculator input[type=reset],.calculator input[type=submit]{-webkit-appearance:button;cursor:pointer}.calculator button[disabled],.calculator html input[disabled]{cursor:default}.calculator button::-moz-focus-inner,.calculator input::-moz-focus-inner{border:0;padding:0}.calculator input{line-height:normal}.calculator input[type=checkbox],.calculator input[type=radio]{box-sizing:border-box;padding:0}.calculator input[type=number]::-webkit-inner-spin-button,.calculator input[type=number]::-webkit-outer-spin-button{height:auto}.calculator input[type=search]{-webkit-appearance:textfield;box-sizing:content-box}.calculator input[type=search]::-webkit-search-cancel-button,.calculator input[type=search]::-webkit-search-decoration{-webkit-appearance:none}.calculator fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}.calculator legend{border:0;padding:0}.calculator textarea{overflow:auto}.calculator optgroup{font-weight:700}.calculator table{border-collapse:collapse;border-spacing:0}.calculator td,.calculator th{padding:0}.calculator *{box-sizing:border-box}.calculator :after,.calculator :before{box-sizing:border-box}.calculator html{font-size:10px;-webkit-tap-highlight-color:transparent}.calculator body{font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;font-size:14px;line-height:1.42857;color:#333;background-color:#fff}.calculator button,.calculator input,.calculator select,.calculator textarea{font-family:inherit;font-size:inherit;line-height:inherit}.calculator a{color:#337ab7;text-decoration:none}.calculator a:focus,.calculator a:hover{color:#23527c;text-decoration:underline}.calculator a:focus{outline:5px auto -webkit-focus-ring-color;outline-offset:-2px}.calculator figure{margin:0}.calculator img{vertical-align:middle}.calculator .img-responsive{display:block;max-width:100%;height:auto}.calculator .img-rounded{border-radius:6px}.calculator .img-thumbnail{padding:4px;line-height:1.42857;background-color:#fff;border:1px solid #ddd;border-radius:4px;transition:all .2s ease-in-out;display:inline-block;max-width:100%;height:auto}.calculator .img-circle{border-radius:50%}.calculator hr{margin-top:20px;margin-bottom:20px;border:0;border-top:1px solid #eee}.calculator .sr-only{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0,0,0,0);border:0}.calculator .sr-only-focusable:active,.calculator .sr-only-focusable:focus{position:static;width:auto;height:auto;margin:0;overflow:visible;clip:auto}.calculator [role=button]{cursor:pointer}.calculator .container{margin-right:auto;margin-left:auto;padding-left:15px;padding-right:15px}.calculator .container:after,.calculator .container:before{content:" ";display:table}.calculator .container:after{clear:both}@media (min-width:768px){.calculator .container{width:750px}}@media (min-width:992px){.calculator .container{width:970px}}@media (min-width:1200px){.calculator .container{width:1170px}}.calculator .container-fluid{margin-right:auto;margin-left:auto;padding-left:15px;padding-right:15px}.calculator .container-fluid:after,.calculator .container-fluid:before{content:" ";display:table}.calculator .container-fluid:after{clear:both}.calculator .row{margin-left:-15px;margin-right:-15px}.calculator .row:after,.calculator .row:before{content:" ";display:table}.calculator .row:after{clear:both}.calculator .col-lg-1,.calculator .col-lg-10,.calculator .col-lg-11,.calculator .col-lg-12,.calculator .col-lg-2,.calculator .col-lg-3,.calculator .col-lg-4,.calculator .col-lg-5,.calculator .col-lg-6,.calculator .col-lg-7,.calculator .col-lg-8,.calculator .col-lg-9,.calculator .col-md-1,.calculator .col-md-10,.calculator .col-md-11,.calculator .col-md-12,.calculator .col-md-2,.calculator .col-md-3,.calculator .col-md-4,.calculator .col-md-5,.calculator .col-md-6,.calculator .col-md-7,.calculator .col-md-8,.calculator .col-md-9,.calculator .col-sm-1,.calculator .col-sm-10,.calculator .col-sm-11,.calculator .col-sm-12,.calculator .col-sm-2,.calculator .col-sm-3,.calculator .col-sm-4,.calculator .col-sm-5,.calculator .col-sm-6,.calculator .col-sm-7,.calculator .col-sm-8,.calculator .col-sm-9,.calculator .col-xs-1,.calculator .col-xs-10,.calculator .col-xs-11,.calculator .col-xs-12,.calculator .col-xs-2,.calculator .col-xs-3,.calculator .col-xs-4,.calculator .col-xs-5,.calculator .col-xs-6,.calculator .col-xs-7,.calculator .col-xs-8,.calculator .col-xs-9{position:relative;min-height:1px;padding-left:15px;padding-right:15px}.calculator .col-xs-1,.calculator .col-xs-10,.calculator .col-xs-11,.calculator .col-xs-12,.calculator .col-xs-2,.calculator .col-xs-3,.calculator .col-xs-4,.calculator .col-xs-5,.calculator .col-xs-6,.calculator .col-xs-7,.calculator .col-xs-8,.calculator .col-xs-9{float:left}.calculator .col-xs-1{width:8.33333%}.calculator .col-xs-2{width:16.66667%}.calculator .col-xs-3{width:25%}.calculator .col-xs-4{width:33.33333%}.calculator .col-xs-5{width:41.66667%}.calculator .col-xs-6{width:50%}.calculator .col-xs-7{width:58.33333%}.calculator .col-xs-8{width:66.66667%}.calculator .col-xs-9{width:75%}.calculator .col-xs-10{width:83.33333%}.calculator .col-xs-11{width:91.66667%}.calculator .col-xs-12{width:100%}.calculator .col-xs-pull-0{right:auto}.calculator .col-xs-pull-1{right:8.33333%}.calculator .col-xs-pull-2{right:16.66667%}.calculator .col-xs-pull-3{right:25%}.calculator .col-xs-pull-4{right:33.33333%}.calculator .col-xs-pull-5{right:41.66667%}.calculator .col-xs-pull-6{right:50%}.calculator .col-xs-pull-7{right:58.33333%}.calculator .col-xs-pull-8{right:66.66667%}.calculator .col-xs-pull-9{right:75%}.calculator .col-xs-pull-10{right:83.33333%}.calculator .col-xs-pull-11{right:91.66667%}.calculator .col-xs-pull-12{right:100%}.calculator .col-xs-push-0{left:auto}.calculator .col-xs-push-1{left:8.33333%}.calculator .col-xs-push-2{left:16.66667%}.calculator .col-xs-push-3{left:25%}.calculator .col-xs-push-4{left:33.33333%}.calculator .col-xs-push-5{left:41.66667%}.calculator .col-xs-push-6{left:50%}.calculator .col-xs-push-7{left:58.33333%}.calculator .col-xs-push-8{left:66.66667%}.calculator .col-xs-push-9{left:75%}.calculator .col-xs-push-10{left:83.33333%}.calculator .col-xs-push-11{left:91.66667%}.calculator .col-xs-push-12{left:100%}.calculator .col-xs-offset-0{margin-left:0}.calculator .col-xs-offset-1{margin-left:8.33333%}.calculator .col-xs-offset-2{margin-left:16.66667%}.calculator .col-xs-offset-3{margin-left:25%}.calculator .col-xs-offset-4{margin-left:33.33333%}.calculator .col-xs-offset-5{margin-left:41.66667%}.calculator .col-xs-offset-6{margin-left:50%}.calculator .col-xs-offset-7{margin-left:58.33333%}.calculator .col-xs-offset-8{margin-left:66.66667%}.calculator .col-xs-offset-9{margin-left:75%}.calculator .col-xs-offset-10{margin-left:83.33333%}.calculator .col-xs-offset-11{margin-left:91.66667%}.calculator .col-xs-offset-12{margin-left:100%}@media (min-width:768px){.calculator .col-sm-1,.calculator .col-sm-10,.calculator .col-sm-11,.calculator .col-sm-12,.calculator .col-sm-2,.calculator .col-sm-3,.calculator .col-sm-4,.calculator .col-sm-5,.calculator .col-sm-6,.calculator .col-sm-7,.calculator .col-sm-8,.calculator .col-sm-9{float:left}.calculator .col-sm-1{width:8.33333%}.calculator .col-sm-2{width:16.66667%}.calculator .col-sm-3{width:25%}.calculator .col-sm-4{width:33.33333%}.calculator .col-sm-5{width:41.66667%}.calculator .col-sm-6{width:50%}.calculator .col-sm-7{width:58.33333%}.calculator .col-sm-8{width:66.66667%}.calculator .col-sm-9{width:75%}.calculator .col-sm-10{width:83.33333%}.calculator .col-sm-11{width:91.66667%}.calculator .col-sm-12{width:100%}.calculator .col-sm-pull-0{right:auto}.calculator .col-sm-pull-1{right:8.33333%}.calculator .col-sm-pull-2{right:16.66667%}.calculator .col-sm-pull-3{right:25%}.calculator .col-sm-pull-4{right:33.33333%}.calculator .col-sm-pull-5{right:41.66667%}.calculator .col-sm-pull-6{right:50%}.calculator .col-sm-pull-7{right:58.33333%}.calculator .col-sm-pull-8{right:66.66667%}.calculator .col-sm-pull-9{right:75%}.calculator .col-sm-pull-10{right:83.33333%}.calculator .col-sm-pull-11{right:91.66667%}.calculator .col-sm-pull-12{right:100%}.calculator .col-sm-push-0{left:auto}.calculator .col-sm-push-1{left:8.33333%}.calculator .col-sm-push-2{left:16.66667%}.calculator .col-sm-push-3{left:25%}.calculator .col-sm-push-4{left:33.33333%}.calculator .col-sm-push-5{left:41.66667%}.calculator .col-sm-push-6{left:50%}.calculator .col-sm-push-7{left:58.33333%}.calculator .col-sm-push-8{left:66.66667%}.calculator .col-sm-push-9{left:75%}.calculator .col-sm-push-10{left:83.33333%}.calculator .col-sm-push-11{left:91.66667%}.calculator .col-sm-push-12{left:100%}.calculator .col-sm-offset-0{margin-left:0}.calculator .col-sm-offset-1{margin-left:8.33333%}.calculator .col-sm-offset-2{margin-left:16.66667%}.calculator .col-sm-offset-3{margin-left:25%}.calculator .col-sm-offset-4{margin-left:33.33333%}.calculator .col-sm-offset-5{margin-left:41.66667%}.calculator .col-sm-offset-6{margin-left:50%}.calculator .col-sm-offset-7{margin-left:58.33333%}.calculator .col-sm-offset-8{margin-left:66.66667%}.calculator .col-sm-offset-9{margin-left:75%}.calculator .col-sm-offset-10{margin-left:83.33333%}.calculator .col-sm-offset-11{margin-left:91.66667%}.calculator .col-sm-offset-12{margin-left:100%}}@media (min-width:992px){.calculator .col-md-1,.calculator .col-md-10,.calculator .col-md-11,.calculator .col-md-12,.calculator .col-md-2,.calculator .col-md-3,.calculator .col-md-4,.calculator .col-md-5,.calculator .col-md-6,.calculator .col-md-7,.calculator .col-md-8,.calculator .col-md-9{float:left}.calculator .col-md-1{width:8.33333%}.calculator .col-md-2{width:16.66667%}.calculator .col-md-3{width:25%}.calculator .col-md-4{width:33.33333%}.calculator .col-md-5{width:41.66667%}.calculator .col-md-6{width:50%}.calculator .col-md-7{width:58.33333%}.calculator .col-md-8{width:66.66667%}.calculator .col-md-9{width:75%}.calculator .col-md-10{width:83.33333%}.calculator .col-md-11{width:91.66667%}.calculator .col-md-12{width:100%}.calculator .col-md-pull-0{right:auto}.calculator .col-md-pull-1{right:8.33333%}.calculator .col-md-pull-2{right:16.66667%}.calculator .col-md-pull-3{right:25%}.calculator .col-md-pull-4{right:33.33333%}.calculator .col-md-pull-5{right:41.66667%}.calculator .col-md-pull-6{right:50%}.calculator .col-md-pull-7{right:58.33333%}.calculator .col-md-pull-8{right:66.66667%}.calculator .col-md-pull-9{right:75%}.calculator .col-md-pull-10{right:83.33333%}.calculator .col-md-pull-11{right:91.66667%}.calculator .col-md-pull-12{right:100%}.calculator .col-md-push-0{left:auto}.calculator .col-md-push-1{left:8.33333%}.calculator .col-md-push-2{left:16.66667%}.calculator .col-md-push-3{left:25%}.calculator .col-md-push-4{left:33.33333%}.calculator .col-md-push-5{left:41.66667%}.calculator .col-md-push-6{left:50%}.calculator .col-md-push-7{left:58.33333%}.calculator .col-md-push-8{left:66.66667%}.calculator .col-md-push-9{left:75%}.calculator .col-md-push-10{left:83.33333%}.calculator .col-md-push-11{left:91.66667%}.calculator .col-md-push-12{left:100%}.calculator .col-md-offset-0{margin-left:0}.calculator .col-md-offset-1{margin-left:8.33333%}.calculator .col-md-offset-2{margin-left:16.66667%}.calculator .col-md-offset-3{margin-left:25%}.calculator .col-md-offset-4{margin-left:33.33333%}.calculator .col-md-offset-5{margin-left:41.66667%}.calculator .col-md-offset-6{margin-left:50%}.calculator .col-md-offset-7{margin-left:58.33333%}.calculator .col-md-offset-8{margin-left:66.66667%}.calculator .col-md-offset-9{margin-left:75%}.calculator .col-md-offset-10{margin-left:83.33333%}.calculator .col-md-offset-11{margin-left:91.66667%}.calculator .col-md-offset-12{margin-left:100%}}@media (min-width:1200px){.calculator .col-lg-1,.calculator .col-lg-10,.calculator .col-lg-11,.calculator .col-lg-12,.calculator .col-lg-2,.calculator .col-lg-3,.calculator .col-lg-4,.calculator .col-lg-5,.calculator .col-lg-6,.calculator .col-lg-7,.calculator .col-lg-8,.calculator .col-lg-9{float:left}.calculator .col-lg-1{width:8.33333%}.calculator .col-lg-2{width:16.66667%}.calculator .col-lg-3{width:25%}.calculator .col-lg-4{width:33.33333%}.calculator .col-lg-5{width:41.66667%}.calculator .col-lg-6{width:50%}.calculator .col-lg-7{width:58.33333%}.calculator .col-lg-8{width:66.66667%}.calculator .col-lg-9{width:75%}.calculator .col-lg-10{width:83.33333%}.calculator .col-lg-11{width:91.66667%}.calculator .col-lg-12{width:100%}.calculator .col-lg-pull-0{right:auto}.calculator .col-lg-pull-1{right:8.33333%}.calculator .col-lg-pull-2{right:16.66667%}.calculator .col-lg-pull-3{right:25%}.calculator .col-lg-pull-4{right:33.33333%}.calculator .col-lg-pull-5{right:41.66667%}.calculator .col-lg-pull-6{right:50%}.calculator .col-lg-pull-7{right:58.33333%}.calculator .col-lg-pull-8{right:66.66667%}.calculator .col-lg-pull-9{right:75%}.calculator .col-lg-pull-10{right:83.33333%}.calculator .col-lg-pull-11{right:91.66667%}.calculator .col-lg-pull-12{right:100%}.calculator .col-lg-push-0{left:auto}.calculator .col-lg-push-1{left:8.33333%}.calculator .col-lg-push-2{left:16.66667%}.calculator .col-lg-push-3{left:25%}.calculator .col-lg-push-4{left:33.33333%}.calculator .col-lg-push-5{left:41.66667%}.calculator .col-lg-push-6{left:50%}.calculator .col-lg-push-7{left:58.33333%}.calculator .col-lg-push-8{left:66.66667%}.calculator .col-lg-push-9{left:75%}.calculator .col-lg-push-10{left:83.33333%}.calculator .col-lg-push-11{left:91.66667%}.calculator .col-lg-push-12{left:100%}.calculator .col-lg-offset-0{margin-left:0}.calculator .col-lg-offset-1{margin-left:8.33333%}.calculator .col-lg-offset-2{margin-left:16.66667%}.calculator .col-lg-offset-3{margin-left:25%}.calculator .col-lg-offset-4{margin-left:33.33333%}.calculator .col-lg-offset-5{margin-left:41.66667%}.calculator .col-lg-offset-6{margin-left:50%}.calculator .col-lg-offset-7{margin-left:58.33333%}.calculator .col-lg-offset-8{margin-left:66.66667%}.calculator .col-lg-offset-9{margin-left:75%}.calculator .col-lg-offset-10{margin-left:83.33333%}.calculator .col-lg-offset-11{margin-left:91.66667%}.calculator .col-lg-offset-12{margin-left:100%}}.calculator fieldset{padding:0;margin:0;border:0;min-width:0}.calculator legend{display:block;width:100%;padding:0;margin-bottom:20px;font-size:21px;line-height:inherit;color:#333;border:0;border-bottom:1px solid #e5e5e5}.calculator label{display:inline-block;max-width:100%;margin-bottom:5px;font-weight:700}.calculator input[type=search]{box-sizing:border-box}.calculator input[type=checkbox],.calculator input[type=radio]{margin:4px 0 0;line-height:normal}.calculator input[type=file]{display:block}.calculator input[type=range]{display:block;width:100%}.calculator select[multiple],.calculator select[size]{height:auto}.calculator input[type=checkbox]:focus,.calculator input[type=file]:focus,.calculator input[type=radio]:focus{outline:5px auto -webkit-focus-ring-color;outline-offset:-2px}.calculator output{display:block;padding-top:7px;font-size:14px;line-height:1.42857;color:#555}.calculator .form-control{display:block;width:100%;height:34px;padding:6px 12px;font-size:14px;line-height:1.42857;color:#555;background-color:#fff;background-image:none;border:1px solid #ccc;border-radius:4px;box-shadow:inset 0 1px 1px rgba(0,0,0,.075);transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s}.calculator .form-control:focus{border-color:#66afe9;outline:0;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)}.calculator .form-control::-moz-placeholder{color:#999;opacity:1}.calculator .form-control:-ms-input-placeholder{color:#999}.calculator .form-control::-webkit-input-placeholder{color:#999}.calculator .form-control::-ms-expand{border:0;background-color:transparent}.calculator .form-control[disabled],.calculator .form-control[readonly],fieldset[disabled] .calculator .form-control{background-color:#eee;opacity:1}.calculator .form-control[disabled],fieldset[disabled] .calculator .form-control{cursor:not-allowed}.calculator textarea.form-control{height:auto}.calculator input[type=search]{-webkit-appearance:none}@media screen and (-webkit-min-device-pixel-ratio:0){.calculator input[type=date].form-control,.calculator input[type=datetime-local].form-control,.calculator input[type=month].form-control,.calculator input[type=time].form-control{line-height:34px}.calculator input[type=date].input-sm,.calculator input[type=datetime-local].input-sm,.calculator input[type=month].input-sm,.calculator input[type=time].input-sm,.input-group-sm .calculator input[type=date],.input-group-sm .calculator input[type=datetime-local],.input-group-sm .calculator input[type=month],.input-group-sm .calculator input[type=time]{line-height:30px}.calculator input[type=date].input-lg,.calculator input[type=datetime-local].input-lg,.calculator input[type=month].input-lg,.calculator input[type=time].input-lg,.input-group-lg .calculator input[type=date],.input-group-lg .calculator input[type=datetime-local],.input-group-lg .calculator input[type=month],.input-group-lg .calculator input[type=time]{line-height:46px}}.calculator .form-group{margin-bottom:15px}.calculator .checkbox,.calculator .radio{position:relative;display:block;margin-top:10px;margin-bottom:10px}.calculator .checkbox label,.calculator .radio label{min-height:20px;padding-left:20px;margin-bottom:0;font-weight:400;cursor:pointer}.calculator .checkbox input[type=checkbox],.calculator .checkbox-inline input[type=checkbox],.calculator .radio input[type=radio],.calculator .radio-inline input[type=radio]{position:absolute;margin-left:-20px}.calculator .checkbox+.checkbox,.calculator .radio+.radio{margin-top:-5px}.calculator .checkbox-inline,.calculator .radio-inline{position:relative;display:inline-block;padding-left:20px;margin-bottom:0;vertical-align:middle;font-weight:400;cursor:pointer}.calculator .checkbox-inline+.checkbox-inline,.calculator .radio-inline+.radio-inline{margin-top:0;margin-left:10px}.calculator input[type=checkbox].disabled,.calculator input[type=checkbox][disabled],.calculator input[type=radio].disabled,.calculator input[type=radio][disabled],fieldset[disabled] .calculator input[type=checkbox],fieldset[disabled] .calculator input[type=radio]{cursor:not-allowed}.calculator .checkbox-inline.disabled,.calculator .radio-inline.disabled,fieldset[disabled] .calculator .checkbox-inline,fieldset[disabled] .calculator .radio-inline{cursor:not-allowed}.calculator .checkbox.disabled label,.calculator .radio.disabled label,fieldset[disabled] .calculator .checkbox label,fieldset[disabled] .calculator .radio label{cursor:not-allowed}.calculator .form-control-static{padding-top:7px;padding-bottom:7px;margin-bottom:0;min-height:34px}.calculator .form-control-static.input-lg,.calculator .form-control-static.input-sm{padding-left:0;padding-right:0}.calculator .input-sm{height:30px;padding:5px 10px;font-size:12px;line-height:1.5;border-radius:3px}.calculator select.input-sm{height:30px;line-height:30px}.calculator select[multiple].input-sm,.calculator textarea.input-sm{height:auto}.calculator .form-group-sm .form-control{height:30px;padding:5px 10px;font-size:12px;line-height:1.5;border-radius:3px}.calculator .form-group-sm select.form-control{height:30px;line-height:30px}.calculator .form-group-sm select[multiple].form-control,.calculator .form-group-sm textarea.form-control{height:auto}.calculator .form-group-sm .form-control-static{height:30px;min-height:32px;padding:6px 10px;font-size:12px;line-height:1.5}.calculator .input-lg{height:46px;padding:10px 16px;font-size:18px;line-height:1.33333;border-radius:6px}.calculator select.input-lg{height:46px;line-height:46px}.calculator select[multiple].input-lg,.calculator textarea.input-lg{height:auto}.calculator .form-group-lg .form-control{height:46px;padding:10px 16px;font-size:18px;line-height:1.33333;border-radius:6px}.calculator .form-group-lg select.form-control{height:46px;line-height:46px}.calculator .form-group-lg select[multiple].form-control,.calculator .form-group-lg textarea.form-control{height:auto}.calculator .form-group-lg .form-control-static{height:46px;min-height:38px;padding:11px 16px;font-size:18px;line-height:1.33333}.calculator .has-feedback{position:relative}.calculator .has-feedback .form-control{padding-right:42.5px}.calculator .form-control-feedback{position:absolute;top:0;right:0;z-index:2;display:block;width:34px;height:34px;line-height:34px;text-align:center;pointer-events:none}.calculator .form-group-lg .form-control+.form-control-feedback,.calculator .input-group-lg+.form-control-feedback,.calculator .input-lg+.form-control-feedback{width:46px;height:46px;line-height:46px}.calculator .form-group-sm .form-control+.form-control-feedback,.calculator .input-group-sm+.form-control-feedback,.calculator .input-sm+.form-control-feedback{width:30px;height:30px;line-height:30px}.calculator .has-success .checkbox,.calculator .has-success .checkbox-inline,.calculator .has-success .control-label,.calculator .has-success .help-block,.calculator .has-success .radio,.calculator .has-success .radio-inline,.calculator .has-success.checkbox label,.calculator .has-success.checkbox-inline label,.calculator .has-success.radio label,.calculator .has-success.radio-inline label{color:#3c763d}.calculator .has-success .form-control{border-color:#3c763d;box-shadow:inset 0 1px 1px rgba(0,0,0,.075)}.calculator .has-success .form-control:focus{border-color:#2b542c;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #67b168}.calculator .has-success .input-group-addon{color:#3c763d;border-color:#3c763d;background-color:#dff0d8}.calculator .has-success .form-control-feedback{color:#3c763d}.calculator .has-warning .checkbox,.calculator .has-warning .checkbox-inline,.calculator .has-warning .control-label,.calculator .has-warning .help-block,.calculator .has-warning .radio,.calculator .has-warning .radio-inline,.calculator .has-warning.checkbox label,.calculator .has-warning.checkbox-inline label,.calculator .has-warning.radio label,.calculator .has-warning.radio-inline label{color:#8a6d3b}.calculator .has-warning .form-control{border-color:#8a6d3b;box-shadow:inset 0 1px 1px rgba(0,0,0,.075)}.calculator .has-warning .form-control:focus{border-color:#66512c;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #c0a16b}.calculator .has-warning .input-group-addon{color:#8a6d3b;border-color:#8a6d3b;background-color:#fcf8e3}.calculator .has-warning .form-control-feedback{color:#8a6d3b}.calculator .has-error .checkbox,.calculator .has-error .checkbox-inline,.calculator .has-error .control-label,.calculator .has-error .help-block,.calculator .has-error .radio,.calculator .has-error .radio-inline,.calculator .has-error.checkbox label,.calculator .has-error.checkbox-inline label,.calculator .has-error.radio label,.calculator .has-error.radio-inline label{color:#a94442}.calculator .has-error .form-control{border-color:#a94442;box-shadow:inset 0 1px 1px rgba(0,0,0,.075)}.calculator .has-error .form-control:focus{border-color:#843534;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #ce8483}.calculator .has-error .input-group-addon{color:#a94442;border-color:#a94442;background-color:#f2dede}.calculator .has-error .form-control-feedback{color:#a94442}.calculator .has-feedback label~.form-control-feedback{top:25px}.calculator .has-feedback label.sr-only~.form-control-feedback{top:0}.calculator .help-block{display:block;margin-top:5px;margin-bottom:10px;color:#737373}@media (min-width:768px){.calculator .form-inline .form-group{display:inline-block;margin-bottom:0;vertical-align:middle}.calculator .form-inline .form-control{display:inline-block;width:auto;vertical-align:middle}.calculator .form-inline .form-control-static{display:inline-block}.calculator .form-inline .input-group{display:inline-table;vertical-align:middle}.calculator .form-inline .input-group .form-control,.calculator .form-inline .input-group .input-group-addon,.calculator .form-inline .input-group .input-group-btn{width:auto}.calculator .form-inline .input-group>.form-control{width:100%}.calculator .form-inline .control-label{margin-bottom:0;vertical-align:middle}.calculator .form-inline .checkbox,.calculator .form-inline .radio{display:inline-block;margin-top:0;margin-bottom:0;vertical-align:middle}.calculator .form-inline .checkbox label,.calculator .form-inline .radio label{padding-left:0}.calculator .form-inline .checkbox input[type=checkbox],.calculator .form-inline .radio input[type=radio]{position:relative;margin-left:0}.calculator .form-inline .has-feedback .form-control-feedback{top:0}}.calculator .form-horizontal .checkbox,.calculator .form-horizontal .checkbox-inline,.calculator .form-horizontal .radio,.calculator .form-horizontal .radio-inline{margin-top:0;margin-bottom:0;padding-top:7px}.calculator .form-horizontal .checkbox,.calculator .form-horizontal .radio{min-height:27px}.calculator .form-horizontal .form-group{margin-left:-15px;margin-right:-15px}.calculator .form-horizontal .form-group:after,.calculator .form-horizontal .form-group:before{content:" ";display:table}.calculator .form-horizontal .form-group:after{clear:both}@media (min-width:768px){.calculator .form-horizontal .control-label{text-align:right;margin-bottom:0;padding-top:7px}}.calculator .form-horizontal .has-feedback .form-control-feedback{right:15px}@media (min-width:768px){.calculator .form-horizontal .form-group-lg .control-label{padding-top:11px;font-size:18px}}@media (min-width:768px){.calculator .form-horizontal .form-group-sm .control-label{padding-top:6px;font-size:12px}}.calculator .calculator-wrapper{display:inline-block;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:18px;color:#1d1d1b;text-align:left;background-color:#f1f1f1;padding:15px;max-width:300px}.calculator .calculator-wrapper .nowrap{white-space:nowrap}.calculator .calculator-wrapper .calculator-title{font-size:22px;font-weight:700;line-height:1;letter-spacing:0;color:#2d2926;text-transform:uppercase;margin-bottom:11px}.calculator .calculator-wrapper .finance-amount{margin-left:-15px;margin-right:-15px;margin:0 0 15px;padding-bottom:15px;border-bottom:1px solid #dbdbdb}.calculator .calculator-wrapper .finance-amount:after,.calculator .calculator-wrapper .finance-amount:before{content:" ";display:table}.calculator .calculator-wrapper .finance-amount:after{clear:both}.calculator .calculator-wrapper .finance-amount .finance-amount-label{position:relative;float:left;width:50%;min-height:1px;padding-left:15px;padding-right:15px;font-size:13px;line-height:16px;color:#2d2926;padding:0;margin:0}.calculator .calculator-wrapper .finance-amount .finance-amount-value{white-space:nowrap;position:relative;float:left;width:50%;min-height:1px;padding-left:15px;padding-right:15px;text-align:right}.calculator .calculator-wrapper .finance-amount .finance-amount-value .unit,.calculator .calculator-wrapper .finance-amount .finance-amount-value input,.calculator .calculator-wrapper .finance-amount .finance-amount-value input+.autosize-helper{font-size:16px;font-weight:700;line-height:1;color:#2d2926;padding:0;margin:0}.calculator .calculator-wrapper .finance-amount .finance-amount-value input{width:calc(100% - 1em);text-align:center;margin-top:-3px;border:1px solid #ddd;background-color:#fff}.calculator .calculator-wrapper .finance-amount .finance-amount-value input.invalid{border-color:red}.calculator .calculator-wrapper .finance-amount .finance-amount-value input:-moz-read-only{border:none;background-color:transparent}.calculator .calculator-wrapper .finance-amount .finance-amount-value input:read-only{border:none;background-color:transparent}.calculator .calculator-wrapper .finance-amount .finance-amount-value input:not(:-moz-read-only){padding:2px 6px}.calculator .calculator-wrapper .finance-amount .finance-amount-value input:not(:read-only){padding:2px 6px}.calculator .calculator-wrapper .duration{margin-bottom:15px}.calculator .calculator-wrapper .duration .duration-label{font-size:14px;font-weight:700;line-height:1;letter-spacing:0;color:#2d2926;text-transform:uppercase;margin-bottom:11px}.calculator .calculator-wrapper .duration .duration-value{display:flex}.calculator .calculator-wrapper .duration .duration-value button{font-size:24px;font-weight:700;line-height:1;flex-grow:1;width:40px;height:40px;padding:0;margin:3px;vertical-align:bottom;border:2px solid transparent;outline:0}.calculator .calculator-wrapper .duration .duration-value button.next-month,.calculator .calculator-wrapper .duration .duration-value button.prev-month{background-color:#91bc23}.calculator .calculator-wrapper .duration .duration-value button.next-month:disabled,.calculator .calculator-wrapper .duration .duration-value button.prev-month:disabled{background-color:#e4e2e1}.calculator .calculator-wrapper .duration .duration-value button.month{text-align:center;color:#2d2926;background-color:#fff}.calculator .calculator-wrapper .duration .duration-value button.month.selected{border-color:#91bc23}.calculator .calculator-wrapper .duration .duration-value button .arrow-icon{display:block;width:100%;height:100%;background:url("data:image/gif;base64,R0lGODlhUABQAKIHAC0pJvDw787NzWFeXI2LibOysT05Nv///yH5BAEAAAcALAAAAABQAFAAAAPSeLrc/jDKSau9OOvNu/9gKI5kaZ5oqq5s675wLM90bd94ru987//AoHBILBqPHwIBSQkQAABCgAlxQqGDKZURGFyhhuxW0f1+xdSy+aw9BgzrtaFNFMCvhLvheTUIinZfS3oHfGB/QoF4CoSFZog/BWYFC40Hkl+UPgKTDJaXjz98fg2fB5xQS0B5kJVgDnaqQXSuAAYPtEemY7W3vA67v8G8w2PFW8dUyUzLSM26r7+l0dK91Z7U18/X3N3e3+Dh4uPk5ebn6Onq6+zt7u/w8e4JADs=");background-position:center center;background-repeat:no-repeat;background-size:40px 40px}.calculator .calculator-wrapper .duration .duration-value button .arrow-icon.left{-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}.calculator .calculator-wrapper .duration .duration-value button .arrow-icon.right{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.calculator .calculator-wrapper .duration-slider{position:relative;width:100%;overflow:hidden}.calculator .calculator-wrapper .duration-slider .duration-slider-wrapper{position:relative;white-space:nowrap;left:0;transition:left .4s ease-in-out}.calculator .calculator-wrapper .duration-slider .duration-slider-wrapper .duration{position:relative;display:inline-block;width:100%;left:0}.calculator .calculator-wrapper .more-months-switch{margin-left:-15px;margin-right:-15px;background-color:#fff;padding:10px 15px;margin-bottom:15px;opacity:0;display:none}.calculator .calculator-wrapper .more-months-switch:after,.calculator .calculator-wrapper .more-months-switch:before{content:" ";display:table}.calculator .calculator-wrapper .more-months-switch:after{clear:both}.calculator .calculator-wrapper .more-months-switch .more-month-label{position:relative;float:left;width:66.66667%;min-height:1px;padding-left:15px;padding-right:15px;font-size:13px;line-height:1;color:#2d2926;padding:0;margin:0}.calculator .calculator-wrapper .more-months-switch .more-month-button-wrapper{position:relative;float:left;width:33.33333%;min-height:1px;padding-left:15px;padding-right:15px;text-align:right;padding:0;margin:0}.calculator .calculator-wrapper .more-months-switch .more-month-button-wrapper .button{position:relative;display:inline-block;height:23px;width:56px;cursor:pointer;background-color:#fff;border:1px solid #3fb295;border-radius:40px}.calculator .calculator-wrapper .more-months-switch .more-month-button-wrapper .button:before{position:absolute;top:2px;left:2.3px;content:"";height:17px;width:17px;background-color:#3fb295;border-radius:50%;transition:.4s}.calculator .calculator-wrapper .more-months-switch .more-month-button-wrapper .button.on{background-color:#3fb295}.calculator .calculator-wrapper .more-months-switch .more-month-button-wrapper .button.on:before{left:inherit;right:2.3px;background-color:#fff}.calculator .calculator-wrapper .more-months-switch .more-month-button-wrapper .button.on .button-label{display:none}.calculator .calculator-wrapper .more-months-switch .more-month-button-wrapper .button.on .button-label.on{display:block}.calculator .calculator-wrapper .more-months-switch .more-month-button-wrapper .button .button-label{color:#3fb295;padding-top:1px;padding-left:22px;padding-right:4px}.calculator .calculator-wrapper .more-months-switch .more-month-button-wrapper .button .button-label.on{display:none;text-align:left;color:#fff;padding-left:4px;padding-right:22px}.calculator .calculator-wrapper .financial-box{background-color:#fff;padding:15px;margin-left:-15px;margin-right:-15px;border-right:2px solid #f2f2f2;border-left:2px solid #f2f2f2}.calculator .calculator-wrapper .financial-box .monthly-rate{padding-bottom:15px;margin-bottom:15px;border-bottom:1px solid #dbdbdb}.calculator .calculator-wrapper .financial-box .monthly-rate .monthly-rate-label{text-align:center;width:70%;margin:0 auto}.calculator .calculator-wrapper .financial-box .monthly-rate .monthly-rate-value-wrapper{font-weight:700;text-align:center;padding-top:15px}.calculator .calculator-wrapper .financial-box .monthly-rate .monthly-rate-value-wrapper .unit{font-size:20px;line-height:1;padding-right:10px}.calculator .calculator-wrapper .financial-box .monthly-rate .monthly-rate-value-wrapper .monthly-rate-value{font-size:40px;line-height:1}.calculator .calculator-wrapper .financial-box .financial-box-detail{margin-left:-15px;margin-right:-15px;position:relative;color:#2d2926;margin-top:15px;margin-bottom:15px}.calculator .calculator-wrapper .financial-box .financial-box-detail:after,.calculator .calculator-wrapper .financial-box .financial-box-detail:before{content:" ";display:table}.calculator .calculator-wrapper .financial-box .financial-box-detail:after{clear:both}.calculator .calculator-wrapper .financial-box .financial-box-detail .detail-label{font-size:13px;line-height:1;position:relative;float:left;width:70%;min-height:1px;padding-left:15px;padding-right:15px}.calculator .calculator-wrapper .financial-box .financial-box-detail .detail-value{font-weight:700;font-size:16px;line-height:1;text-align:right;min-height:1px;padding-left:15px;padding-right:15px;position:absolute;width:auto;right:0}.calculator .legal-text{padding-left:15px;padding-right:15px;font-family:Arial,Helvetica,sans-serif;list-style-type:decimal}.calculator .legal-text > div{margin-top:10px;font-size:11px;line-height:15px;list-style-type:none}.calculator input+.autosize-helper{display:none;font:inherit;white-space:pre;margin:0;padding:0}.ubernehmen-button{float:right;margin-right:10%;margin-top:3%}.btn-change-value{font-size:13px!important;font-weight:700!important;line-height:1!important;width:90px;height:24px;padding:inherit;margin-top:30px;color:#fff!important;background-color:#00965e;border:1px solid #00965e;border-radius:2px;transition:background-color .2s ease-in-out}.btn-change-value:hover{color:#00965e!important;background-color:#fff}.show-on-more-month{display:none}</style>',
      "<script>",
      "	",
      "	//	value: {",
      "	//		product_amount",
      "	//		period_min",
      "	//		period_step",
      "	//		period_zero_interest",
      "	//		period					(array)",
      "	//		rate					(array)",
      "	//		selected_index",
      "	//		legal_text",
      "	// }",
      '	// insert "value" into the brackets of the finance_calculator creation call',
      "	// to change the data during runtime call:",
      "	//						finance_calculator.update( value );",
      "	",
      "	var finance_calculator = (function( value ){",
      "		",
      "		if( window.finance_calculator ) {",
      "			",
      "			window.finance_calculator.update( value );",
      "			",
      "			return( window.finance_calculator );",
      "		}",
      "		",
      "		",
      "		var fc = {};",
      "		",
      "		fc.properties = {};",
      "		",
      "		var valid_properties	= [",
      '				"product_amount",',
      '				"period_min",',
      '				"period_step",',
      '				"period_zero_interest",',
      '				"period",',
      '				"rate",',
      '				"selected_index",',
      '				"legal_text" ];',
      "		var period_rate_data	= [];",
      '		var default_legal_text	= "' + legal_text + '";',
      "		",
      "		fc._launch_value = value;",
      "",
    ];

    var i = required_functions.length;

    while (i--) {
      code.push(
        "\tfc." +
          required_functions[i] +
          " = " +
          String(
            this[
              required_functions[i]
            ].toString() /* `${this[ required_functions[i] ]}` */,
          ).replace("#output", "#calculator") +
          ";",
      );
    }

    var i = required_private.length;

    while (i--) {
      code.push("\t" + required_private[i].toString());
    }

    code = code.concat([
      '		if (document.readyState === "loading") {',
      '			document.addEventListener("DOMContentLoaded", fc.init());',
      "		} else {",
      "			fc.init()();",
      "		}",
      "		return(fc);",
      "	})(" +
        data_str +
        "); // <- insert data here, to change data during runtime use finance_calculator.update( new_data_object )",
      "</script>",
      "<!-- calculator container -->",
      '<div id="calculator">' + template + table.join("\r\n") + "</div>",
    ]);

    this._container.querySelector("textarea").value =
      '<div class="calculator-box">' + code.join("\r\n") + "</div>";
  };
  ///////////// GENERATOR FUNCTIONS END

  fc.update = function (value) {
    if (!this.active) {
      this._launch_value = value;

      return;
    }

    var i = valid_properties.length;

    while (i--) {
      var item = valid_properties[i];

      if (value[item]) {
        if (item == "legal_text") {
          var legal_container = document.querySelector(
            ".calculator .legal-text",
          );

          legal_container && (legal_container.innerHTML = value[item]);
        } else if (!isNaN(value[item]) || Array.isArray(value[item])) {
          if (Array.isArray(value[item])) {
            var a = value[item],
              len = a.length;

            while (len--) {
              a[len] = sanitize_num(a[len]);
            }

            this.properties[item] = a;
          } else {
            this.properties[item] = sanitize_num(value[item]);
          }
        }
      } else {
        //FALLBACK:

        if (item == "legal_text" && default_legal_text) {
          var legal_container = document.querySelector(
            ".calculator .legal-text",
          );

          legal_container && (legal_container.innerHTML = default_legal_text);
        }
      }
    }

    this.apply_properties();

    this.write_template && this.write_template();

    delete this.properties.product_amount;
  };

  fc.apply_properties = function () {
    var output = this._container;

    if (this.properties.product_amount) {
      output.querySelector(".finance-amount-value input").value =
        this.properties.product_amount;
    } else {
      this.properties.product_amount = sanitize_num(
        output.querySelector(".finance-amount-value input").value,
      );
    }

    this.generate_rate_list();

    output.classList.add("show");
  };

  // private
  function _calcMonthlyRates(
    amount,
    minMonth,
    maxMonth,
    stepMonth,
    zeroMonth,
    rate,
    period,
  ) {
    var index = 0,
      interest = rate[index],
      l = interest / 100 + 1,
      k = 1 / 12,
      j = Math.pow(l, k),
      o =
        Math.floor((Math.pow(1 + interest / 100, k) - 1) * 12 * 100 * 100) /
        100,
      n = 0,
      g = 0;

    var output = [];

    if (
      !isNaN(interest) &&
      interest == interest &&
      amount &&
      !isNaN(amount) &&
      amount > 0
    ) {
      for (var i = minMonth; i <= maxMonth; i += stepMonth) {
        if (i <= zeroMonth) {
          interest = 0;
        } else {
          while (period[index] < i) {
            index++;

            if (isNaN(period[index])) {
              index--;
              break;
            }
          }

          interest = rate[index];
        }

        l = interest / 100 + 1;
        j = Math.pow(l, k);
        o =
          Math.floor((Math.pow(1 + interest / 100, k) - 1) * 12 * 100 * 100) /
          100;

        if (!interest) {
          g = Math.floor((amount / i) * 100) / 100;
          n = amount;
        } else {
          var h = Math.pow(j, i);
          g = Math.floor(((amount * h) / (h - 1)) * (j - 1) * 100) / 100;
          n = (Math.floor(((amount * h) / (h - 1)) * (j - 1) * 100) / 100) * i;
        }

        if (parseFloat(g) >= 9) {
          output.push({
            months: i,
            amount: amount,
            monthlyInstallment: g,
            interestRate: o,
            effInterestRate: interest,
            total: n,
            interestValue: n - amount,
          });
        }
      }
    }

    return output;
  }

  fc.generate_rate_list = function () {
    period_rate_data = [];

    var p = this.properties;

    if (p.period && p.period.length) {
      period_rate_data = _calcMonthlyRates(
        p.product_amount,
        p.period_min,
        p.period[p.period.length - 1],
        p.period_step,
        p.period_zero_interest,
        p.rate,
        p.period,
      );
    }

    this.render_table();

    this.selected_index = isNaN(p.selected_index)
      ? period_rate_data.length - 1
      : Math.min(p.selected_index, p.period.length - 1);
    this.update_selection();
  };

  fc.render_table = function () {
    var table = this._container.querySelector("#value-table");

    var tbody = table.querySelector("tbody");
    tbody && table.removeChild(tbody);

    tbody = document.createElement("tbody");

    var a = period_rate_data;

    for (var i = 0; i < a.length; i++) {
      var data = a[i];

      tbody.appendChild(
        this.make_row([
          formatNumberOutput(data.months, 0),
          formatNumberOutput(data.monthlyInstallment, 2, "", " €"),
          formatNumberOutput(data.interestRate, 2, "", " %", Math.floor),
        ]),
      );
    }

    table.appendChild(tbody);
  };

  fc.make_row = function (value) {
    var row = document.createElement("tr");

    for (var i = 0; i < value.length; i++) {
      var td = document.createElement("td");

      td.innerHTML = "<span>" + value[i] + "</span>";

      row.appendChild(td);
    }

    return row;
  };

  fc.init = function () {
    return function () {
      this.active = true;

      this._container = document.querySelector("#output");

      var button = this._container.querySelector(".prev-month");
      button._direction = -1;
      button.addEventListener("click", this.make_arrow_click());

      button = this._container.querySelector(".next-month");
      button._direction = 1;
      button.addEventListener("click", this.make_arrow_click());

      button = this._container.querySelector("input.btn-change-value");
      button.addEventListener(
        "click",
        function (e) {
          e.preventDefault();
          this.apply_properties();
        }.bind(this),
      );

      this._launch_value && this.update(this._launch_value);

      delete this._launch_value;
    }.bind(this);
  };

  fc.update_selection = function () {
    var selection_container = this._container.querySelector(".duration-value"),
      a,
      i;

    // TOGGLE BUTTONS ON/OFF
    a = selection_container.querySelector(".next-month");

    if (
      !period_rate_data.length ||
      this.selected_index == period_rate_data.length - 1
    ) {
      a.setAttribute("disabled", "1");
    } else {
      a.removeAttribute("disabled");
    }

    a = selection_container.querySelector(".prev-month");

    if (!period_rate_data.length || !this.selected_index) {
      a.setAttribute("disabled", "1");
    } else {
      a.removeAttribute("disabled");
    }

    // EMPTY ALL
    a = selection_container.querySelectorAll(".month");

    a.forEach(function (e) {
      e.classList.remove("selected");
      e.innerHTML = "";
    });

    // SLIDE THROUGH VALUES AND FILL
    if (period_rate_data.length) {
      var start = Math.max(
          0,
          this.selected_index -
            (this.selected_index == period_rate_data.length - 1 ? 2 : 1),
        ),
        end = Math.min(
          period_rate_data.length - 1,
          this.selected_index + (this.selected_index ? 1 : 2),
        );

      i = 1 + end - start;

      while (i--) {
        a[i].innerHTML = period_rate_data[end].months;
        end == this.selected_index && a[i].classList.add("selected");
        end--;
      }
    }

    var current_data = period_rate_data[this.selected_index] || {};

    a = this._container.querySelector(
      ".financial-box .monthly-rate .monthly-rate-value",
    );
    a && (a.innerHTML = formatNumberOutput(current_data.monthlyInstallment));

    a = this._container.querySelector(".financial-box .interest-rate .months");
    a && (a.innerHTML = formatNumberOutput(current_data.months));

    a = this._container.querySelector(
      ".financial-box .interest-rate .interest-rate-value",
    );
    a &&
      (a.innerHTML = formatNumberOutput(
        current_data.interestRate,
        2,
        "",
        " %",
        Math.floor,
      ));

    a = this._container.querySelector(
      ".financial-box .interest-value .interest-value-value",
    );
    a &&
      (a.innerHTML = formatNumberOutput(
        current_data.interestValue,
        2,
        "",
        " €",
      ));

    a = this._container.querySelector(
      ".financial-box .eff-interest-rate .eff-interest-rate-value",
    );
    a &&
      (a.innerHTML = formatNumberOutput(
        current_data.effInterestRate,
        2,
        "",
        " %",
        Math.floor,
      ));

    a = this._container.querySelector(".financial-box .amount .amount-value");
    a && (a.innerHTML = formatNumberOutput(current_data.amount, 2, "", " €"));

    a = this._container.querySelector(".financial-box .total .total-value");
    a && (a.innerHTML = formatNumberOutput(current_data.total, 2, "", " €"));

    update_legal(this, current_data);
  };

  fc.make_arrow_click = function () {
    return function (e) {
      var dir = e.currentTarget._direction;

      this.selected_index = Math.max(
        0,
        Math.min(period_rate_data.length, this.selected_index + dir),
      );

      this.update_selection();
    }.bind(this);
  };

  function update_legal(target, data) {
    var a = target._container.querySelector(".campaign-interest-rate");
    a &&
      (a.innerHTML = formatNumberOutput(
        data.interestRate,
        2,
        "",
        " %",
        Math.floor,
      ));

    a = target._container.querySelector(".campaign-duration");
    a && (a.innerHTML = formatNumberOutput(data.months, 0));
  }

  // TOOLS
  function sanitize_num(n) {
    if (!n) {
      n = 0;
    } else {
      n = String(n).replaceAll(",", ".");
    }

    n = parseFloat(n);

    return n != n ? 0 : n;
  }

  function formatNumberOutput(number, digits, prefix, postfix, roundFn) {
    isNaN(number) && (number = 0);

    if (typeof digits === "undefined" || digits === null) {
      digits = 2;
    }
    if (typeof prefix === "undefined" || prefix === null) {
      prefix = "";
    }
    if (typeof postfix === "undefined" || postfix === null) {
      postfix = "";
    }

    number = precisionRound(number, digits, roundFn);
    number = number.toLocaleString("de-DE", {
      useGrouping: false,
      minimumFractionDigits: digits,
    });

    return "" + prefix + number + postfix;
  }

  function precisionRound(number, precision, fn) {
    if (typeof fn !== "function") {
      fn = Math.round;
    }
    var factor = Math.pow(10, precision);
    return fn(number * factor) / factor;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fc.init());
  } else {
    fc.init()();
  }

  return fc;
})();
