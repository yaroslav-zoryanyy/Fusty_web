"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailService = void 0;
const node_path_1 = __importDefault(require("node:path"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_express_handlebars_1 = __importDefault(require("nodemailer-express-handlebars"));
const config_1 = require("../configs/config");
const email_constants_1 = require("../constants/email.constants");
class EmailService {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            from: "",
            auth: {
                user: config_1.config.smtpEmail,
                pass: config_1.config.smtpPassword,
            },
        });
        const hbsOptions = {
            viewEngine: {
                extname: ".hbs",
                layoutsDir: node_path_1.default.join(process.cwd(), "src", "templates", "layouts"),
                partialsDir: node_path_1.default.join(process.cwd(), "src", "templates", "partials"),
                defaultLayout: "main",
            },
            viewPath: node_path_1.default.join(process.cwd(), "src", "templates", "views"),
            extName: ".hbs",
        };
        this.transporter.use("compile", (0, nodemailer_express_handlebars_1.default)(hbsOptions));
    }
    async sendEmail(type, email, context) {
        const { subject, template } = email_constants_1.emailConstants[type];
        const options = { to: email, subject, template, context };
        await this.transporter.sendMail(options);
    }
}
exports.emailService = new EmailService();
