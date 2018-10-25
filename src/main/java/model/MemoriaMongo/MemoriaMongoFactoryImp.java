package model.MemoriaMongo;
import model.Ejecucion.EjecucionServer;
import com.mongodb.*;
import java.util.ArrayList;
import java.util.List;
import model.*;
import model.RepresentacionMemoria.*;
import model.Mapeo.*;
 
import org.bson.Document;

public class MemoriaMongoFactoryImp{
	public MemoriaMongoFactoryImp(){}
	public MemoriaMongo crearMemoriaMongo(EjecucionServer ejecucion, String id){
		String Mongo_URI="mongodb://ocuns:ocuns22@ds141401.mlab.com:41401/ocuns";
  		MongoClient mongoClient = new MongoClient(new MongoClientURI(Mongo_URI));
  		DB database = mongoClient.getDB("ocuns");
	 	DBCollection collection= database.getCollection("memorias");
		return new MemoriaMongoImp(ejecucion,collection,id);
	}
}