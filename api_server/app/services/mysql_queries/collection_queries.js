import db from "../mysql.js";
import utils from "../../utils/utils.js";

const collectionQueries = {};

collectionQueries.addCollection = async (collectionData) => {
  let conn = null;
  try {
    conn = await db.createConnection();

    let collectionObj = {
      collectionName: collectionData.collectionName,
      collectionType: collectionData.collectionType,
      initialDate: collectionData.initialDate,
      finishDate: collectionData.finishDate,
      userCreated: collectionData.userCreated,
    };

    return await db.query(
      "INSERT INTO collection SET ?",
      [collectionObj],
      "insert",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

collectionQueries.getCollectionById = async (id) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM collection WHERE id = ?",
      id,
      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

collectionQueries.getCollectionByUserId = async (userId) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM collection WHERE userCreated = ? and isDelete = 0",
      userId,
      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

collectionQueries.getCollectionByName = async (collectionName) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM collection WHERE collectionName = ?",
      collectionName,
      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

collectionQueries.getAllCollections = async (userId) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM collection where userCreated = ? and isDelete = 0 ",
      userId,
      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

collectionQueries.updateCollection = async (collectionData, id) => {
  let conn = null;
  try {
    conn = await db.createConnection();

    let collectionObj = {
      collectionName: collectionData.collectionName,
      collectionType: collectionData.collectionType,
      initialDate: collectionData.initialDate,
      finishDate: collectionData.finishDate,
    };

    collectionObj = await utils.removeUndefinedKeys(collectionObj);
    return await db.query(
      "UPDATE collection SET ? WHERE id = ?",
      [collectionObj, id],
      "update",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

collectionQueries.logicDeleteCollection = async (id) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "UPDATE collection set isDelete = 1 WHERE id = ?",
      id,
      "update",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

export default collectionQueries;
