package server.Accion;

import java.util.Map.Entry;
import java.util.Set;
public interface AccionCambio extends Accion{
    public Set<Map.Entry<K,V>> getParametro();
}