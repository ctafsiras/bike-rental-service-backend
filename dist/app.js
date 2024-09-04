"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const bikeRoutes_1 = __importDefault(require("./routes/bikeRoutes"));
const bookingRoutes_1 = __importDefault(require("./routes/bookingRoutes"));
const errorHandler_1 = require("./middlewares/errorHandler");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/users", userRoutes_1.default);
app.use("/api/auth", authRoutes_1.default);
app.use("/api/bikes", bikeRoutes_1.default);
app.use("/api/rentals", bookingRoutes_1.default);
app.all("*", (req, res) => {
    res.json({
        success: false,
        statusCode: 404,
        message: "Not Found",
    });
});
app.use(errorHandler_1.errorHandler);
exports.default = app;
