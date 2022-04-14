function featuresData(sequelize, Datatypes) {
    let alias = 'features';

    let cols = {
        id:{type:Datatypes.INTEGER,primaryKey:true,autoIncrement:true},
        name:{type:Datatypes.STRING(30)},
    };
    
    let config = {timestamps:false,camelCase:false,tableName:'feature'};

    const features = sequelize.define(alias,cols,config);

    features.associate = function(model) {

        features.belongsToMany(model.vehicles, {
            as:"vehicles",
            through: "vehicle_feature",
            foreignKey:"id_feature",
            otherKey:"id_vehicle",
            timestamps:false
        });

    }


    return features;
}

module.exports = featuresData;