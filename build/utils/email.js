"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPaymentSuccess = exports.sendOrderConfirmation = exports.sendRegistrationMail = exports.sendPasswordResetEmail = void 0;
const dotenv = __importStar(require("dotenv"));
const form_data_1 = __importDefault(require("form-data"));
const mailgun_js_1 = __importDefault(require("mailgun.js"));
dotenv.config();
const mailgun = new mailgun_js_1.default(form_data_1.default);
const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY || "",
});
const sendPasswordResetEmail = async (to, resetLink) => {
    return await mg.messages
        .create("mail.linkavet.com", {
        from: "Linkavet <infor@mail.linkavet.com>",
        to: [`${to}`],
        subject: "Password Reset",
        text: "Password Reset Request!",
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
      <head>
      <title></title>
      <meta charset="UTF-8" />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <!--[if !mso]><!-->
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <!--<![endif]-->
      <meta name="x-apple-disable-message-reformatting" content="" />
      <meta content="target-densitydpi=device-dpi" name="viewport" />
      <meta content="true" name="HandheldFriendly" />
      <meta content="width=device-width" name="viewport" />
      <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no" />
      <style type="text/css">
      table {
      border-collapse: separate;
      table-layout: fixed;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt
      }
      table td {
      border-collapse: collapse
      }
      .ExternalClass {
      width: 100%
      }
      .ExternalClass,
      .ExternalClass p,
      .ExternalClass span,
      .ExternalClass font,
      .ExternalClass td,
      .ExternalClass div {
      line-height: 100%
      }
      body, a, li, p, h1, h2, h3 {
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
      }
      html {
      -webkit-text-size-adjust: none !important
      }
      body, #innerTable {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale
      }
      #innerTable img+div {
      display: none;
      display: none !important
      }
      img {
      Margin: 0;
      padding: 0;
      -ms-interpolation-mode: bicubic
      }
      h1, h2, h3, p, a {
      line-height: 1;
      overflow-wrap: normal;
      white-space: normal;
      word-break: break-word
      }
      a {
      text-decoration: none
      }
      h1, h2, h3, p {
      min-width: 100%!important;
      width: 100%!important;
      max-width: 100%!important;
      display: inline-block!important;
      border: 0;
      padding: 0;
      margin: 0
      }
      a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important
      }
      a[href^="mailto"],
      a[href^="tel"],
      a[href^="sms"] {
      color: inherit;
      text-decoration: none
      }
      img,p{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h1{margin:0;Margin:0;font-family:Roboto,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:34px;font-weight:400;font-style:normal;font-size:28px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h2{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:400;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:400;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}
      </style>
      <style type="text/css">
      @media (min-width: 481px) {
      .hd { display: none!important }
      }
      </style>
      <style type="text/css">
      @media (max-width: 480px) {
      .hm { display: none!important }
      }
      </style>
      <style type="text/css">
      [style*="Fira Sans"] {font-family: 'Fira Sans', BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif !important;}
      @media only screen and (min-width: 481px) {img,p{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h1{margin:0;Margin:0;font-family:Roboto,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:34px;font-weight:400;font-style:normal;font-size:28px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h2{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:400;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:400;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.t16,.t55{max-width:600px!important}}
      </style>
      <style type="text/css" media="screen and (min-width:481px)">.moz-text-html img,.moz-text-html p{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html h1{margin:0;Margin:0;font-family:Roboto,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:34px;font-weight:400;font-style:normal;font-size:28px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html h2{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:400;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:400;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html .t16,.moz-text-html .t55{max-width:600px!important}</style>
      <!--[if !mso]><!-->
      <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500;600;700&amp;display=swap" rel="stylesheet" type="text/css" />
      <!--<![endif]-->
      <!--[if mso]>
      <style type="text/css">
      img,p{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h1{margin:0;Margin:0;font-family:Roboto,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:34px;font-weight:400;font-style:normal;font-size:28px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h2{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:400;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:400;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}div.t16{max-width:600px !important}td.t21{width:600px !important}div.t55{max-width:600px !important}td.t60{width:600px !important}
      </style>
      <![endif]-->
      <!--[if mso]>
      <xml>
      <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
      </xml>
      <![endif]-->
      </head>
      <body class="t0" style="min-width:100%;Margin:0px;padding:0px;background-color:#F0F0F0;"><div class="t1" style="background-color:#F0F0F0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td class="t2" style="font-size:0;line-height:0;mso-line-height-rule:exactly;background-color:#F0F0F0;" valign="top" align="center">
      <!--[if mso]>
      <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">
      <v:fill color="#F0F0F0"/>
      </v:background>
      <![endif]-->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" id="innerTable"><tr><td>
      <table class="t44" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
      <!--[if !mso]><!--><td class="t45" style="background-color:#FFFFFF;">
      <!--<![endif]-->
      <!--[if mso]><td class="t45" style="background-color:#FFFFFF;"><![endif]-->
      <div class="t51" style="display:inline-table;width:100%;text-align:center;vertical-align:top;">
      <!--[if mso]>
      <table role="presentation" cellpadding="0" cellspacing="0" align="center" valign="top" width="600"><tr><td width="600" valign="top"><![endif]-->
      <div class="t55" style="display:inline-table;text-align:initial;vertical-align:inherit;width:100%;max-width:480px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t57"><tr>
      <td class="t58"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td><div class="t103" style="mso-line-height-rule:exactly;mso-line-height-alt:125px;line-height:125px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
      <table class="t105" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
      <!--[if !mso]><!--><td class="t106" style="width:150px;">
      <!--<![endif]-->
      <!--[if mso]><td class="t106" style="width:150px;"><![endif]-->
      <div style="font-size:0px;"><img class="t112" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="150" height="99.296875" alt="" src="https://5b9544a2-8ffd-4648-b1c2-f33a2cdf5e02.b-cdn.net/e/83877be9-d348-4f60-bb55-1344af1b54b2/71f9efd5-7da0-4bcb-8d2a-91b30cc30a29.png"/></div></td>
      </tr></table>
      </td></tr><tr><td><div class="t93" style="mso-line-height-rule:exactly;mso-line-height-alt:55px;line-height:55px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
      <table class="t95" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
      <!--[if !mso]><!--><td class="t96" style="width:315px;">
      <!--<![endif]-->
      <!--[if mso]><td class="t96" style="width:315px;"><![endif]-->
      <h1 class="t102" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Fira Sans';line-height:52px;font-weight:700;font-style:normal;font-size:48px;text-decoration:none;text-transform:none;direction:ltr;color:#013625;text-align:center;mso-line-height-rule:exactly;mso-text-raise:1px;">Forgot your password?</h1></td>
      </tr></table>
      </td></tr><tr><td><div class="t94" style="mso-line-height-rule:exactly;mso-line-height-alt:30px;line-height:30px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
      <table class="t85" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
      <!--[if !mso]><!--><td class="t86" style="width:382px;">
      <!--<![endif]-->
      <!--[if mso]><td class="t86" style="width:382px;"><![endif]-->
      <p class="t92" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Fira Sans';line-height:30px;font-weight:500;font-style:normal;font-size:17px;text-decoration:none;text-transform:none;direction:ltr;color:#363434;text-align:center;mso-line-height-rule:exactly;mso-text-raise:4px;">To reset your password, click the button below. The link will self-destruct after five days.</p></td>
      </tr></table>
      </td></tr><tr><td><div class="t71" style="mso-line-height-rule:exactly;mso-line-height-alt:40px;line-height:40px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
      <table class="t73" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
      <!--[if !mso]><!--><td class="t74" style="background-color:#08A30A;overflow:hidden;width:308px;text-align:center;line-height:58px;mso-line-height-rule:exactly;mso-text-raise:11px;border-radius:14px 14px 14px 14px;">
      <!--<![endif]-->
      <!--[if mso]><td class="t74" style="background-color:#08A30A;overflow:hidden;width:308px;text-align:center;line-height:58px;mso-line-height-rule:exactly;mso-text-raise:11px;border-radius:14px 14px 14px 14px;"><![endif]-->
      <a class="t80" href="${resetLink}" style="display:block;margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Fira Sans';line-height:58px;font-weight:600;font-style:normal;font-size:21px;text-decoration:none;direction:ltr;color:#FFFFFF;text-align:center;mso-line-height-rule:exactly;mso-text-raise:11px;" target="_blank">Reset your password</a></td>
      </tr></table>
      </td></tr><tr><td><div class="t72" style="mso-line-height-rule:exactly;mso-line-height-alt:60px;line-height:60px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
      <table class="t63" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
      <!--[if !mso]><!--><td class="t64" style="width:350px;">
      <!--<![endif]-->
      <!--[if mso]><td class="t64" style="width:350px;"><![endif]-->
      <p class="t70" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Fira Sans';line-height:25px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;direction:ltr;color:#BBBBBB;text-align:center;mso-line-height-rule:exactly;mso-text-raise:3px;">If you do not want to change your password or didn&#39;t request a reset, you can ignore and delete this email.</p></td>
      </tr></table>
      </td></tr><tr><td><div class="t62" style="mso-line-height-rule:exactly;mso-line-height-alt:125px;line-height:125px;font-size:1px;display:block;">&nbsp;</div></td></tr></table></td>
      </tr></table>
      </div>
      <!--[if mso]>
      </td>
      </tr></table>
      <![endif]-->
      </div></td>
      </tr></table>
      </td></tr><tr><td><div class="t12" style="display:inline-table;width:100%;text-align:center;vertical-align:top;">
      <!--[if mso]>
      <table role="presentation" cellpadding="0" cellspacing="0" align="center" valign="top" width="600"><tr><td width="600" valign="top"><![endif]-->
      <div class="t16" style="display:inline-table;text-align:initial;vertical-align:inherit;width:100%;max-width:480px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t18"><tr>
      <td class="t19" style="padding:40px 0 40px 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td>
      <table class="t34" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
      <!--[if !mso]><!--><td class="t35" style="width:350px;">
      <!--<![endif]-->
      <!--[if mso]><td class="t35" style="width:350px;"><![endif]-->
      <p class="t41" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Fira Sans';line-height:19px;font-weight:400;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;direction:ltr;color:#BBBBBB;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px;">Flash is a webtool that is a free open source JavaScript framework that can be accessed from a browser or mobile device in a Web browser.</p></td>
      </tr></table>
      </td></tr><tr><td><div class="t33" style="mso-line-height-rule:exactly;mso-line-height-alt:20px;line-height:20px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
      <table class="t24" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
      <!--[if !mso]><!--><td class="t25" style="width:350px;">
      <!--<![endif]-->
      <!--[if mso]><td class="t25" style="width:350px;"><![endif]-->
      <p class="t31" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Fira Sans';line-height:19px;font-weight:400;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;direction:ltr;color:#BBBBBB;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px;">Flash Inc. All rights reserved</p></td>
      </tr></table>
      </td></tr></table></td>
      </tr></table>
      </div>
      <!--[if mso]>
      </td>
      </tr></table>
      <![endif]-->
      </div></td></tr></table></td></tr></table></div></body>
      </html>      
      `,
    })
        .then((msg) => {
        console.log("message: ", msg);
    }) // logs response data
        .catch((err) => {
        console.log("error: ", err);
    });
};
exports.sendPasswordResetEmail = sendPasswordResetEmail;
const sendRegistrationMail = async (to, url) => {
    return await mg.messages
        .create("mail.linkavet.com", {
        from: "Linkavet <infor@mail.linkavet.com>",
        to: [`${to}`],
        subject: "Comfirm your email",
        text: "Thank you for signing up!",
        html: `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
 <head>
  <meta charset="UTF-8">
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta content="telephone=no" name="format-detection">
  <title>New Template</title><!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
<xml>
    <o:OfficeDocumentSettings>
    <o:AllowPNG></o:AllowPNG>
    <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
</xml>
<![endif]-->
  <style type="text/css">
#outlook a {
	padding:0;
}
.es-button {
	mso-style-priority:100!important;
	text-decoration:none!important;
}
a[x-apple-data-detectors] {
	color:inherit!important;
	text-decoration:none!important;
	font-size:inherit!important;
	font-family:inherit!important;
	font-weight:inherit!important;
	line-height:inherit!important;
}
.es-desk-hidden {
	display:none;
	float:left;
	overflow:hidden;
	width:0;
	max-height:0;
	line-height:0;
	mso-hide:all;
}
@media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120% } h1 { font-size:36px!important; text-align:left } h2 { font-size:26px!important; text-align:left } h3 { font-size:20px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:36px!important; text-align:left } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important; text-align:left } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important; text-align:left } .es-menu td a { font-size:12px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:20px!important; display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0!important } .es-m-p0r { padding-right:0!important } .es-m-p0l { padding-left:0!important } .es-m-p0t { padding-top:0!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .es-m-p5 { padding:5px!important } .es-m-p5t { padding-top:5px!important } .es-m-p5b { padding-bottom:5px!important } .es-m-p5r { padding-right:5px!important } .es-m-p5l { padding-left:5px!important } .es-m-p10 { padding:10px!important } .es-m-p10t { padding-top:10px!important } .es-m-p10b { padding-bottom:10px!important } .es-m-p10r { padding-right:10px!important } .es-m-p10l { padding-left:10px!important } .es-m-p15 { padding:15px!important } .es-m-p15t { padding-top:15px!important } .es-m-p15b { padding-bottom:15px!important } .es-m-p15r { padding-right:15px!important } .es-m-p15l { padding-left:15px!important } .es-m-p20 { padding:20px!important } .es-m-p20t { padding-top:20px!important } .es-m-p20r { padding-right:20px!important } .es-m-p20l { padding-left:20px!important } .es-m-p25 { padding:25px!important } .es-m-p25t { padding-top:25px!important } .es-m-p25b { padding-bottom:25px!important } .es-m-p25r { padding-right:25px!important } .es-m-p25l { padding-left:25px!important } .es-m-p30 { padding:30px!important } .es-m-p30t { padding-top:30px!important } .es-m-p30b { padding-bottom:30px!important } .es-m-p30r { padding-right:30px!important } .es-m-p30l { padding-left:30px!important } .es-m-p35 { padding:35px!important } .es-m-p35t { padding-top:35px!important } .es-m-p35b { padding-bottom:35px!important } .es-m-p35r { padding-right:35px!important } .es-m-p35l { padding-left:35px!important } .es-m-p40 { padding:40px!important } .es-m-p40t { padding-top:40px!important } .es-m-p40b { padding-bottom:40px!important } .es-m-p40r { padding-right:40px!important } .es-m-p40l { padding-left:40px!important } .es-desk-hidden { display:table-row!important; width:auto!important; overflow:visible!important; max-height:inherit!important } }
@media screen and (max-width:384px) {.mail-message-content { width:414px!important } }
</style>
 </head>
 <body data-new-gr-c-s-loaded="14.1157.0" style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
  <div dir="ltr" class="es-wrapper-color" lang="en" style="background-color:#FAFAFA"><!--[if gte mso 9]>
			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
				<v:fill type="tile" color="#fafafa"></v:fill>
			</v:background>
		<![endif]-->
   <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FAFAFA">
     <tr>
      <td valign="top" style="padding:0;Margin:0">
       <table cellpadding="0" cellspacing="0" class="es-content" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
         <tr>
          <td class="es-info-area" align="center" style="padding:0;Margin:0">
           <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" bgcolor="#FFFFFF" role="none">
             <tr>
              <td align="left" style="padding:20px;Margin:0">
               <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" class="es-infoblock" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px"><a target="_blank" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px">View online version</a></p></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
       <table cellpadding="0" cellspacing="0" class="es-content" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
         <tr>
          <td align="center" style="padding:0;Margin:0">
           <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
             <tr>
              <td align="left" style="Margin:0;padding-left:20px;padding-right:20px;padding-top:30px;padding-bottom:30px">
               <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px;font-size:0px"><img src="https://feugbci.stripocdn.email/content/guids/CABINET_9185e34239e9177191d99579cb4855f795ee7f8e94c70128ec68174a12fd8d8b/images/logo2_copy.jpg" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="100"></td>
                     </tr>
                     <tr>
                      <td align="center" class="es-m-txt-c" style="padding:0;Margin:0"><h1 style="Margin:0;line-height:46px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:46px;font-style:normal;font-weight:bold;color:#333333">Confirm Your Email</h1></td>
                     </tr>
                     <tr>
                      <td align="center" class="es-m-p0r es-m-p0l" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:40px;padding-right:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">You’ve received this message because your email address has been registered with our site. Please click the button below to verify your email address and confirm that you are the owner of this account.</p></td>
                     </tr>
                     <tr>
                      <td align="center" style="padding:0;Margin:0;padding-bottom:5px;padding-top:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">If you did not register with us, please disregard this email.</p></td>
                     </tr>
                     <tr>
                      <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px"><span class="es-button-border" style="border-style:solid;border-color:#2CB543;background:#08a30a;border-width:0px;display:inline-block;border-radius:6px;width:auto"><a href="${url}" class="es-button" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF;font-size:20px;padding:10px 30px 10px 30px;display:inline-block;background:#08a30a;border-radius:6px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:24px;width:auto;text-align:center;mso-padding-alt:0;mso-border-alt:10px solid #08a30a;padding-left:30px;padding-right:30px">CONFIRM YOUR EMAIL</a></span></td>
                     </tr>
                     <tr>
                      <td align="center" class="es-m-p0r es-m-p0l" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:40px;padding-right:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Once confirmed, this email will be uniquely associated with your account.</p></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
       <table cellpadding="0" cellspacing="0" class="es-footer" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
         <tr>
          <td align="center" style="padding:0;Margin:0">
           <table class="es-footer-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:640px" role="none">
             <tr>
              <td align="left" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px">
               <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td align="left" style="padding:0;Margin:0;width:600px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" style="padding:0;Margin:0;padding-top:15px;padding-bottom:15px;font-size:0">
                       <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                         <tr>
                          <td align="center" valign="top" style="padding:0;Margin:0;padding-right:40px"><img title="Facebook" src="https://feugbci.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png" alt="Fb" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td>
                          <td align="center" valign="top" style="padding:0;Margin:0;padding-right:40px"><img title="Twitter" src="https://feugbci.stripocdn.email/content/assets/img/social-icons/logo-black/twitter-logo-black.png" alt="Tw" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td>
                          <td align="center" valign="top" style="padding:0;Margin:0;padding-right:40px"><img title="Instagram" src="https://feugbci.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png" alt="Inst" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td>
                          <td align="center" valign="top" style="padding:0;Margin:0"><img title="Youtube" src="https://feugbci.stripocdn.email/content/assets/img/social-icons/logo-black/youtube-logo-black.png" alt="Yt" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td>
                         </tr>
                       </table></td>
                     </tr>
                     <tr>
                      <td align="center" style="padding:0;Margin:0;padding-bottom:35px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;color:#333333;font-size:12px">Linkavet © 2024, All Rights Reserved.</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;color:#333333;font-size:12px">Sand Pit, Buea, SWR, Cameroon.</p></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
       <table cellpadding="0" cellspacing="0" class="es-content" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
         <tr>
          <td class="es-info-area" align="center" style="padding:0;Margin:0">
           <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" bgcolor="#FFFFFF" role="none">
             <tr>
              <td align="left" style="padding:20px;Margin:0">
               <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" class="es-infoblock" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px"><a target="_blank" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px"></a>No longer want to receive these emails?&nbsp;<a href="" target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px">Unsubscribe</a>.<a target="_blank" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px"></a></p></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table></td>
     </tr>
   </table>
  </div>
 </body>
</html>
      `,
    })
        .then((msg) => console.log("message: ", msg)) // logs response data
        .catch((err) => console.log("error: ", err));
};
exports.sendRegistrationMail = sendRegistrationMail;
const sendOrderConfirmation = async (to, cartItems, user) => {
    return await mg.messages.create("mail.linkavet.com", {
        from: "Linkavet <infor@mail.linkavet.com>",
        to: [`${to}`],
        subject: "Password Reset",
        text: "Password Reset Request!",
        html: `<!--
    * This email was built using Tabular.
    * For more information, visit https://tabular.email
    -->
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
    <head>
    <title></title>
    <meta charset="UTF-8" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!--<![endif]-->
    <meta name="x-apple-disable-message-reformatting" content="" />
    <meta content="target-densitydpi=device-dpi" name="viewport" />
    <meta content="true" name="HandheldFriendly" />
    <meta content="width=device-width" name="viewport" />
    <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no" />
    <style type="text/css">
    table {
    border-collapse: separate;
    table-layout: fixed;
    mso-table-lspace: 0pt;
    mso-table-rspace: 0pt
    }
    table td {
    border-collapse: collapse
    }
    .ExternalClass {
    width: 100%
    }
    .ExternalClass,
    .ExternalClass p,
    .ExternalClass span,
    .ExternalClass font,
    .ExternalClass td,
    .ExternalClass div {
    line-height: 100%
    }
    body, a, li, p, h1, h2, h3 {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    }
    html {
    -webkit-text-size-adjust: none !important
    }
    body, #innerTable {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale
    }
    #innerTable img+div {
    display: none;
    display: none !important
    }
    img {
    Margin: 0;
    padding: 0;
    -ms-interpolation-mode: bicubic
    }
    h1, h2, h3, p, a {
    line-height: 1;
    overflow-wrap: normal;
    white-space: normal;
    word-break: break-word
    }
    a {
    text-decoration: none
    }
    h1, h2, h3, p {
    min-width: 100%!important;
    width: 100%!important;
    max-width: 100%!important;
    display: inline-block!important;
    border: 0;
    padding: 0;
    margin: 0
    }
    a[x-apple-data-detectors] {
    color: inherit !important;
    text-decoration: none !important;
    font-size: inherit !important;
    font-family: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important
    }
    a[href^="mailto"],
    a[href^="tel"],
    a[href^="sms"] {
    color: inherit;
    text-decoration: none
    }
    img,p{margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-.56px;direction:ltr;color:#333;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px}h1{margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:41px;font-weight:800;font-style:normal;font-size:39px;text-decoration:none;text-transform:none;letter-spacing:-1.56px;direction:ltr;color:#191919;text-align:center;mso-line-height-rule:exactly;mso-text-raise:1px}h2{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:400;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:400;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}
    </style>
    <style type="text/css">
    @media (min-width: 481px) {
    .hd { display: none!important }
    }
    </style>
    <style type="text/css">
    @media (max-width: 480px) {
    .hm { display: none!important }
    }
    </style>
    <style type="text/css">
    [style*="Albert Sans"] {font-family: 'Albert Sans', BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif !important;} [style*="Inter Tight"] {font-family: 'Inter Tight', BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif !important;}
    @media only screen and (min-width: 481px) {img,p{margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-.56px;direction:ltr;color:#333;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px}h1{margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:41px;font-weight:800;font-style:normal;font-size:39px;text-decoration:none;text-transform:none;letter-spacing:-1.56px;direction:ltr;color:#191919;text-align:center;mso-line-height-rule:exactly;mso-text-raise:1px}h2{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:400;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:400;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.t3{mso-line-height-alt:45px!important;line-height:45px!important;display:block!important}.t9{padding-left:50px!important;padding-bottom:60px!important;padding-right:50px!important}.t11{padding-left:50px!important;padding-bottom:60px!important;padding-right:50px!important;width:500px!important}.t15{padding-bottom:15px!important;width:600px!important}.t20{padding-bottom:15px!important}.t21{line-height:26px!important;font-size:24px!important;letter-spacing:-1.56px!important}.t28{padding:48px 50px!important}.t30{padding:48px 50px!important;width:500px!important}.t34{width:600px!important}.t44{padding-bottom:14px!important;width:800px!important}.t49{padding-bottom:14px!important}.t104{width:600px!important}.t114{width:760px!important}.t126{width:21.22959%!important}.t134{width:800px!important}.t144{padding-bottom:19px!important}.t146{width:26%!important;max-width:130px!important}.t149{padding-bottom:19px!important}.t154{width:74%!important}.t163,.t173,.t184,.t194{width:600px!important}.t204{width:78.77041%!important;max-width:820px!important}.t213{padding-left:10px!important;width:590px!important}.t218{padding-left:10px!important}.t223{padding-left:10px!important;width:590px!important}.t228{padding-left:10px!important}.t233{width:520px!important}.t241{mso-line-height-alt:0px!important;line-height:0!important;display:none!important}.t243{width:50%!important;max-width:800px!important}.t244{padding-left:inherit!important;padding-right:inherit!important}.t246,.t248{padding-bottom:0!important;padding-right:5px!important}.t252{width:50%!important;max-width:800px!important}.t253{padding-left:inherit!important;padding-right:inherit!important}.t255,.t257{padding-left:5px!important}.t261{padding-left:10px!important;width:590px!important}.t266{padding-left:10px!important}.t276{width:800px!important}.t280,.t290{width:600px!important}.t305{width:800px!important}.t309,.t319,.t329{width:600px!important}.t344{width:800px!important}.t348,.t358,.t368{width:600px!important}.t383{width:800px!important}.t387,.t397{width:600px!important}.t410{padding:40px!important}.t412{padding:40px!important;width:540px!important}.t416{width:800px!important}.t428,.t438{max-width:600px!important}.t446{width:800px!important}.t458,.t468{max-width:600px!important}.t476{width:800px!important}.t488,.t498{max-width:600px!important}.t506{width:800px!important}.t518,.t528{max-width:600px!important}}
    </style>
    <style type="text/css" media="screen and (min-width:481px)">.moz-text-html img,.moz-text-html p{margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-.56px;direction:ltr;color:#333;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html h1{margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:41px;font-weight:800;font-style:normal;font-size:39px;text-decoration:none;text-transform:none;letter-spacing:-1.56px;direction:ltr;color:#191919;text-align:center;mso-line-height-rule:exactly;mso-text-raise:1px}.moz-text-html h2{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:400;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:400;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html .t3{mso-line-height-alt:45px!important;line-height:45px!important;display:block!important}.moz-text-html .t9{padding-left:50px!important;padding-bottom:60px!important;padding-right:50px!important}.moz-text-html .t11{padding-left:50px!important;padding-bottom:60px!important;padding-right:50px!important;width:500px!important}.moz-text-html .t15{padding-bottom:15px!important;width:600px!important}.moz-text-html .t20{padding-bottom:15px!important}.moz-text-html .t21{line-height:26px!important;font-size:24px!important;letter-spacing:-1.56px!important}.moz-text-html .t28{padding:48px 50px!important}.moz-text-html .t30{padding:48px 50px!important;width:500px!important}.moz-text-html .t34{width:600px!important}.moz-text-html .t44{padding-bottom:14px!important;width:800px!important}.moz-text-html .t49{padding-bottom:14px!important}.moz-text-html .t104{width:600px!important}.moz-text-html .t114{width:760px!important}.moz-text-html .t126{width:21.22959%!important}.moz-text-html .t134{width:800px!important}.moz-text-html .t144{padding-bottom:19px!important}.moz-text-html .t146{width:26%!important;max-width:130px!important}.moz-text-html .t149{padding-bottom:19px!important}.moz-text-html .t154{width:74%!important}.moz-text-html .t163,.moz-text-html .t173,.moz-text-html .t184,.moz-text-html .t194{width:600px!important}.moz-text-html .t204{width:78.77041%!important;max-width:820px!important}.moz-text-html .t213{padding-left:10px!important;width:590px!important}.moz-text-html .t218{padding-left:10px!important}.moz-text-html .t223{padding-left:10px!important;width:590px!important}.moz-text-html .t228{padding-left:10px!important}.moz-text-html .t233{width:520px!important}.moz-text-html .t241{mso-line-height-alt:0px!important;line-height:0!important;display:none!important}.moz-text-html .t243{width:50%!important;max-width:800px!important}.moz-text-html .t244{padding-left:inherit!important;padding-right:inherit!important}.moz-text-html .t246,.moz-text-html .t248{padding-bottom:0!important;padding-right:5px!important}.moz-text-html .t252{width:50%!important;max-width:800px!important}.moz-text-html .t253{padding-left:inherit!important;padding-right:inherit!important}.moz-text-html .t255,.moz-text-html .t257{padding-left:5px!important}.moz-text-html .t261{padding-left:10px!important;width:590px!important}.moz-text-html .t266{padding-left:10px!important}.moz-text-html .t276{width:800px!important}.moz-text-html .t280,.moz-text-html .t290{width:600px!important}.moz-text-html .t305{width:800px!important}.moz-text-html .t309,.moz-text-html .t319,.moz-text-html .t329{width:600px!important}.moz-text-html .t344{width:800px!important}.moz-text-html .t348,.moz-text-html .t358,.moz-text-html .t368{width:600px!important}.moz-text-html .t383{width:800px!important}.moz-text-html .t387,.moz-text-html .t397{width:600px!important}.moz-text-html .t410{padding:40px!important}.moz-text-html .t412{padding:40px!important;width:540px!important}.moz-text-html .t416{width:800px!important}.moz-text-html .t428,.moz-text-html .t438{max-width:600px!important}.moz-text-html .t446{width:800px!important}.moz-text-html .t458,.moz-text-html .t468{max-width:600px!important}.moz-text-html .t476{width:800px!important}.moz-text-html .t488,.moz-text-html .t498{max-width:600px!important}.moz-text-html .t506{width:800px!important}.moz-text-html .t518,.moz-text-html .t528{max-width:600px!important}</style>
    <!--[if !mso]><!-->
    <link href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;700;800&amp;family=Inter+Tight:wght@500;700;800&amp;display=swap" rel="stylesheet" type="text/css" />
    <!--<![endif]-->
    <!--[if mso]>
    <style type="text/css">
    img,p{margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-.56px;direction:ltr;color:#333;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px}h1{margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:41px;font-weight:800;font-style:normal;font-size:39px;text-decoration:none;text-transform:none;letter-spacing:-1.56px;direction:ltr;color:#191919;text-align:center;mso-line-height-rule:exactly;mso-text-raise:1px}h2{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:400;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:400;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}div.t3{mso-line-height-alt:45px !important;line-height:45px !important;display:block !important}td.t9{padding-left:50px !important;padding-bottom:60px !important;padding-right:50px !important}td.t11{padding-left:50px !important;padding-bottom:60px !important;padding-right:50px !important;width:600px !important}td.t15{padding-bottom:15px !important;width:600px !important}td.t20{padding-bottom:15px !important}h1.t21{line-height:26px !important;font-size:24px !important;letter-spacing:-1.56px !important}td.t28{padding:48px 50px !important}td.t30{padding:48px 50px !important;width:600px !important}td.t34{width:600px !important}td.t44{padding-bottom:14px !important;width:800px !important}td.t49{padding-bottom:14px !important}td.t104{width:600px !important}td.t114{width:800px !important}div.t126{width:21.22959% !important}td.t134{width:800px !important}td.t144{padding-bottom:19px !important;width:130px !important}div.t146{width:26% !important;max-width:130px !important}td.t149{padding-bottom:19px !important}div.t154{width:74% !important}td.t163,td.t173,td.t184,td.t194{width:600px !important}div.t204{width:78.77041% !important;max-width:820px !important}td.t209{width:800px !important}td.t213{padding-left:10px !important;width:600px !important}td.t218{padding-left:10px !important}td.t223{padding-left:10px !important;width:600px !important}td.t228{padding-left:10px !important}td.t233{width:600px !important}div.t241{mso-line-height-alt:0px !important;line-height:0 !important;display:none !important}div.t243{width:50% !important;max-width:800px !important}div.t244{padding-left:inherit !important;padding-right:inherit !important}td.t246{padding-bottom:0 !important;padding-right:5px !important}td.t248{padding-bottom:0 !important;padding-right:5px !important;width:800px !important}div.t252{width:50% !important;max-width:800px !important}div.t253{padding-left:inherit !important;padding-right:inherit !important}td.t255{padding-left:5px !important}td.t257{padding-left:5px !important;width:800px !important}td.t261{padding-left:10px !important;width:600px !important}td.t266{padding-left:10px !important}td.t276{width:800px !important}td.t280,td.t290{width:600px !important}td.t305{width:800px !important}td.t309,td.t319,td.t329{width:600px !important}td.t344{width:800px !important}td.t348,td.t358,td.t368{width:600px !important}td.t383{width:800px !important}td.t387,td.t397{width:600px !important}td.t410{padding:40px !important}td.t412{padding:40px !important;width:620px !important}td.t416{width:800px !important}td.t426{width:600px !important}div.t428{max-width:600px !important}td.t436{width:600px !important}div.t438{max-width:600px !important}td.t446{width:800px !important}td.t456{width:600px !important}div.t458{max-width:600px !important}td.t466{width:600px !important}div.t468{max-width:600px !important}td.t476{width:800px !important}td.t486{width:600px !important}div.t488{max-width:600px !important}td.t496{width:600px !important}div.t498{max-width:600px !important}td.t506{width:800px !important}td.t516{width:600px !important}div.t518{max-width:600px !important}td.t526{width:600px !important}div.t528{max-width:600px !important}
    </style>
    <![endif]-->
    <!--[if mso]>
    <xml>
    <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    </head>
    <body class="t0" style="min-width:100%;Margin:0px;padding:0px;background-color:#242424;"><div class="t1" style="background-color:#242424;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td class="t2" style="font-size:0;line-height:0;mso-line-height-rule:exactly;background-color:#242424;" valign="top" align="center">
    <!--[if mso]>
    <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">
    <v:fill color="#242424"/>
    </v:background>
    <![endif]-->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" id="innerTable"><tr><td><div class="t3" style="mso-line-height-rule:exactly;font-size:1px;display:none;">&nbsp;</div></td></tr><tr><td>
    <table class="t10" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]><!--><td class="t11" style="background-color:#FAFFFA;width:420px;padding:0 30px 40px 30px;">
    <!--<![endif]-->
    <!--[if mso]><td class="t11" style="background-color:#FAFFFA;width:480px;padding:0 30px 40px 30px;"><![endif]-->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td>
    <table class="t133" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]><!--><td class="t134" style="width:480px;">
    <!--<![endif]-->
    <!--[if mso]><td class="t134" style="width:480px;"><![endif]-->
    <div class="t140" style="display:inline-table;width:100%;text-align:right;vertical-align:top;">
    <!--[if mso]>
    <table role="presentation" cellpadding="0" cellspacing="0" align="right" valign="top" width="500"><tr><td width="370" valign="top"><![endif]-->
    <div class="t154" style="display:inline-table;text-align:initial;vertical-align:inherit;width:82.22222%;max-width:370px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t156"><tr>
    <td class="t157" style="padding:35px 0 0 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td>
    <table class="t172" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]><!--><td class="t173" style="width:480px;">
    <!--<![endif]-->
    <!--[if mso]><td class="t173" style="width:480px;"><![endif]-->
    <p class="t179" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;"><span class="t180" style="margin:0;Margin:0;font-weight:bold;mso-line-height-rule:exactly;">Order confirmation</span></p></td>
    </tr></table>
    </td></tr><tr><td>
    <table class="t162" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]><!--><td class="t163" style="width:480px;padding:0 0 22px 0;">
    <!--<![endif]-->
    <!--[if mso]><td class="t163" style="width:480px;padding:0 0 22px 0;"><![endif]-->
    <p class="t169" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Date: Dec 23 2022</p></td>
    </tr></table>
    </td></tr></table></td>
    </tr></table>
    </div>
    <!--[if mso]>
    </td><td width="130" valign="top"><![endif]-->
    <div class="t146" style="display:inline-table;text-align:initial;vertical-align:inherit;width:17.77778%;max-width:80px;"><div class="t141" style="mso-line-height-rule:exactly;mso-line-height-alt:10px;line-height:10px;font-size:1px;display:block;">&nbsp;</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t148"><tr>
    <td class="t149" style="padding:0 0 50px 0;"><div style="font-size:0px;"><img class="t150" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="130" height="86.0625" alt="" src="https://tabular.b-cdn.net/u/29504c05-d875-42c6-bdb7-f6b83afcb561/bccaeddf-30f3-4707-8b35-5c45504c1099.png"/></div></td>
    </tr></table>
    </div>
    <!--[if mso]>
    </td>
    </tr></table>
    <![endif]-->
    </div></td>
    </tr></table>
    </td></tr><tr><td>
    <table class="t14" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]><!--><td class="t15" style="width:480px;padding:0 0 20px 0;">
    <!--<![endif]-->
    <!--[if mso]><td class="t15" style="width:480px;padding:0 0 20px 0;"><![endif]-->
    <h1 class="t21" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:28px;font-weight:800;font-style:normal;font-size:26px;text-decoration:none;text-transform:none;letter-spacing:-1.04px;direction:ltr;color:#191919;text-align:left;mso-line-height-rule:exactly;mso-text-raise:1px;">Hello Max,</h1></td>
    </tr></table>
    </td></tr><tr><td>
    <table class="t183" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]><!--><td class="t184" style="width:480px;padding:0 0 22px 0;">
    <!--<![endif]-->
    <!--[if mso]><td class="t184" style="width:480px;padding:0 0 22px 0;"><![endif]-->
    <p class="t190" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">We appreciate it very much that you contacted us about your Flash-product. We would love to be of service regarding your past purchase.</p></td>
    </tr></table>
    </td></tr><tr><td>
    <table class="t193" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]><!--><td class="t194" style="width:480px;padding:0 0 22px 0;">
    <!--<![endif]-->
    <!--[if mso]><td class="t194" style="width:480px;padding:0 0 22px 0;"><![endif]-->
    <p class="t200" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Send the product within 30 days (else the order will be canceled).</p></td>
    </tr></table>
    </td></tr><tr><td>
    <table class="t113" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]><!--><td class="t114" style="background-color:#FAFAFA;width:440px;padding:20px 20px 20px 20px;">
    <!--<![endif]-->
    <!--[if mso]><td class="t114" style="background-color:#FAFAFA;width:480px;padding:20px 20px 20px 20px;"><![endif]-->
    <div class="t120" style="display:inline-table;width:100%;text-align:left;vertical-align:middle;">
    <!--[if mso]>
    <table role="presentation" cellpadding="0" cellspacing="0" align="left" valign="middle" width="460"><tr><td class="t125" style="width:10px;" width="10"></td><td width="84.33566" valign="middle"><![endif]-->
    <div class="t126" style="display:inline-table;text-align:initial;vertical-align:inherit;width:30.65187%;max-width:221px;"><div class="t127" style="padding:0 10px 0 10px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t128"><tr>
    <td class="t129"><div style="font-size:0px;"><img class="t130" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="84.33566433566433" height="110.734375" alt="" src="https://5b9544a2-8ffd-4648-b1c2-f33a2cdf5e02.b-cdn.net/e/83877be9-d348-4f60-bb55-1344af1b54b2/3f49b2ce-5baa-471d-82fa-1ea08896ac83.png"/></div></td>
    </tr></table>
    </div></div>
    <!--[if mso]>
    </td><td class="t125" style="width:10px;" width="10"></td><td class="t203" style="width:10px;" width="10"></td><td width="335.66434" valign="middle"><![endif]-->
    <div class="t204" style="display:inline-table;text-align:initial;vertical-align:inherit;width:69.34813%;max-width:500px;"><div class="t205" style="padding:0 10px 0 10px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t206"><tr>
    <td class="t207"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td>
    <table class="t260" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]><!--><td class="t261" style="width:480px;">
    <!--<![endif]-->
    <!--[if mso]><td class="t261" style="width:480px;"><![endif]-->
    <h1 class="t267" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:16px;font-weight:700;font-style:normal;font-size:14px;text-decoration:none;text-transform:uppercase;direction:ltr;color:#1A1A1A;text-align:left;mso-line-height-rule:exactly;mso-text-raise:1px;">Flash HAND WARMERS - Series 2</h1></td>
    </tr></table>
    </td></tr><tr><td><div class="t259" style="mso-line-height-rule:exactly;mso-line-height-alt:10px;line-height:10px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
    <table class="t222" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]><!--><td class="t223" style="width:480px;">
    <!--<![endif]-->
    <!--[if mso]><td class="t223" style="width:480px;"><![endif]-->
    <h1 class="t229" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:16px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:uppercase;direction:ltr;color:#1A1A1A;text-align:left;mso-line-height-rule:exactly;mso-text-raise:1px;">$12.00</h1></td>
    </tr></table>
    </td></tr><tr><td><div class="t210" style="mso-line-height-rule:exactly;mso-line-height-alt:15px;line-height:15px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
    <table class="t212" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]><!--><td class="t213" style="border-top:1px solid #CCCCCC;width:480px;padding:15px 0 0 0;">
    <!--<![endif]-->
    <!--[if mso]><td class="t213" style="border-top:1px solid #CCCCCC;width:480px;padding:15px 0 0 0;"><![endif]-->
    <h1 class="t219" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:16px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:uppercase;direction:ltr;color:#1A1A1A;text-align:left;mso-line-height-rule:exactly;mso-text-raise:1px;">QUANTITY: 1</h1></td>
    </tr></table>
    </td></tr></table></td>
    </tr></table>
    </div></div>
    <!--[if mso]>
    </td><td class="t203" style="width:10px;" width="10"></td>
    </tr></table>
    <![endif]-->
    </div></td>
    </tr></table>
    </td></tr><tr><td><div class="t112" style="mso-line-height-rule:exactly;mso-line-height-alt:30px;line-height:30px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
    <table class="t411" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]><!--><td class="t412" style="background-color:#FFFFFF;width:420px;padding:30px 30px 30px 30px;">
    <!--<![endif]-->
    <!--[if mso]><td class="t412" style="background-color:#FFFFFF;width:480px;padding:30px 30px 30px 30px;"><![endif]-->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td>
    <table class="t415" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]><!--><td class="t416" style="border-top:1px solid #CCCCCC;width:480px;padding:20px 0 20px 0;">
    <!--<![endif]-->
    <!--[if mso]><td class="t416" style="border-top:1px solid #CCCCCC;width:480px;padding:20px 0 20px 0;"><![endif]-->
    <div class="t422" style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
    <!--[if mso]>
    <table role="presentation" cellpadding="0" cellspacing="0" align="left" valign="top" width="420"><tr><td width="210" valign="top"><![endif]-->
    <div class="t428" style="display:inline-table;text-align:initial;vertical-align:inherit;width:50%;max-width:480px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t430"><tr>
    <td class="t431"><p class="t432" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Inter Tight';line-height:24px;font-weight:700;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;direction:ltr;color:#222222;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Subtotal</p></td>
    </tr></table>
    </div>
    <!--[if mso]>
    </td><td width="210" valign="top"><![endif]-->
    <div class="t438" style="display:inline-table;text-align:initial;vertical-align:inherit;width:50%;max-width:480px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t440"><tr>
    <td class="t441"><p class="t442" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Inter Tight';line-height:24px;font-weight:700;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;direction:ltr;color:#222222;text-align:right;mso-line-height-rule:exactly;mso-text-raise:2px;">$12.00</p></td>
    </tr></table>
    </div>
    <!--[if mso]>
    </td>
    </tr></table>
    <![endif]-->
    </div></td>
    </tr></table>
    </td></tr><tr><td>
    <table class="t445" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]><!--><td class="t446" style="width:480px;padding:0 0 20px 0;">
    <!--<![endif]-->
    <!--[if mso]><td class="t446" style="width:480px;padding:0 0 20px 0;"><![endif]-->
    <div class="t452" style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
    <!--[if mso]>
    <table role="presentation" cellpadding="0" cellspacing="0" align="left" valign="top" width="420"><tr><td width="210" valign="top"><![endif]-->
    <div class="t458" style="display:inline-table;text-align:initial;vertical-align:inherit;width:50%;max-width:480px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t460"><tr>
    <td class="t461"><p class="t462" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Inter Tight';line-height:24px;font-weight:500;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;direction:ltr;color:#777777;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Discounted item</p></td>
    </tr></table>
    </div>
    <!--[if mso]>
    </td><td width="210" valign="top"><![endif]-->
    <div class="t468" style="display:inline-table;text-align:initial;vertical-align:inherit;width:50%;max-width:480px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t470"><tr>
    <td class="t471"><p class="t472" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Inter Tight';line-height:24px;font-weight:700;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;direction:ltr;color:#18B53A;text-align:right;mso-line-height-rule:exactly;mso-text-raise:2px;">-$3.00</p></td>
    </tr></table>
    </div>
    <!--[if mso]>
    </td>
    </tr></table>
    <![endif]-->
    </div></td>
    </tr></table>
    </td></tr><tr><td>
    <table class="t475" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]><!--><td class="t476" style="width:480px;padding:0 0 20px 0;">
    <!--<![endif]-->
    <!--[if mso]><td class="t476" style="width:480px;padding:0 0 20px 0;"><![endif]-->
    <div class="t482" style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
    <!--[if mso]>
    <table role="presentation" cellpadding="0" cellspacing="0" align="left" valign="top" width="420"><tr><td width="210" valign="top"><![endif]-->
    <div class="t488" style="display:inline-table;text-align:initial;vertical-align:inherit;width:50%;max-width:480px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t490"><tr>
    <td class="t491"><p class="t492" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Inter Tight';line-height:24px;font-weight:500;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;direction:ltr;color:#777777;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Local tax</p></td>
    </tr></table>
    </div>
    <!--[if mso]>
    </td><td width="210" valign="top"><![endif]-->
    <div class="t498" style="display:inline-table;text-align:initial;vertical-align:inherit;width:50%;max-width:480px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t500"><tr>
    <td class="t501"><p class="t502" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Inter Tight';line-height:24px;font-weight:700;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;direction:ltr;color:#777777;text-align:right;mso-line-height-rule:exactly;mso-text-raise:2px;">$0.5</p></td>
    </tr></table>
    </div>
    <!--[if mso]>
    </td>
    </tr></table>
    <![endif]-->
    </div></td>
    </tr></table>
    </td></tr><tr><td>
    <table class="t505" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]><!--><td class="t506" style="border-top:1px solid #CCCCCC;width:480px;padding:20px 0 20px 0;">
    <!--<![endif]-->
    <!--[if mso]><td class="t506" style="border-top:1px solid #CCCCCC;width:480px;padding:20px 0 20px 0;"><![endif]-->
    <div class="t512" style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
    <!--[if mso]>
    <table role="presentation" cellpadding="0" cellspacing="0" align="left" valign="top" width="420"><tr><td width="210" valign="top"><![endif]-->
    <div class="t518" style="display:inline-table;text-align:initial;vertical-align:inherit;width:50%;max-width:480px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t520"><tr>
    <td class="t521"><p class="t522" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Inter Tight';line-height:44px;font-weight:800;font-style:normal;font-size:34px;text-decoration:none;text-transform:none;direction:ltr;color:#222222;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">Total</p></td>
    </tr></table>
    </div>
    <!--[if mso]>
    </td><td width="210" valign="top"><![endif]-->
    <div class="t528" style="display:inline-table;text-align:initial;vertical-align:inherit;width:50%;max-width:480px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t530"><tr>
    <td class="t531"><p class="t532" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Inter Tight';line-height:44px;font-weight:800;font-style:normal;font-size:34px;text-decoration:none;text-transform:none;direction:ltr;color:#222222;text-align:right;mso-line-height-rule:exactly;mso-text-raise:3px;">$11.50</p></td>
    </tr></table>
    </div>
    <!--[if mso]>
    </td>
    </tr></table>
    <![endif]-->
    </div></td>
    </tr></table>
    </td></tr></table></td>
    </tr></table>
    </td></tr><tr><td>
    <table class="t232" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]><!--><td class="t233" style="background-color:#CAD9D1;width:400px;padding:40px 40px 40px 40px;">
    <!--<![endif]-->
    <!--[if mso]><td class="t233" style="background-color:#CAD9D1;width:480px;padding:40px 40px 40px 40px;"><![endif]-->
    <div class="t239" style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
    <!--[if mso]>
    <table role="presentation" cellpadding="0" cellspacing="0" align="left" valign="top" width="420"><tr><td width="210" valign="top"><![endif]-->
    <div class="t243" style="display:inline-table;text-align:initial;vertical-align:inherit;width:100%;max-width:480px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t245"><tr>
    <td class="t246" style="padding:0 0 15px 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td>
    <table class="t304" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]><!--><td class="t305" style="width:480px;">
    <!--<![endif]-->
    <!--[if mso]><td class="t305" style="width:480px;"><![endif]-->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td>
    <table class="t308" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]><!--><td class="t309" style="width:480px;">
    <!--<![endif]-->
    <!--[if mso]><td class="t309" style="width:480px;"><![endif]-->
    <h1 class="t315" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:16px;font-weight:700;font-style:normal;font-size:14px;text-decoration:none;text-transform:uppercase;direction:ltr;color:#1A1A1A;text-align:left;mso-line-height-rule:exactly;mso-text-raise:1px;">DELIVERY ADDRESS</h1></td>
    </tr></table>
    </td></tr><tr><td><div class="t307" style="mso-line-height-rule:exactly;mso-line-height-alt:10px;line-height:10px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
    <table class="t318" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]><!--><td class="t319" style="width:480px;">
    <!--<![endif]-->
    <!--[if mso]><td class="t319" style="width:480px;"><![endif]-->
    <p class="t325" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#242424;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">Santa Fe, NM</p></td>
    </tr></table>
    </td></tr><tr><td>
    <table class="t328" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]><!--><td class="t329" style="width:480px;">
    <!--<![endif]-->
    <!--[if mso]><td class="t329" style="width:480px;"><![endif]-->
    <p class="t335" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#242424;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">New Mexico 87500</p></td>
    </tr></table>
    </td></tr></table></td>
    </tr></table>
    </td></tr><tr><td><div class="t268" style="mso-line-height-rule:exactly;mso-line-height-alt:30px;line-height:30px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
    <table class="t275" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]><!--><td class="t276" style="width:480px;">
    <!--<![endif]-->
    <!--[if mso]><td class="t276" style="width:480px;"><![endif]-->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td>
    <table class="t279" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]><!--><td class="t280" style="width:480px;">
    <!--<![endif]-->
    <!--[if mso]><td class="t280" style="width:480px;"><![endif]-->
    <h1 class="t286" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:16px;font-weight:700;font-style:normal;font-size:14px;text-decoration:none;text-transform:uppercase;direction:ltr;color:#1A1A1A;text-align:left;mso-line-height-rule:exactly;mso-text-raise:1px;">DELIVERY METHOD</h1></td>
    </tr></table>
    </td></tr><tr><td><div class="t278" style="mso-line-height-rule:exactly;mso-line-height-alt:10px;line-height:10px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
    <table class="t289" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]><!--><td class="t290" style="width:480px;">
    <!--<![endif]-->
    <!--[if mso]><td class="t290" style="width:480px;"><![endif]-->
    <p class="t296" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#242424;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">EU STANDARD SHIPPING</p></td>
    </tr></table>
    </td></tr></table></td>
    </tr></table>
    </td></tr></table></td>
    </tr></table>
    <!--[if !mso]><!--><div class="t241" style="mso-line-height-rule:exactly;mso-line-height-alt:15px;line-height:15px;font-size:1px;display:block;">&nbsp;</div>
    <!--<![endif]-->
    </div>
    <!--[if mso]>
    </td><td width="210" valign="top"><![endif]-->
    <div class="t252" style="display:inline-table;text-align:initial;vertical-align:inherit;width:100%;max-width:480px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t254"><tr>
    <td class="t255"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td>
    <table class="t343" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]><!--><td class="t344" style="width:480px;">
    <!--<![endif]-->
    <!--[if mso]><td class="t344" style="width:480px;"><![endif]-->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td>
    <table class="t347" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]><!--><td class="t348" style="width:480px;">
    <!--<![endif]-->
    <!--[if mso]><td class="t348" style="width:480px;"><![endif]-->
    <h1 class="t354" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:16px;font-weight:700;font-style:normal;font-size:14px;text-decoration:none;text-transform:uppercase;direction:ltr;color:#1A1A1A;text-align:left;mso-line-height-rule:exactly;mso-text-raise:1px;">BILLING ADDRESS</h1></td>
    </tr></table>
    </td></tr><tr><td><div class="t346" style="mso-line-height-rule:exactly;mso-line-height-alt:10px;line-height:10px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
    <table class="t357" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]><!--><td class="t358" style="width:480px;">
    <!--<![endif]-->
    <!--[if mso]><td class="t358" style="width:480px;"><![endif]-->
    <p class="t364" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#242424;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">Santa Fe, NM</p></td>
    </tr></table>
    </td></tr><tr><td>
    <table class="t367" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]><!--><td class="t368" style="width:480px;">
    <!--<![endif]-->
    <!--[if mso]><td class="t368" style="width:480px;"><![endif]-->
    <p class="t374" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#242424;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">New Mexico 87500</p></td>
    </tr></table>
    </td></tr></table></td>
    </tr></table>
    </td></tr><tr><td><div class="t375" style="mso-line-height-rule:exactly;mso-line-height-alt:30px;line-height:30px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
    <table class="t382" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]><!--><td class="t383" style="width:480px;">
    <!--<![endif]-->
    <!--[if mso]><td class="t383" style="width:480px;"><![endif]-->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td>
    <table class="t386" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]><!--><td class="t387" style="width:480px;">
    <!--<![endif]-->
    <!--[if mso]><td class="t387" style="width:480px;"><![endif]-->
    <h1 class="t393" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:16px;font-weight:700;font-style:normal;font-size:14px;text-decoration:none;text-transform:uppercase;direction:ltr;color:#1A1A1A;text-align:left;mso-line-height-rule:exactly;mso-text-raise:1px;">PAYMENT METHOD</h1></td>
    </tr></table>
    </td></tr><tr><td><div class="t385" style="mso-line-height-rule:exactly;mso-line-height-alt:10px;line-height:10px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
    <table class="t396" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]><!--><td class="t397" style="width:480px;">
    <!--<![endif]-->
    <!--[if mso]><td class="t397" style="width:480px;"><![endif]-->
    <p class="t403" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#242424;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">VISA — Credit Card</p></td>
    </tr></table>
    </td></tr></table></td>
    </tr></table>
    </td></tr></table></td>
    </tr></table>
    </div>
    <!--[if mso]>
    </td>
    </tr></table>
    <![endif]-->
    </div></td>
    </tr></table>
    </td></tr></table></td>
    </tr></table>
    </td></tr><tr><td>
    <table class="t29" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]><!--><td class="t30" style="background-color:#242424;width:420px;padding:40px 30px 40px 30px;">
    <!--<![endif]-->
    <!--[if mso]><td class="t30" style="background-color:#242424;width:480px;padding:40px 30px 40px 30px;"><![endif]-->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td>
    <table class="t33" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]><!--><td class="t34" style="width:480px;">
    <!--<![endif]-->
    <!--[if mso]><td class="t34" style="width:480px;"><![endif]-->
    <p class="t40" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:22px;font-weight:800;font-style:normal;font-size:18px;text-decoration:none;text-transform:none;letter-spacing:-0.9px;direction:ltr;color:#757575;text-align:center;mso-line-height-rule:exactly;mso-text-raise:1px;">Want updates through more platforms?</p></td>
    </tr></table>
    </td></tr><tr><td>
    <table class="t43" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]><!--><td class="t44" style="width:480px;padding:10px 0 36px 0;">
    <!--<![endif]-->
    <!--[if mso]><td class="t44" style="width:480px;padding:10px 0 36px 0;"><![endif]-->
    <div class="t50" style="display:inline-table;width:100%;text-align:center;vertical-align:top;">
    <!--[if mso]>
    <table role="presentation" cellpadding="0" cellspacing="0" align="center" valign="top" width="220"><tr><td class="t55" style="width:10px;" width="10"></td><td width="24" valign="top"><![endif]-->
    <div class="t56" style="display:inline-table;text-align:initial;vertical-align:inherit;width:20%;max-width:44px;"><div class="t57" style="padding:0 10px 0 10px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t58"><tr>
    <td class="t59"><div style="font-size:0px;"><img class="t60" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="24" height="24" alt="" src="https://5b9544a2-8ffd-4648-b1c2-f33a2cdf5e02.b-cdn.net/e/83877be9-d348-4f60-bb55-1344af1b54b2/899d51ec-04b5-42c1-b0d8-e04e30197fb5.png"/></div></td>
    </tr></table>
    </div></div>
    <!--[if mso]>
    </td><td class="t55" style="width:10px;" width="10"></td><td class="t95" style="width:10px;" width="10"></td><td width="24" valign="top"><![endif]-->
    <div class="t96" style="display:inline-table;text-align:initial;vertical-align:inherit;width:20%;max-width:44px;"><div class="t97" style="padding:0 10px 0 10px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t98"><tr>
    <td class="t99"><div style="font-size:0px;"><img class="t100" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="24" height="24" alt="" src="https://5b9544a2-8ffd-4648-b1c2-f33a2cdf5e02.b-cdn.net/e/83877be9-d348-4f60-bb55-1344af1b54b2/d1bacd78-b396-4628-a3a5-83c118ed4336.png"/></div></td>
    </tr></table>
    </div></div>
    <!--[if mso]>
    </td><td class="t95" style="width:10px;" width="10"></td><td class="t85" style="width:10px;" width="10"></td><td width="24" valign="top"><![endif]-->
    <div class="t86" style="display:inline-table;text-align:initial;vertical-align:inherit;width:20%;max-width:44px;"><div class="t87" style="padding:0 10px 0 10px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t88"><tr>
    <td class="t89"><div style="font-size:0px;"><img class="t90" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="24" height="24" alt="" src="https://5b9544a2-8ffd-4648-b1c2-f33a2cdf5e02.b-cdn.net/e/83877be9-d348-4f60-bb55-1344af1b54b2/b755f9c4-0ed1-43a1-bac2-56ea7bcc8fb1.png"/></div></td>
    </tr></table>
    </div></div>
    <!--[if mso]>
    </td><td class="t85" style="width:10px;" width="10"></td><td class="t75" style="width:10px;" width="10"></td><td width="24" valign="top"><![endif]-->
    <div class="t76" style="display:inline-table;text-align:initial;vertical-align:inherit;width:20%;max-width:44px;"><div class="t77" style="padding:0 10px 0 10px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t78"><tr>
    <td class="t79"><div style="font-size:0px;"><img class="t80" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="24" height="24" alt="" src="https://5b9544a2-8ffd-4648-b1c2-f33a2cdf5e02.b-cdn.net/e/83877be9-d348-4f60-bb55-1344af1b54b2/6c7a3f7e-6e64-4119-818a-5386fb58a842.png"/></div></td>
    </tr></table>
    </div></div>
    <!--[if mso]>
    </td><td class="t75" style="width:10px;" width="10"></td><td class="t65" style="width:10px;" width="10"></td><td width="24" valign="top"><![endif]-->
    <div class="t66" style="display:inline-table;text-align:initial;vertical-align:inherit;width:20%;max-width:44px;"><div class="t67" style="padding:0 10px 0 10px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t68"><tr>
    <td class="t69"><div style="font-size:0px;"><img class="t70" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="24" height="24" alt="" src="https://5b9544a2-8ffd-4648-b1c2-f33a2cdf5e02.b-cdn.net/e/83877be9-d348-4f60-bb55-1344af1b54b2/3f9c2b1f-fa9a-4b05-ac8b-a556e0af2b0d.png"/></div></td>
    </tr></table>
    </div></div>
    <!--[if mso]>
    </td><td class="t65" style="width:10px;" width="10"></td>
    </tr></table>
    <![endif]-->
    </div></td>
    </tr></table>
    </td></tr><tr><td>
    <table class="t103" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]><!--><td class="t104" style="width:480px;">
    <!--<![endif]-->
    <!--[if mso]><td class="t104" style="width:480px;"><![endif]-->
    <p class="t110" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;direction:ltr;color:#888888;text-align:center;mso-line-height-rule:exactly;mso-text-raise:3px;">Sand Pit, Buea, SWR, Cameroon.</p></td>
    </tr></table>
    </td></tr></table></td>
    </tr></table>
    </td></tr></table></td></tr></table></div></body>
    </html>`,
    })
        .then((msg) => {
        console.log("message: ", msg);
    }) // logs response data
        .catch((err) => {
        console.log("error: ", err);
    });
};
exports.sendOrderConfirmation = sendOrderConfirmation;
const sendPaymentSuccess = async (to) => {
    return await mg.messages
        .create("mail.linkavet.com", {
        from: "Linkavet <infor@mail.linkavet.com>",
        to: [`${to}`],
        subject: "Password Reset",
        text: "Password Reset Request!",
        html: `<!DOCTYPE html>
      <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
      
      <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!-->
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@100;200;300;400;500;600;700;800;900" rel="stylesheet" type="text/css">
        <link href="https://fonts.googleapis.com/css2?family=Oxygen:wght@100;200;300;400;500;600;700;800;900" rel="stylesheet" type="text/css"><!--<![endif]-->
        <style>
          * {
            box-sizing: border-box;
          }
      
          body {
            margin: 0;
            padding: 0;
          }
      
          a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: inherit !important;
          }
      
          #MessageViewBody a {
            color: inherit;
            text-decoration: none;
          }
      
          p {
            line-height: inherit
          }
      
          .desktop_hide,
          .desktop_hide table {
            mso-hide: all;
            display: none;
            max-height: 0px;
            overflow: hidden;
          }
      
          .image_block img+div {
            display: none;
          }
      
          @media (max-width:640px) {
            .desktop_hide table.icons-inner {
              display: inline-block !important;
            }
      
            .icons-inner {
              text-align: center;
            }
      
            .icons-inner td {
              margin: 0 auto;
            }
      
            .mobile_hide {
              display: none;
            }
      
            .row-content {
              width: 100% !important;
            }
      
            .stack .column {
              width: 100%;
              display: block;
            }
      
            .mobile_hide {
              min-height: 0;
              max-height: 0;
              max-width: 0;
              overflow: hidden;
              font-size: 0px;
            }
      
            .desktop_hide,
            .desktop_hide table {
              display: table !important;
              max-height: none !important;
            }
          }
        </style>
      </head>
      
      <body style="background-color: #DFDFDF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
        <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #DFDFDF;">
          <tbody>
            <tr>
              <td>
                <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/121/groovepaper_1.png'); background-repeat: repeat;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 620px; margin: 0 auto;" width="620">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad" style="width:100%;">
                                      <div class="alignment" align="center" style="line-height:10px">
                                        <div style="max-width: 620px;"><img src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/121/top_rounded_15.png" style="display: block; height: auto; border: 0; width: 100%;" width="620" alt="Image" title="Image"></div>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/121/hero_bg_2.jpg'); background-position: top center; background-repeat: no-repeat;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 620px; margin: 0 auto;" width="620">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="paragraph_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td class="pad" style="padding-left:60px;padding-right:60px;padding-top:60px;">
                                      <div style="color:#FFFFFF;font-family:'Oswald','Lucida Sans Unicode','Lucida Grande',sans-serif;font-size:34px;line-height:180%;text-align:center;mso-line-height-alt:61.2px;">
                                        <p style="margin: 0; word-break: break-word;"><span><span>Dear&nbsp;</span><strong><span><span style="background-color:rgb(255,255,255);"><span style="color:rgb(0,51,0);background-color:rgb(255,255,255);">&nbsp;<span style="color:rgb(0,128,0);">John Doe</span>&nbsp;</span></span>,&nbsp;</span></strong></span></p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table class="paragraph_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td class="pad" style="padding-left:60px;padding-right:60px;">
                                      <div style="color:#FFFFFF;font-family:'Oswald','Lucida Sans Unicode','Lucida Grande',sans-serif;font-size:24px;line-height:180%;text-align:center;mso-line-height-alt:43.2px;">
                                        <p style="margin: 0; word-break: break-word;"><span><span>THANKS FOR YOUR PAYMENT!</span></span></p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table class="paragraph_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td class="pad" style="padding-left:60px;padding-right:60px;">
                                      <div style="color:#FFFFFF;font-family:'Oswald','Lucida Sans Unicode','Lucida Grande',sans-serif;font-size:14px;line-height:180%;text-align:center;mso-line-height-alt:25.2px;">
                                        <p style="margin: 0; word-break: break-word;"><br></p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table class="image_block block-4 mobile_hide" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad" style="width:100%;">
                                      <div class="alignment" align="center" style="line-height:10px">
                                        <div style="max-width: 64px;"><img src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/121/smile.png" style="display: block; height: auto; border: 0; width: 100%;" width="64" alt="Image" title="Image"></div>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <div class="spacer_block block-5 mobile_hide" style="height:125px;line-height:125px;font-size:1px;">&#8202;</div>
                                <div class="spacer_block block-6 mobile_hide" style="height:40px;line-height:40px;font-size:1px;">&#8202;</div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ebebeb; color: #000000; width: 620px; margin: 0 auto;" width="620">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; border-right: 1px solid #DFDFDF; padding-bottom: 10px; padding-top: 20px; vertical-align: top; border-top: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad" style="width:100%;">
                                      <div class="alignment" align="center" style="line-height:10px">
                                        <div style="max-width: 27px;"><img src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/121/barcode.png" style="display: block; height: auto; border: 0; width: 100%;" width="27" alt="Image" title="Image"></div>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table class="text_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td class="pad">
                                      <div style="font-family: sans-serif">
                                        <div class style="font-size: 12px; font-family: 'Oxygen', 'Trebuchet MS', Helvetica, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2;">
                                          <p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 16.8px;"><span style="color:#999999;font-size:14px;">Invoice NO:</span> <strong>2-9838CX</strong></p>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                              <td class="column column-2" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; border-right: 1px solid #DFDFDF; padding-bottom: 10px; padding-top: 15px; vertical-align: top; border-top: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad" style="width:100%;">
                                      <div class="alignment" align="center" style="line-height:10px">
                                        <div style="max-width: 27px;"><img src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/121/calendar.png" style="display: block; height: auto; border: 0; width: 100%;" width="27" alt="Image" title="Image"></div>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table class="text_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td class="pad">
                                      <div style="font-family: sans-serif">
                                        <div class style="font-size: 12px; font-family: 'Oxygen', 'Trebuchet MS', Helvetica, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2;">
                                          <p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 16.8px;"><span style="color:#999999;font-size:14px;">Invoice Date:</span> <strong>Jun 18, 2018</strong></p>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                              <td class="column column-3" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 15px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad" style="width:100%;">
                                      <div class="alignment" align="center" style="line-height:10px">
                                        <div style="max-width: 14px;"><img src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/121/dollar.png" style="display: block; height: auto; border: 0; width: 100%;" width="14" alt="Image" title="Image"></div>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table class="text_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td class="pad">
                                      <div style="font-family: sans-serif">
                                        <div class style="font-size: 12px; font-family: 'Oxygen', 'Trebuchet MS', Helvetica, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2;">
                                          <p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 16.8px;"><span style="color:#999999;font-size:14px;">Total:</span>&nbsp;<strong>$ 263,00</strong></p>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/121/groovepaper_1.png'); background-position: top center; background-repeat: repeat;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; color: #000000; width: 620px; margin: 0 auto;" width="620">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="paragraph_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td class="pad" style="padding-bottom:5px;padding-left:40px;padding-right:40px;padding-top:15px;">
                                      <div style="color:#56B500;font-family:'Oswald','Lucida Sans Unicode','Lucida Grande',sans-serif;font-size:24px;line-height:150%;text-align:center;mso-line-height-alt:36px;">
                                        <p style="margin: 0; word-break: break-word;"><span><b>Invoice recap</b></span></p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/121/groovepaper_1.png'); background-position: top center; background-repeat: repeat;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #56b500; color: #000000; width: 620px; margin: 0 auto;" width="620">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; border-right: 1px solid #519E0A; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="paragraph_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td class="pad">
                                      <div style="color:#FFFFFF;font-family:'Oxygen', 'Trebuchet MS', Helvetica, sans-serif;font-size:13px;line-height:120%;text-align:center;mso-line-height-alt:15.6px;">
                                        <p style="margin: 0; word-break: break-word;"><span><strong>Description</strong></span></p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                              <td class="column column-2" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; border-right: 1px solid #519E0A; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="paragraph_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td class="pad">
                                      <div style="color:#FFFFFF;font-family:'Oxygen', 'Trebuchet MS', Helvetica, sans-serif;font-size:13px;line-height:120%;text-align:center;mso-line-height-alt:15.6px;">
                                        <p style="margin: 0; word-break: break-word;"><span><strong>Quantity</strong></span></p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                              <td class="column column-3" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="paragraph_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td class="pad">
                                      <div style="color:#FFFFFF;font-family:'Oxygen', 'Trebuchet MS', Helvetica, sans-serif;font-size:13px;line-height:120%;text-align:center;mso-line-height-alt:15.6px;">
                                        <p style="margin: 0; word-break: break-word;"><span><strong>Total</strong></span></p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-6" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/121/groovepaper_1.png'); background-position: top center; background-repeat: repeat;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; color: #000000; width: 620px; margin: 0 auto;" width="620">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; border-right: 1px solid #DFDFDF; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="paragraph_block block-1" width="100%" border="0" cellpadding="5" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td class="pad">
                                      <div style="color:#555555;font-family:'Oxygen', 'Trebuchet MS', Helvetica, sans-serif;font-size:14px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
                                        <p style="margin: 0; word-break: break-word;"><span style="color:rgb(153,153,153);">Lorem ipsum dolor</span></p>
                                        <p style="margin: 0; word-break: break-word;"><span style="color:rgb(153,153,153);">sit amet desicititnum.</span></p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                              <td class="column column-2" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; border-right: 1px solid #DFDFDF; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="paragraph_block block-1" width="100%" border="0" cellpadding="15" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td class="pad">
                                      <div style="color:#555555;font-family:'Oxygen', 'Trebuchet MS', Helvetica, sans-serif;font-size:14px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
                                        <p style="margin: 0; word-break: break-word;"><b>1</b></p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                              <td class="column column-3" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="paragraph_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td class="pad">
                                      <div style="color:#555555;font-family:'Oxygen', 'Trebuchet MS', Helvetica, sans-serif;font-size:14px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
                                        <p style="margin: 0; word-break: break-word;"><strong>&nbsp;$ 12,00</strong></p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-7" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/121/groovepaper_1.png'); background-position: top center; background-repeat: repeat;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #F5F5F5; color: #000000; width: 620px; margin: 0 auto;" width="620">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #F5F5F5; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="divider_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad">
                                      <div class="alignment" align="center">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                          <tr>
                                            <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #DFDFDF;"><span>&#8202;</span></td>
                                          </tr>
                                        </table>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-8" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/121/groovepaper_1.png'); background-position: top center; background-repeat: repeat;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #F5F5F5; color: #000000; width: 620px; margin: 0 auto;" width="620">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; border-right: 1px solid #DFDFDF; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="paragraph_block block-1" width="100%" border="0" cellpadding="5" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td class="pad">
                                      <div style="color:#555555;font-family:'Oxygen', 'Trebuchet MS', Helvetica, sans-serif;font-size:14px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
                                        <p style="margin: 0; word-break: break-word;"><span style="color:rgb(153,153,153);">Lorem ipsum dolor</span></p>
                                        <p style="margin: 0; word-break: break-word;"><span style="color:rgb(153,153,153);">sit amet desicititnum.</span></p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                              <td class="column column-2" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; border-right: 1px solid #DFDFDF; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="paragraph_block block-1" width="100%" border="0" cellpadding="15" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td class="pad">
                                      <div style="color:#555555;font-family:'Oxygen', 'Trebuchet MS', Helvetica, sans-serif;font-size:14px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
                                        <p style="margin: 0; word-break: break-word;"><b>1</b></p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                              <td class="column column-3" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="paragraph_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td class="pad">
                                      <div style="color:#555555;font-family:'Oxygen', 'Trebuchet MS', Helvetica, sans-serif;font-size:14px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
                                        <p style="margin: 0; word-break: break-word;"><strong>&nbsp;$ 75,00</strong></p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-9" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/121/groovepaper_1.png'); background-position: top center; background-repeat: repeat;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; color: #000000; width: 620px; margin: 0 auto;" width="620">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="divider_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad">
                                      <div class="alignment" align="left">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                          <tr>
                                            <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #DFDFDF;"><span>&#8202;</span></td>
                                          </tr>
                                        </table>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-10" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/121/groovepaper_1.png'); background-position: top center; background-repeat: repeat;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; color: #000000; width: 620px; margin: 0 auto;" width="620">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; border-right: 1px solid #DFDFDF; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="paragraph_block block-1" width="100%" border="0" cellpadding="5" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td class="pad">
                                      <div style="color:#555555;font-family:'Oxygen', 'Trebuchet MS', Helvetica, sans-serif;font-size:14px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
                                        <p style="margin: 0; word-break: break-word;"><span style="color:rgb(153,153,153);">Lorem ipsum dolor</span></p>
                                        <p style="margin: 0; word-break: break-word;"><span style="color:rgb(153,153,153);">sit amet desicititnum.</span></p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                              <td class="column column-2" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; border-right: 1px solid #DFDFDF; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="paragraph_block block-1" width="100%" border="0" cellpadding="15" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td class="pad">
                                      <div style="color:#555555;font-family:'Oxygen', 'Trebuchet MS', Helvetica, sans-serif;font-size:14px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
                                        <p style="margin: 0; word-break: break-word;"><b>1</b></p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                              <td class="column column-3" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="paragraph_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td class="pad">
                                      <div style="color:#555555;font-family:'Oxygen', 'Trebuchet MS', Helvetica, sans-serif;font-size:14px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
                                        <p style="margin: 0; word-break: break-word;"><strong>&nbsp;$ 88,00</strong></p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-11" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/121/groovepaper_1.png'); background-position: top center; background-repeat: repeat;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #F5F5F5; color: #000000; width: 620px; margin: 0 auto;" width="620">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #F5F5F5; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="divider_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad">
                                      <div class="alignment" align="center">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                          <tr>
                                            <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #DFDFDF;"><span>&#8202;</span></td>
                                          </tr>
                                        </table>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-12" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/121/groovepaper_1.png'); background-position: top center; background-repeat: repeat;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #F5F5F5; color: #000000; width: 620px; margin: 0 auto;" width="620">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; border-right: 1px solid #DFDFDF; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="paragraph_block block-1" width="100%" border="0" cellpadding="5" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td class="pad">
                                      <div style="color:#555555;font-family:'Oxygen', 'Trebuchet MS', Helvetica, sans-serif;font-size:14px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
                                        <p style="margin: 0; word-break: break-word;"><span style="color:rgb(153,153,153);">Lorem ipsum dolor</span></p>
                                        <p style="margin: 0; word-break: break-word;"><span style="color:rgb(153,153,153);">sit amet desicititnum.</span></p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                              <td class="column column-2" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; border-right: 1px solid #DFDFDF; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="paragraph_block block-1" width="100%" border="0" cellpadding="15" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td class="pad">
                                      <div style="color:#555555;font-family:'Oxygen', 'Trebuchet MS', Helvetica, sans-serif;font-size:14px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
                                        <p style="margin: 0; word-break: break-word;"><b>1</b></p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                              <td class="column column-3" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="paragraph_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td class="pad">
                                      <div style="color:#555555;font-family:'Oxygen', 'Trebuchet MS', Helvetica, sans-serif;font-size:14px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
                                        <p style="margin: 0; word-break: break-word;"><strong>&nbsp;$ 88,00</strong></p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-13" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/121/groovepaper_1.png'); background-position: top center; background-repeat: repeat;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; color: #000000; width: 620px; margin: 0 auto;" width="620">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="divider_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad">
                                      <div class="alignment" align="left">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                          <tr>
                                            <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #DFDFDF;"><span>&#8202;</span></td>
                                          </tr>
                                        </table>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-14" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/121/groovepaper_1.png'); background-position: top center; background-repeat: repeat;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; color: #000000; width: 620px; margin: 0 auto;" width="620">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-top: 15px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="paragraph_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td class="pad" style="padding-left:25px;padding-top:5px;">
                                      <div style="color:#56B500;font-family:'Oxygen', 'Trebuchet MS', Helvetica, sans-serif;font-size:14px;line-height:120%;text-align:left;mso-line-height-alt:16.8px;">
                                        <p style="margin: 0; word-break: break-word;">Payment method:<br></p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table class="paragraph_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td class="pad" style="padding-left:25px;">
                                      <div style="color:#56B500;font-family:'Oxygen', 'Trebuchet MS', Helvetica, sans-serif;font-size:20px;line-height:120%;text-align:left;mso-line-height-alt:24px;">
                                        <p style="margin: 0; word-break: break-word;"><span>PAYPAL</span></p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                              <td class="column column-2" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <div class="spacer_block block-1" style="height:20px;line-height:20px;font-size:1px;">&#8202;</div>
                              </td>
                              <td class="column column-3" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #56B500; border-left: 1px solid #DFDFDF; padding-bottom: 5px; padding-top: 10px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px;">
                                <div class="spacer_block block-1" style="height:20px;line-height:20px;font-size:1px;">&#8202;</div>
                                <table class="paragraph_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td class="pad" style="padding-bottom:25px;padding-left:10px;padding-right:10px;">
                                      <div style="color:#FFFFFF;font-family:'Oxygen', 'Trebuchet MS', Helvetica, sans-serif;font-size:18px;line-height:120%;text-align:center;mso-line-height-alt:21.599999999999998px;">
                                        <p style="margin: 0; word-break: break-word;"><span><strong>$ 263,00</strong></span></p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-15" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/121/groovepaper_1.png'); background-position: top center; background-repeat: repeat;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; color: #000000; width: 620px; margin: 0 auto;" width="620">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-left: 20px; padding-right: 20px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="divider_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad">
                                      <div class="alignment" align="left">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                          <tr>
                                            <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #DFDFDF;"><span>&#8202;</span></td>
                                          </tr>
                                        </table>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-16" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/121/groovepaper_1.png'); background-position: top center; background-repeat: repeat;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; color: #000000; width: 620px; margin: 0 auto;" width="620">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-left: 20px; padding-right: 20px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="divider_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad">
                                      <div class="alignment" align="left">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                          <tr>
                                            <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #DFDFDF;"><span>&#8202;</span></td>
                                          </tr>
                                        </table>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-17" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/121/groovepaper_1.png'); background-position: top center; background-repeat: repeat;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; color: #000000; width: 620px; margin: 0 auto;" width="620">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-left: 20px; padding-right: 20px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="divider_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad">
                                      <div class="alignment" align="left">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                          <tr>
                                            <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #DFDFDF;"><span>&#8202;</span></td>
                                          </tr>
                                        </table>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-18" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 620px; margin: 0 auto;" width="620">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad" style="width:100%;">
                                      <div class="alignment" align="center" style="line-height:10px">
                                        <div style="max-width: 620px;"><img src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/121/bottom_rounded_15.png" style="display: block; height: auto; border: 0; width: 100%;" width="620" alt="Image" title="Image"></div>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-19" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #F0F0F0; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/121/groovepaper_1.png'); background-position: top center; background-repeat: repeat;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 620px; margin: 0 auto;" width="620">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 15px; padding-top: 15px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="paragraph_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td class="pad">
                                      <div style="color:#555555;font-family:'Oxygen', 'Trebuchet MS', Helvetica, sans-serif;font-size:12px;line-height:120%;text-align:center;mso-line-height-alt:14.399999999999999px;">
                                        <p style="margin: 0; word-break: break-word;"><strong>Your Company © All rights reserved</strong></p>
                                        <p style="margin: 0; word-break: break-word;">Lorem ipsum dolor sit amet</p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-20" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 620px; margin: 0 auto;" width="620">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="icons_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad" style="vertical-align: middle; color: #1e0e4b; font-family: 'Inter', sans-serif; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;">
                                      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                        <tr>
                                          <td class="alignment" style="vertical-align: middle; text-align: center;"><!--[if vml]><table align="center" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
                                            <!--[if !vml]><!-->
                                            <table class="icons-inner" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; margin-right: -4px; padding-left: 0px; padding-right: 0px;" cellpadding="0" cellspacing="0" role="presentation"><!--<![endif]-->
                                              <tr>
                                                <td style="vertical-align: middle; text-align: center; padding-top: 5px; padding-bottom: 5px; padding-left: 5px; padding-right: 6px;"><a href="http://designedwithbeefree.com/" target="_blank" style="text-decoration: none;"><img class="icon" alt="Beefree Logo" src="https://d1oco4z2z1fhwp.cloudfront.net/assets/Beefree-logo.png" height="32" width="34" align="center" style="display: block; height: auto; margin: 0 auto; border: 0;"></a></td>
                                                <td style="font-family: 'Inter', sans-serif; font-size: 15px; font-weight: undefined; color: #1e0e4b; vertical-align: middle; letter-spacing: undefined; text-align: center;"><a href="http://designedwithbeefree.com/" target="_blank" style="color: #1e0e4b; text-decoration: none;">Designed with Beefree</a></td>
                                              </tr>
                                            </table>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table><!-- End -->
      </body>
      </html>`,
    })
        .then((msg) => {
        console.log("message: ", msg);
    }) // logs response data
        .catch((err) => {
        console.log("error: ", err);
    });
};
exports.sendPaymentSuccess = sendPaymentSuccess;
