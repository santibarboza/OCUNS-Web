package view;

import java.util.List;
import server.Accion.Accion;

public interface OCViewServer extends OCView{
	public List<Accion> obtenerAcciones(String id);
	public void setLectura(String txt);
}
