package model;

import fr.cpe.UserModel;

import javax.persistence.*;
import java.util.List;


@Entity
@NamedQuery(name = "User.checkUser", query = "select u from User u where u.login = :login")

public class DataContainer {

    @PersistenceContext
    EntityManager em;

    public UserModel checkUser(String login, String pwd) {

        Query query = em.createNamedQuery("User.checkUser").setParameter("login", login);
        List<UserModel> users = query.getResultList();
        UserModel result = users.get(0);
        if (result.pwd == pwd) {
            return result;
        } else {
            return result;
        }
    }

    /*
    public UserModel.Role checkUser(UserModel user) { {
            if(userList.login == user.login && userList.pwd == user.pwd) {
                return userList.role;
            }
            return null;
        }
    }*/
}
