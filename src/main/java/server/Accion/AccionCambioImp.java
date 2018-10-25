package server.Accion;
import java.util.Map.Entry;
import java.util.Set;

public class AccionCambioImp implements AccionCambio{
    private final String codigoAccion;
    private final Set<Map.Entry<K,V>> parametro;

    public AccionCambioImp(String codigoAccion, Set<Map.Entry<K,V>> parametro) {
        this.codigoAccion = codigoAccion;
        this.parametro = parametro;
    }

    public String getCodigoAccion() {
        return codigoAccion;
    }

    public Set<Map.Entry<K,V>> getParametro() {
        return parametro;
    }
}
