package model.MemoriaMongo;
import model.Ejecucion.EjecucionServer;

public interface MemoriaMongoFactory{
	public MemoriaMongo crearMemoriaMongo(EjecucionServer ejecucion, String id);
}