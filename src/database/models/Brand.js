function brandsData(sequelize, Datatypes) {
    let alias = 'brands';

    let cols = {
        id:{type:Datatypes.INTEGER,primaryKey:true,autoIncrement:true},
        name:{type:Datatypes.STRING(30)},
    };
    
    let config = {timestamps:false,camelCase:false,tableName:'brand'};

    const brands = sequelize.define(alias,cols,config);

    brands.associate = function(model) {
        brands.hasMany(model.vehicles, {
            as:'vehicles',
            foreignKey:'id_brand'
        }
    )}


    return brands;
}

module.exports = brandsData;