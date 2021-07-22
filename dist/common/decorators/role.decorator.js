"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = exports.META_DATA_ROLES_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.META_DATA_ROLES_KEY = 'ROLES';
const Roles = (...roles) => common_1.SetMetadata('ROLES', roles);
exports.Roles = Roles;
//# sourceMappingURL=role.decorator.js.map