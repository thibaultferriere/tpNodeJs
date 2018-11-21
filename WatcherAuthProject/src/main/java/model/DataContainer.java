package model;

import fr.cpe.UserModel;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;


public class DataContainer {

    @PersistenceContext
    EntityManager em;

    public UserModel checkUser() {
        UserModel users = em.createNamedQuery("Users.List").getResultList();
        return users;
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
