function vehiclesData(sequelize, Datatypes) {
    let alias = 'vehicles';

    let cols = {
        id:{type:Datatypes.INTEGER,primaryKey:true,autoIncrement:true},
        name:{type:Datatypes.STRING(20)},
        plate_number:{type:Datatypes.STRING(25)},
        mileage:{type:Datatypes.STRING(500)},
        pricexday:{type:Datatypes.INTEGER},
        transmission:{type:Datatypes.BOOLEAN},
        id_city:{type:Datatypes.INTEGER},
        id_brand:{type:Datatypes.INTEGER},
        id_category:{type:Datatypes.INTEGER},
        transmission:{type:Datatypes.BOOLEAN},
        seat_number:{type:Datatypes.INTEGER},
        id_fuel:{type:Datatypes.INTEGER},
        picture:{type:Datatypes.STRING(500)},
        description: {type:Datatypes.STRING(200)}
    };
    
    let config = {timestamps:false,camelCase:false,tableName:'vehicle'};

    const vehicles = sequelize.define(alias,cols,config);

    vehicles.associate = function(model) {

        vehicles.belongsTo(model.brands, {
            as:'brand',
            foreignKey:'id_brand'
        });

        vehicles.hasMany(model.bookings, {
            as:'bookings',
            foreignKey:'id_vehicle'
        });

        vehicles.belongsTo(model.categories, {
            as:'category',
            foreignKey:'id_category'
        });

        vehicles.belongsTo(model.cities, {
            as:'city',
            foreignKey:'id_city'
        });

        vehicles.belongsToMany(model.features, {
            as:"features",
            through: "vehicle_feature",
            foreignKey:"id_vehicle",
            otherKey:"id_feature",
            timestamps:false
        });

        vehicles.belongsTo(model.fuels, {
            as:'fuel',
            foreignKey:'id_fuel'
        });

    }

    return vehicles;
}

module.exports = vehiclesData;