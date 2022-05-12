function additionals_bookingsData(sequelize, Datatypes) {
    let alias = 'additionals_bookings';

    let cols = {
        id:{type:Datatypes.INTEGER,primaryKey:true,autoIncrement:true},
        id_additional:{type:Datatypes.INTEGER},
        id_booking:{type:Datatypes.INTEGER},
    };
    
    let config = {timestamps:false,camelCase:false,tableName:'additional_booking'};

    const additionals_bookings = sequelize.define(alias,cols,config);

    

    return additionals_bookings;
}

module.exports = additionals_bookingsData;