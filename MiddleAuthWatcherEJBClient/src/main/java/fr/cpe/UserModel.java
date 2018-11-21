package fr.cpe;
import javax.persistence.Entity;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name = "users")
@NamedQuery(name = "Users.list", query = "select u from User u")

public class UserModel implements Serializable {

    public enum Role {ADMIN, NONE, USER}

    public String login;
    public String pwd;
    public Role role;



    public UserModel() {
        this.login = "";
        this.pwd = "";
        this.role = null;
    }

    public UserModel(String login, String pwd, Role role){
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
