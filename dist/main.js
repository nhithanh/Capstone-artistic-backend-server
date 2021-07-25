"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const ncsrf_1 = require("ncsrf");
const morgan = require("morgan");
const swagger_1 = require("@nestjs/swagger");
const dotenv = require("dotenv");
async function bootstrap() {
    dotenv.config();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(morgan('dev'));
    app.use(helmet());
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    app.use(cookieParser());
    app.use(ncsrf_1.nestCsrf({ ttl: 86400 }));
    app.enableCors({
        origin: ['http://localhost:3000', 'http://artisantify-web-admin.s3-website-ap-southeast-1.amazonaws.com'],
        credentials: true,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle("Artisan Main Server Open API")
        .setDescription("The api map of Artisan Main API")
        .setVersion("1.0")
        .addTag("photos")
        .addTag("styles")
        .addTag("users")
        .addTag("models")
        .addTag("snapshots")
        .addTag("transfer-images")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('swagger', app, document);
    await app.startAllMicroservicesAsync();
    await app.listen(3001);
}
bootstrap();
//# sourceMappingURL=main.js.map