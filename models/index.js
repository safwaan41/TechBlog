const User = require('./User');
const Project = require('./Project');
const Comment = require('./Comment');


User.hasMany (Project, {
    foreignKey: 'user_name',
    onDelete: 'CASCADE'
});

Project.belongsTo (User, {
    foreignKey: 'user_name'
});

Comment.belongsTo(Project, {
    foreignKey: 'id'
});

Project.hasMany(Comment, {
    foreignKey: 'id'
});

module.exports = { User, Project, Comment};