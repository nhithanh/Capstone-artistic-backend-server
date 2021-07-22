"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auths_module_1 = require("./auths/auths.module");
const users_module_1 = require("./modules/apis/users/users.module");
const typeorm_1 = require("@nestjs/typeorm");
const styles_module_1 = require("./modules/apis/styles/styles.module");
const snapshot_module_1 = require("./modules/apis/snapshots/snapshot.module");
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
const medias_module_1 = require("./modules/apis/medias/medias.module");
const tranfer_images_module_1 = require("./modules/apis/tranfer-images/tranfer-images.module");
const producer_module_1 = require("./modules/producer/producer.module");
const controller_controller_1 = require("./modules/consumers/controller/controller.controller");
const serve_static_1 = require("@nestjs/serve-static");
const app_gateway_1 = require("./gateway/app.gateway");
const socket_module_1 = require("./gateway/socket.module");
const config_1 = require("@nestjs/config");
const s3_module_1 = require("./s3/s3.module");
const albums_module_1 = require("./modules/apis/albums/albums.module");
const showcases_module_1 = require("./modules/apis/showcases/showcases.module");
const notifications_module_1 = require("./modules/apis/notifications/notifications.module");
const videos_module_1 = require("./modules/apis/videos/videos.module");
const mail_module_1 = require("./mail/mail.module");
const training_requests_module_1 = require("./modules/apis/training-requests/training-requests.module");
const training_results_module_1 = require("./modules/apis/training-results/training-results.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: process.env.STATIC_DIR
            }),
            producer_module_1.ProducerModule,
            auths_module_1.AuthsModule,
            users_module_1.UsersModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DATABASE_HOST || 'localhost',
                port: 5432,
                username: process.env.DATABASE_USER || 'postgres',
                password: process.env.DATABASE_PASSWORD || 'postgres',
                database: process.env.DATABASE_NAME || 'capstone',
                entities: ['dist/**/*.entity{.ts,.js}'],
                migrationsTableName: 'migrations',
                migrations: ['dist/**/migration/*.js'],
                synchronize: true,
                migrationsRun: false,
                logging: false,
                namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy()
            }),
            styles_module_1.StylesModule,
            snapshot_module_1.SnapshotsModule,
            medias_module_1.MediasModule,
            tranfer_images_module_1.TranferImagesModule,
            socket_module_1.SocketModule,
            s3_module_1.S3Module,
            albums_module_1.AlbumsModule,
            showcases_module_1.ShowcasesModule,
            notifications_module_1.NotificationsModule,
            videos_module_1.VideosModule,
            mail_module_1.MailModule,
            training_requests_module_1.TrainingRequestsModule,
            training_results_module_1.TrainingResultsModule
        ],
        controllers: [app_controller_1.AppController, controller_controller_1.ControllerController],
        providers: [app_service_1.AppService, app_gateway_1.AppGateway]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map