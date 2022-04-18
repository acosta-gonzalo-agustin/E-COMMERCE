function usersData(sequelize, Datatypes) {
    let alias = 'users';

    let cols = {
        id:{type:Datatypes.INTEGER,primaryKey:true,autoIncrement:true},
        name:{type:Datatypes.STRING(20)},
        last_name:{type:Datatypes.STRING(20)},
        email:{type:Datatypes.STRING(50)},
        password:{type:Datatypes.STRING(100)},
        phone_number:{type:Datatypes.STRING(20)},
        driver_licence:{type:Datatypes.STRING(40)},
        promo_code:{type:Datatypes.STRING(10)},
        id_role:{type:Datatypes.INTEGER},
        profile_picture:{type:Datatypes.STRING(500)}
    };
    
    let config = {timestamps:false,camelCase:false,tableName:'user'};

    const users = sequelize.define(alias,cols,config);

    users.associate = function(model) {

        users.hasMany(model.bookings, {
            as:'bookings',
            foreignKey:'id_user'
        });

        users.belongsTo(model.roles, {
            as:'role',
            foreignKey:'id_role'
        });
        
    
    }


    return users;
}

module.exports = usersData;