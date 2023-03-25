function citiesData(sequelize, Datatypes) {
    let alias = 'cities';

    let cols = {
        id:{type:Datatypes.INTEGER,primaryKey:true,autoIncrement:true},
        name:{type:Datatypes.STRING(19)},
        description:{type:Datatypes.TEXT},
        secure_url:{type:Datatypes.STRING(100)},
        public_id: {type:Datatypes.STRING(500)},
    };
    
    let config = {timestamps:false,camelCase:false,tableName:'city'};

    const cities = sequelize.define(alias,cols,config);

    cities.associate = function(model) {

        cities.hasMany(model.bookings, {
            as:'bookings_pickup',
            foreignKey:'pickup_city'
        });

        cities.hasMany(model.bookings, {
            as:'bookings_dropoff',
            foreignKey:'dropoff_city'
        });

        cities.hasMany(model.vehicles, {
            as:'vehicles',
            foreignKey:'id_city'
        });
    }

    return cities;
}

module.exports = citiesData;