"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Services = void 0;
const sequelize_1 = require("sequelize");
const main_1 = require("../db/main");
const User = main_1.sequelize.define("user", {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    phone: { type: sequelize_1.DataTypes.STRING, unique: true },
    password: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    role: { type: sequelize_1.DataTypes.STRING, defaultValue: "USER" },
});
const Basket = main_1.sequelize.define("basket", {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});
const BasketProduct = main_1.sequelize.define("basket_product", {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});
const Product = main_1.sequelize.define("product", {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: sequelize_1.DataTypes.STRING, unique: true, allowNull: false },
    price: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    img: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
    rating: { type: sequelize_1.DataTypes.STRING, allowNull: false },
});
exports.Services = main_1.sequelize.define("services", {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: { type: sequelize_1.DataTypes.STRING, unique: true, allowNull: false },
});
const Rating = main_1.sequelize.define("rating", {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rate: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
});
const ProductInfo = main_1.sequelize.define("product_info", {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    description: { type: sequelize_1.DataTypes.STRING, allowNull: false },
});
User.hasOne(Basket);
Basket.belongsTo(User);
User.hasMany(Rating);
Rating.belongsTo(User);
Basket.hasMany(BasketProduct);
BasketProduct.belongsTo(Basket);
exports.Services.hasMany(Product);
Product.belongsTo(exports.Services);
Product.hasMany(Rating);
Rating.belongsTo(Product);
Product.hasMany(BasketProduct);
BasketProduct.belongsTo(Product);
Product.belongsTo(ProductInfo);
ProductInfo.belongsTo(Product);
exports.default = {
    User,
    Basket,
    Services: exports.Services,
    Rating,
    ProductInfo,
    Product,
    BasketProduct,
};
