package fr.cpe;
import java.io.Serializable;

public class UserModel implements Serializable {

    public String lastName;
    public String surName;
    public String login;
    public String pwd;
    public String role;

    public UserModel() {
        this.lastName = "";
        this.surName = "";
        this.login = "";
        this.pwd = "";
        this.role = "";
    }

    public UserModel(String lastName, String surName, String login, String pwd, String role){
        this.lastName = lastName;
        this.surName = surName;
        this.login = login;
        this.pwd = pwd;
        this.role = role;
    }
}
