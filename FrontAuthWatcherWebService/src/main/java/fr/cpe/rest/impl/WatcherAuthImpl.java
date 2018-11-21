package fr.cpe.rest.impl;

import fr.cpe.ConnectModel;
import fr.cpe.UserModel;
import fr.cpe.rest.WatchAuthRestService;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response.Status;
import javax.inject.Inject;
import javax.json.JsonObject;
import javax.xml.ws.Response;

public class WatcherAuthImpl implements WatchAuthRestService {

    @Override
    public ConnectModel postAuth(ConnectModel connectModel){

        System.out.println("---------------->>>>> TEEEEEST");

        String login = connectModel.login;
        String pwd = connectModel.pwd;

        UserModel userModel = new UserModel("toto", "toto", login, pwd, "admin");
        System.out.println("l'objet est" + userModel);
        return connectModel;

        //    return "Hello (REST)";
    }
}
