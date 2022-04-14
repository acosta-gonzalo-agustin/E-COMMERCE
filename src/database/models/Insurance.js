function insurancesData(sequelize, Datatypes) {
    let alias = 'insurances';

    let cols = {
        id:{type:Datatypes.INTEGER,primaryKey:true,autoIncrement:true},
        name:{type:Datatypes.STRING(25)},
        pricexday:{type:Datatypes.INTEGER},
        description:{type:Datatypes.TEXT}
    };
    
    let config = {timestamps:false,camelCase:false,tableName:'insurance'};

    const insurances = sequelize.define(alias,cols,config);

    insurances.associate = function(model) {

        insurances.hasMany(model.bookings, {
            as:'bookings',
            foreignKey:'id_insurance'
        });

    }

    return insurances;
}

module.exports = insurancesData;