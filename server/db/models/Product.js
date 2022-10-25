const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
	productName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
	},
	price: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			notEmpty: true
		}
    },
    description: {
        type: Sequelize.TEXT,
        defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    // category: {
    //     type: Sequelize.ENUM('Cutting Boards', 'Furniture', 'Lawn Decor'),
    //     defaultValue: 'Cutting Boards'
    // },
    imageUrl: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: ['https://unsplash.com/photos/OOv2sCKwYAA']
    }
});

module.exports = Product;
