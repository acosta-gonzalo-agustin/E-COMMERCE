function bookingsData(sequelize, Datatypes) {
    let alias = 'bookings';

    let cols = {
        id:{type:Datatypes.INTEGER,primaryKey:true,autoIncrement:true},
        booking_number:{type:Datatypes.STRING(50)},
        id_insurance:{type:Datatypes.INTEGER},
        pickup_date:{type:Datatypes.DATE},
        dropoff_date:{type:Datatypes.DATE},
        pickup_time:{type:Datatypes.TIME},
        dropoff_time:{type:Datatypes.TIME},
        total:{type:Datatypes.INTEGER},
        id_vehicle:{type:Datatypes.INTEGER},
        id_user:{type:Datatypes.INTEGER},
        pickup_city:{type:Datatypes.INTEGER},
        dropoff_city:{type:Datatypes.INTEGER},
    };
    
    let config = {timestamps:false,camelCase:false,tableName:'booking'};

    const bookings = sequelize.define(alias,cols,config);

    bookings.associate = function(model) {

        bookings.belongsTo(model.vehicles, {
            as:'vehicle',
            foreignKey:'id_vehicle'
        });

        bookings.belongsTo(model.users, {
            as:'user',
            foreignKey:'id_user'
        });

        bookings.belongsTo(model.cities, {
            as:'city_pickup',
            foreignKey:'pickup_city'
        });

        bookings.belongsTo(model.cities, {
            as:'city_dropoff',
            foreignKey:'dropoff_city'
        });

        bookings.belongsTo(model.insurances, {
            as:'insurances',
            foreignKey:'id_insurance'
        });

        bookings.belongsToMany(model.additionals, {
            as:'additionals',
            through: "additional_booking",
            foreignKey:'id_booking',
            otherKey:'id_additional',
            timestamps:false
        });
    
    }


    return bookings;
}

module.exports = bookingsData;