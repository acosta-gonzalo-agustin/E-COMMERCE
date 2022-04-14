function categoriesData(sequelize, Datatypes) {
    let alias = 'categories';

    let cols = {
        id:{type:Datatypes.INTEGER,primaryKey:true,autoIncrement:true},
        name:{type:Datatypes.STRING(25)},
    };
    
    let config = {timestamps:false,camelCase:false,tableName:'category'};

    const categories = sequelize.define(alias,cols,config);

    categories.associate = function(model) {

        categories.hasMany(model.vehicles, {
            as:'vehicles',
            foreignKey:'id_category'
        });

    }


    return categories;
}

module.exports = categoriesData;