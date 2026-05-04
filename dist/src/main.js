"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        credentials: true,
    });
    const { httpAdapter } = app.get(core_1.HttpAdapterHost);
    app.useGlobalFilters(new http_exception_filter_1.AllExceptionsFilter(app.get(core_1.HttpAdapterHost)));
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: false,
    }));
    const port = process.env.PORT ?? 3001;
    await app.listen(port);
    console.log(`🕌 Quran API running on: http://localhost:${port}/api`);
}
bootstrap();
//# sourceMappingURL=main.js.map