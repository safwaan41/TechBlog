const User = require('./User');
const Project = require('./Project');


User.hasMany (Project, {
    foreignKey: 'user_name',
    onDelete: 'CASCADE'
});

Project.belongsTo (User, {
    foreignKey: 'user_name'
});

module.exports = { User, Project};