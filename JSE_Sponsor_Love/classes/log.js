//Creating the Log classmodel.Log = new DataClass("LogCollection");//Add Log attributes.model.Log.ID = new Attribute("storage", "long", "key auto");model.Log.email = new Attribute("storage", "string");model.Log.sent = new Attribute("storage", "bool", "cluster");model.Log.action = new Attribute("storage", "number");