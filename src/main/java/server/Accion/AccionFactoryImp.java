package server.Accion;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

public class AccionFactoryImp implements AccionFactory{
	
	public AccionFactoryImp(){}

	public AccionDefault crearAccionDefault(String codigoAccion, String parametro){
		return new AccionDefaultImp(codigoAccion,parametro);
	}
	public AccionCambio crearAccionCambio(String codigoAccion, Map<Integer,String> parametro){
		return new AccionCambioImp(codigoAccion,getCambios(parametro));
	}
	private List<Cambio> getCambios(Map<Integer,String> parametro){
		List<Cambio> cambios= new new ArrayList<Cambio>();	
		for (Map.Entry<Integer, String> entry : datos.entrySet()) {
    		cambios.add(new CambioImp(entry.getKey(),entry.getValue()));
		}
		return cambioss
	}