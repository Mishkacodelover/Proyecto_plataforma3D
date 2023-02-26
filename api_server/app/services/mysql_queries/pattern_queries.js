import db from "../mysql.js";

const patternQueries = {};

patternQueries.addPattern = async (imageData) => {
  let conn = null;
  try {
    conn = await db.createConnection();

    let imageObj = {
      patternName: imageData.patternName,
      pathPattern: imageData.pathPattern,

      userCreated: imageData.userCreated,
    };

    return await db.query(
      "INSERT INTO pattern SET ?",
      imageObj,
      "insert",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

patternQueries.getAllPatterns = async (id) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM pattern where userCreated = ?",
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

export default patternQueries;
