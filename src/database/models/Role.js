function rolesData(sequelize, Datatypes) {
    let alias = 'roles';

    let cols = {
        id:{type:Datatypes.INTEGER,primaryKey:true,autoIncrement:true},
        name:{type:Datatypes.STRING(15)},
    };
    
    let config = {timestamps:false,camelCase:false,tableName:'role'};

    const roles = sequelize.define(alias,cols,config);

    roles.associate = function(model) {

        roles.hasMany(model.users, {
            as:'users',
            foreignKey:'id_role'
        });
    }


    return roles;
}

module.exports = rolesData;