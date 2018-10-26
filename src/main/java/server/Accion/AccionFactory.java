package server.Accion;
import java.util.Map.Entry;
import java.util.Set;

public interface AccionFactory{
	public AccionDefault crearAccionDefault(String codigoAccion, String parametro);
	public AccionCambio crearAccionCambio(String codigoAccion, Set<Entry<Integer,String>> parametro);
}