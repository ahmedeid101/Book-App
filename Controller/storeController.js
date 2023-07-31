var queries = require('../db/queries');
var dbConnection = require('../db/connection');
var randomCode = require('../Util/utility');


exports.getSoreList = async (req, res) =>{
    try {
        var storeListQuery = queries.queryList.GET_STORE_LIST_QUERY;
        var result = await dbConnection.dbQuery(storeListQuery);
        return res.status(200).send(JSON.stringify(result.rows));
    } catch (error) {
        console.log("Error: "+ error)
        return res.status(500).send({error: 'faild to list stores!'});
    }
}

exports.saveStore = async (req, res) =>{
    try {
        var storeName = req.body.storeName;
        var storeAddress = req.body.storeAddress;
        var createdBy = "Ahmed Eid";
        var createdOn = new Date();

        if(!storeName || !storeAddress){
            return res.status(500).send({error: 'store name and address are required, must not be empty!'});
        }

        let storeCode = randomCode.generateStoreCode();

        values = [storeName, storeAddress, storeCode, createdOn, createdBy];

        var saveStoreQuery = queries.queryList.SAVE_STORE_QUERY;
        await dbConnection.dbQuery(saveStoreQuery, values);

         return res.status(201).send('store successfully created');
        
    } catch(error) {
        console.log("Error: "+ error)
        return res.status(500).send({error: 'faild to create store!'});
    }

}

exports.getSoreList = async (req, res) =>{
    try {
        var storeListQuery = queries.queryList.GET_STORE_LIST_QUERY;
        var result = await dbConnection.dbQuery(storeListQuery);
        return res.status(200).send(JSON.stringify(result.rows));
    } catch (error) {
        console.log("Error: "+ error)
        return res.status(500).send({error: 'faild to list stores!'});
    }
}

exports.updateStore = async (req, res) =>{
    try {
        var storeId = req.body.storeId;
        var storeName = req.body.storeName;
        var storeAddress = req.body.storeAddress;
        var createdBy = "Ahmed Eid";
        var createdOn = new Date();

        if(!storeId ||!storeName || !storeAddress){
            return res.status(500).send({error: 'store id, name and address are required, must not be empty!'});
        }

        let storeCode = randomCode.generateStoreCode();

        values = [storeName, storeAddress, storeCode, createdOn, createdBy, storeId];

        var updateStoreQuery = queries.queryList.UPDATE_STORE_QUERY;
        await dbConnection.dbQuery(updateStoreQuery, values);

         return res.status(200).send('store successfully updated');
        
    } catch(error) {
        console.log("Error: "+ error)
        return res.status(500).send({error: 'faild to update store!'});
    }

}

exports.deleteStore = async (req, res) =>{
    var storeId = req.params.storeId;

    try {
        //validate not empty
        if(!storeId){
            return res.status(500).send({error: 'can`t delete empty store id!'});
        }

        var deleteStoreQuery = queries.queryList.DELETE_STORE_QUERY;
        await dbConnection.dbQuery(deleteStoreQuery, [storeId]);

        return res.status(200).send('store deleted successfully');
        
    } catch (error) {
        console.log("Error: "+ error)
        return res.status(500).send({error: 'faild to delete store whth id '+ storeId});
    }
}