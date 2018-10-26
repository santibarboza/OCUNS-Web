package server.Accion;

import java.util.List;

public interface AccionCambio extends Accion{
    public List<Cambio> getParametro();
}