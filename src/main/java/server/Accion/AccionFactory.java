package server.Accion;
import java.util.Map;

public interface AccionFactory{
	public AccionDefault crearAccionDefault(String codigoAccion, String parametro);
	public AccionCambio crearAccionCambio(String codigoAccion, Map<Integer,String> parametro);
}