package server.Accion;
import java.util.Map;

public class AccionFactoryImp implements AccionFactory{
	
	public AccionFactoryImp(){}

	public AccionDefault crearAccionDefault(String codigoAccion, String parametro){
		return new AccionDefaultImp(codigoAccion,parametro);
	}
	public AccionCambio crearAccionCambio(String codigoAccion, Map<Integer,String> parametro){
		return new AccionCambioImp(codigoAccion,parametro);
	}
}