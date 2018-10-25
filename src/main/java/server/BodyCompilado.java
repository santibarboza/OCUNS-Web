package server;

public class BodyCompilado {

    private  String direccionInicio;
    private  String codigoFuente;

    public BodyCompilado(String direccionInicio, String codigoFuente) {
        this.direccionInicio = direccionInicio;
        this.codigoFuente = codigoFuente;
    }

    public String getDireccionInicio() {
        return direccionInicio;
    }

    public String getCodigoFuente() {
        return codigoFuente;
    }
    public void setDireccionInicio(String direccionInicio) {
        this.direccionInicio = direccionInicio;
    }
    public void setCodigoFuente(String codigoFuente) {
        this.codigoFuente = codigoFuente;
    }
}
