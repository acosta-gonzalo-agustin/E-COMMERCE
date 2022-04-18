function vehicles_featuresData(sequelize, Datatypes) {
    let alias = 'vehicles_features';

    let cols = {
        id:{type:Datatypes.INTEGER,primaryKey:true,autoIncrement:true},
        id_feature:{type:Datatypes.INTEGER},
        id_vehicle:{type:Datatypes.INTEGER},
    };
    
    let config = {timestamps:false,camelCase:false,tableName:'vehicle_feature'};

    const vehicles_features = sequelize.define(alias,cols,config);

    

    return vehicles_features;
}

module.exports = vehicles_featuresData;