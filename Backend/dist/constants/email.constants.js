"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailConstants = void 0;
const email_type_enum_1 = require("../enums/email-type.enum");
exports.emailConstants = {
    [email_type_enum_1.EmailTypeEnum.WELCOME]: {
        subject: "Welcome subject",
        template: "welcome",
    },
    [email_type_enum_1.EmailTypeEnum.FORGOT_PASSWORD]: {
        subject: "Forgot password subject",
        template: "forgot-password",
    },
    [email_type_enum_1.EmailTypeEnum.OLD_VISIT]: {
        subject: "Old visit subject",
        template: "old-visit",
    },
};
