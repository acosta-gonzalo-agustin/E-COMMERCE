function additionalsData(sequelize, Datatypes) {
    let alias = 'additionals';

    let cols = {
        id:{type:Datatypes.INTEGER,primaryKey:true,autoIncrement:true},
        name:{type:Datatypes.STRING(30)},
        price:{type:Datatypes.INTEGER}
        
    };
    
    let config = {timestamps:false,camelCase:false,tableName:'additional'};

    const additionals = sequelize.define(alias,cols,config);

    additionals.associate = function(model) {

        additionals.belongsToMany(model.bookings, {
            as:'bookings',
            through: "additional_booking",
            foreignKey:'id_additional',
            otherKey:'id_booking',
            timestamps:false
        })
    }
    


    return additionals;
}

module.exports = additionalsData;