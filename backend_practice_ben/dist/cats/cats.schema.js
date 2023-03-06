"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatSchema = void 0;
const mongoose = require("mongoose");
exports.CatSchema = new mongoose.Schema({
    name: String,
    age: Number,
    breed: String,
});
//# sourceMappingURL=cats.schema.js.map