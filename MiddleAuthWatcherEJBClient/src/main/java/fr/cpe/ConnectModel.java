package fr.cpe;

public class ConnectModel {

    public String login;
    public String pwd;

    public ConnectModel() {
        this.login = "";
        this.pwd = "";
    }

    public ConnectModel(String login, String pwd){
        this.login = login;
        this.pwd = pwd;

    }
}
