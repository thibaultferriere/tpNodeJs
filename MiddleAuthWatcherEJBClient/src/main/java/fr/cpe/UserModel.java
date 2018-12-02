package fr.cpe;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;


public class UserModel implements Serializable {

    public enum Role {ADMIN, NONE, USER}

    public String login;
    public String pwd;
    public Role role;


    public UserModel() {
        this.login = "";
        this.pwd = "";
        this.role = Role.NONE;
    }

    public UserModel(String login, String pwd, Role role) {
        this.login = login;
        this.pwd = pwd;
        this.role = role;
    }

    public String getLogin() {
        return login;
    }

    public String getPwd() {
        return pwd;
    }

    public void setRole(Role role) {
        this.role = role;
    }


}
