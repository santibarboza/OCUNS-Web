package server.Accion;

public class AccionDefaultImp implements AccionDefault{

    private final String codigoAccion;
    private final String parametro;

    public AccionDefaultImp(String codigoAccion, String parametro) {
        this.codigoAccion = codigoAccion;
        this.parametro = parametro;
    }

    public String getCodigoAccion() {
        return codigoAccion;
    }

    public String getParametro() {
        return parametro;
    }
}
