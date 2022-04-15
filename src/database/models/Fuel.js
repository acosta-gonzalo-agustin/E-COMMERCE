function fuelsData(sequelize, Datatypes) {
    let alias = 'fuels';

    let cols = {
        id:{type:Datatypes.INTEGER,primaryKey:true,autoIncrement:true},
        name:{type:Datatypes.STRING(20)},
    };
    
    let config = {timestamps:false,camelCase:false,tableName:'fuel'};

    const fuels = sequelize.define(alias,cols,config);

    fuels.associate = function(model) {

        fuels.hasMany(model.vehicles, {
            as:'vehicles',
            foreignKey:'id_fuel'
        });

    }


    return fuels;
}

module.exports = fuelsData;