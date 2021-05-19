const Sequelize = require('sequelize');

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - email
 *          - password
 *        properties:
 *          email:
 *            type: string
 *            format: email
 *            description: Login id
 *          nick:
 *            type: string
 *            description: nick Name
 *          password:
 *            type: string
 *            description: password
 *          provider:
 *            type: string
 *            description: password
 *        example:
 *           email: manbalboy@hanmail.net
 *           nick: manbalboy
 *           password: test1234
 *           provider: local
 */
module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                email: {
                    type: Sequelize.STRING(40),
                    allowNull: true,
                    unique: true,
                },
                nick: {
                    type: Sequelize.STRING(15),
                    allowNull: false,
                },
                password: {
                    type: Sequelize.STRING(100),
                    allowNull: true,
                },
                provider: {
                    type: Sequelize.STRING(10),
                    allowNull: false,
                    defaultValue: 'local',
                },
                snsId: {
                    type: Sequelize.STRING(30),
                    allowNull: true,
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: false,
                modelName: 'User',
                tableName: 'TB_USER',
                paranoid: true,
                charset: 'utf8',
                collate: 'utf8_general_ci',
            },
        );
    }

    static associate(db) {
        // db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
    }
};
